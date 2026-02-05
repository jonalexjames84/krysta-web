"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "@/contexts/CartContext";
import { CartItem } from "@/components/cart";
import { Button } from "@/components/ui";
import { formatCurrency } from "@/lib/utils";
import { getStripe } from "@/lib/stripe/client";

export default function CheckoutPage() {
  const router = useRouter();
  const { items, subtotal } = useCart();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleCheckout = async () => {
    if (items.length === 0) return;

    setIsLoading(true);
    setError("");

    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Checkout failed");
      }

      // Redirect to Stripe Checkout
      const stripe = await getStripe();
      if (stripe) {
        const { error: stripeError } = await stripe.redirectToCheckout({
          sessionId: data.sessionId,
        });

        if (stripeError) {
          throw new Error(stripeError.message);
        }
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
      setIsLoading(false);
    }
  };

  if (items.length === 0) {
    router.push("/cart");
    return null;
  }

  return (
    <div className="bg-cream">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <h1 className="font-serif text-3xl md:text-4xl text-charcoal text-center mb-10">
          Checkout
        </h1>

        {/* Order Summary */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <h2 className="font-serif text-xl text-charcoal mb-4">
            Order Summary
          </h2>
          {items.map((item) => (
            <CartItem key={item.id} item={item} showControls={false} />
          ))}
        </div>

        {/* Totals */}
        <div className="bg-sand/50 rounded-lg p-6 mb-8">
          <div className="flex justify-between text-lg mb-2">
            <span className="text-charcoal">Subtotal</span>
            <span className="font-medium text-charcoal">
              {formatCurrency(subtotal)}
            </span>
          </div>
          <div className="flex justify-between text-sm text-charcoal/70 mb-2">
            <span>Shipping</span>
            <span>Calculated at next step</span>
          </div>
          <div className="flex justify-between text-sm text-charcoal/70">
            <span>Tax</span>
            <span>Calculated at next step</span>
          </div>
        </div>

        {/* Checkout Button */}
        {error && (
          <div className="mb-4 p-4 bg-red-50 text-red-600 rounded-lg">
            {error}
          </div>
        )}

        <Button
          className="w-full"
          size="lg"
          isLoading={isLoading}
          onClick={handleCheckout}
        >
          Continue to Payment
        </Button>

        <p className="mt-4 text-sm text-charcoal/70 text-center">
          You will be redirected to Stripe to complete your purchase securely.
        </p>
      </div>
    </div>
  );
}
