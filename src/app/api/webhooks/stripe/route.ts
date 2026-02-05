import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe/checkout";
import { createAdminClient } from "@/lib/supabase/admin";
import type Stripe from "stripe";

interface Order {
  id: string;
}

interface Product {
  inventory_quantity: number;
}

export async function POST(request: NextRequest) {
  const body = await request.text();
  const signature = request.headers.get("stripe-signature");

  if (!signature) {
    return NextResponse.json(
      { error: "Missing stripe signature" },
      { status: 400 }
    );
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err) {
    console.error("Webhook signature verification failed:", err);
    return NextResponse.json(
      { error: "Webhook signature verification failed" },
      { status: 400 }
    );
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;

    try {
      await handleCheckoutCompleted(session);
    } catch (error) {
      console.error("Error handling checkout completed:", error);
      return NextResponse.json(
        { error: "Failed to process order" },
        { status: 500 }
      );
    }
  }

  return NextResponse.json({ received: true });
}

async function handleCheckoutCompleted(session: Stripe.Checkout.Session) {
  const supabase = createAdminClient();

  // Generate order number
  const orderNumber = `KM-${Date.now().toString(36).toUpperCase()}`;

  // Get line items from Stripe
  const lineItems = await stripe.checkout.sessions.listLineItems(session.id);

  // Create order
  const { data: order, error: orderError } = await supabase
    .from("orders")
    .insert({
      order_number: orderNumber,
      email: session.customer_details?.email || "",
      status: "processing",
      payment_status: "paid",
      stripe_checkout_session_id: session.id,
      stripe_payment_intent_id: session.payment_intent as string,
      subtotal: session.amount_subtotal || 0,
      shipping_cost: session.total_details?.amount_shipping || 0,
      tax: session.total_details?.amount_tax || 0,
      total: session.amount_total || 0,
      shipping_name: session.shipping_details?.name,
      shipping_address_line1: session.shipping_details?.address?.line1,
      shipping_address_line2: session.shipping_details?.address?.line2,
      shipping_city: session.shipping_details?.address?.city,
      shipping_state: session.shipping_details?.address?.state,
      shipping_postal_code: session.shipping_details?.address?.postal_code,
      shipping_country: session.shipping_details?.address?.country,
    } as never)
    .select()
    .single() as { data: Order | null; error: unknown };

  if (orderError) {
    console.error("Error creating order:", orderError);
    throw orderError;
  }

  // Create order items
  const itemIds = (session.metadata?.itemIds || "").split(",");

  for (let i = 0; i < lineItems.data.length; i++) {
    const lineItem = lineItems.data[i];
    const productId = itemIds[i];

    if (productId && order) {
      await supabase.from("order_items").insert({
        order_id: order.id,
        product_id: productId,
        product_name: lineItem.description || "",
        price: lineItem.amount_total,
        quantity: lineItem.quantity || 1,
      } as never);

      // Update inventory
      const { data: product } = await supabase
        .from("products")
        .select("inventory_quantity")
        .eq("id", productId)
        .single() as { data: Product | null };

      if (product) {
        await supabase
          .from("products")
          .update({
            inventory_quantity: Math.max(
              0,
              product.inventory_quantity - (lineItem.quantity || 1)
            ),
          } as never)
          .eq("id", productId);
      }
    }
  }

  console.log(`Order ${orderNumber} created successfully`);
}
