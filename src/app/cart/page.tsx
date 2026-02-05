"use client";

import Link from "next/link";
import { useCart } from "@/contexts/CartContext";
import { CartItem } from "@/components/cart";
import { Button } from "@/components/ui";
import { formatCurrency } from "@/lib/utils";

export default function CartPage() {
  const { items, subtotal, clearCart } = useCart();

  return (
    <div className="bg-cream">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <h1 className="font-serif text-3xl md:text-4xl text-charcoal text-center mb-10">
          Shopping Cart
        </h1>

        {items.length === 0 ? (
          <div className="text-center py-12">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-16 w-16 mx-auto text-sand"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1}
                d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
              />
            </svg>
            <p className="mt-4 text-charcoal/70">Your cart is empty</p>
            <Link href="/shop">
              <Button className="mt-6">Continue Shopping</Button>
            </Link>
          </div>
        ) : (
          <div>
            {/* Cart Items */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              {items.map((item) => (
                <CartItem key={item.id} item={item} />
              ))}
            </div>

            {/* Summary */}
            <div className="mt-8 bg-sand/50 rounded-lg p-6">
              <div className="flex justify-between text-lg mb-2">
                <span className="text-charcoal">Subtotal</span>
                <span className="font-medium text-charcoal">
                  {formatCurrency(subtotal)}
                </span>
              </div>
              <p className="text-sm text-charcoal/70 mb-6">
                Shipping and taxes calculated at checkout.
              </p>

              <div className="space-y-3">
                <Link href="/checkout">
                  <Button className="w-full">Proceed to Checkout</Button>
                </Link>
                <Link href="/shop">
                  <Button variant="outline" className="w-full">
                    Continue Shopping
                  </Button>
                </Link>
                <button
                  onClick={clearCart}
                  className="w-full text-sm text-charcoal/50 hover:text-red-500 transition-colors"
                >
                  Clear Cart
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
