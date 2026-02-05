"use client";

import { useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { useCart } from "@/contexts/CartContext";
import { Button } from "@/components/ui";

function SuccessContent() {
  const searchParams = useSearchParams();
  const { clearCart } = useCart();
  const sessionId = searchParams.get("session_id");

  useEffect(() => {
    // Clear the cart after successful purchase
    clearCart();
  }, [clearCart]);

  return (
    <div className="bg-cream min-h-[60vh] flex items-center">
      <div className="mx-auto max-w-lg px-4 sm:px-6 lg:px-8 py-12 lg:py-16 text-center">
        {/* Success Icon */}
        <div className="mx-auto h-16 w-16 flex items-center justify-center rounded-full bg-sage/20">
          <svg
            className="h-10 w-10 text-sage"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>

        <h1 className="mt-6 font-serif text-3xl md:text-4xl text-charcoal">
          Thank You!
        </h1>

        <p className="mt-4 text-charcoal/70">
          Your order has been received and is being processed. You will receive
          a confirmation email shortly.
        </p>

        {sessionId && (
          <p className="mt-4 text-sm text-charcoal/50">
            Order reference: {sessionId.slice(-8).toUpperCase()}
          </p>
        )}

        <div className="mt-8 space-y-3">
          <Link href="/shop">
            <Button className="w-full">Continue Shopping</Button>
          </Link>
          <Link href="/">
            <Button variant="outline" className="w-full">
              Back to Home
            </Button>
          </Link>
        </div>

        <div className="mt-8 p-4 bg-sand/50 rounded-lg">
          <p className="text-sm text-charcoal/70">
            Have questions about your order?{" "}
            <Link href="/inquire" className="text-clay hover:text-earth">
              Contact us
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default function CheckoutSuccessPage() {
  return (
    <Suspense fallback={<div className="min-h-[60vh] flex items-center justify-center">Loading...</div>}>
      <SuccessContent />
    </Suspense>
  );
}
