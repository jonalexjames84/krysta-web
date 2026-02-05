import { NextRequest, NextResponse } from "next/server";
import { createCheckoutSession, CheckoutItem } from "@/lib/stripe/checkout";

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image?: string;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { items } = body as { items: CartItem[] };

    if (!items || items.length === 0) {
      return NextResponse.json(
        { error: "No items in cart" },
        { status: 400 }
      );
    }

    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

    const checkoutItems: CheckoutItem[] = items.map((item) => ({
      name: item.name,
      price: item.price,
      quantity: item.quantity,
      image: item.image,
    }));

    const session = await createCheckoutSession(
      checkoutItems,
      `${siteUrl}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      `${siteUrl}/cart`,
      {
        itemIds: items.map((item) => item.id).join(","),
      }
    );

    return NextResponse.json({ sessionId: session.id });
  } catch (error) {
    console.error("Checkout error:", error);
    return NextResponse.json(
      { error: "Failed to create checkout session" },
      { status: 500 }
    );
  }
}
