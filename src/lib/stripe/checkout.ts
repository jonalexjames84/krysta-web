import Stripe from "stripe";

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-01-27.acacia",
});

export interface CheckoutItem {
  name: string;
  price: number; // in cents
  quantity: number;
  image?: string;
}

export async function createCheckoutSession(
  items: CheckoutItem[],
  successUrl: string,
  cancelUrl: string,
  metadata?: Record<string, string>
) {
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: items.map((item) => ({
      price_data: {
        currency: "usd",
        product_data: {
          name: item.name,
          images: item.image ? [item.image] : undefined,
        },
        unit_amount: item.price,
      },
      quantity: item.quantity,
    })),
    mode: "payment",
    success_url: successUrl,
    cancel_url: cancelUrl,
    shipping_address_collection: {
      allowed_countries: ["US", "CA"],
    },
    metadata,
  });

  return session;
}
