"use client";

import { Fragment } from "react";
import Link from "next/link";
import Image from "next/image";
import { useCart } from "@/contexts/CartContext";
import { Button } from "@/components/ui";
import { formatCurrency } from "@/lib/utils";
import { cn } from "@/lib/utils";

export function CartDrawer() {
  const {
    items,
    itemCount,
    subtotal,
    isCartOpen,
    setIsCartOpen,
    removeItem,
    updateQuantity,
  } = useCart();

  return (
    <Fragment>
      {/* Backdrop */}
      {isCartOpen && (
        <div
          className="fixed inset-0 z-50 bg-charcoal/50 backdrop-blur-sm transition-opacity"
          onClick={() => setIsCartOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Drawer */}
      <div
        className={cn(
          "fixed inset-y-0 right-0 z-50 flex w-full max-w-md flex-col bg-cream shadow-xl transition-transform duration-300",
          isCartOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-sand px-6 py-4">
          <h2 className="font-serif text-xl text-charcoal">
            Cart ({itemCount})
          </h2>
          <button
            onClick={() => setIsCartOpen(false)}
            className="text-charcoal/50 hover:text-charcoal transition-colors"
            aria-label="Close cart"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto px-6 py-4">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-16 w-16 text-sand"
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
              <Button
                variant="outline"
                className="mt-4"
                onClick={() => setIsCartOpen(false)}
              >
                Continue Shopping
              </Button>
            </div>
          ) : (
            <ul className="space-y-6">
              {items.map((item) => (
                <li key={item.id} className="flex gap-4">
                  {/* Image */}
                  <div className="relative h-24 w-24 flex-shrink-0 overflow-hidden rounded-md bg-sand">
                    {item.image ? (
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center">
                        <span className="text-charcoal/30 text-xs">
                          No image
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Details */}
                  <div className="flex flex-1 flex-col">
                    <div className="flex justify-between">
                      <Link
                        href={`/product/${item.slug}`}
                        className="font-medium text-charcoal hover:text-clay transition-colors"
                        onClick={() => setIsCartOpen(false)}
                      >
                        {item.name}
                      </Link>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="text-charcoal/50 hover:text-red-500 transition-colors"
                        aria-label={`Remove ${item.name} from cart`}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={1.5}
                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                          />
                        </svg>
                      </button>
                    </div>

                    <p className="mt-1 text-sm text-charcoal/70">
                      {formatCurrency(item.price)}
                    </p>

                    {/* Quantity */}
                    <div className="mt-2 flex items-center gap-2">
                      <button
                        onClick={() =>
                          updateQuantity(item.id, item.quantity - 1)
                        }
                        className="flex h-8 w-8 items-center justify-center rounded-md border border-sand text-charcoal hover:bg-sand transition-colors"
                        aria-label="Decrease quantity"
                      >
                        -
                      </button>
                      <span className="w-8 text-center text-sm">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() =>
                          updateQuantity(item.id, item.quantity + 1)
                        }
                        className="flex h-8 w-8 items-center justify-center rounded-md border border-sand text-charcoal hover:bg-sand transition-colors"
                        aria-label="Increase quantity"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t border-sand px-6 py-4 space-y-4">
            <div className="flex justify-between text-lg">
              <span className="text-charcoal">Subtotal</span>
              <span className="font-medium text-charcoal">
                {formatCurrency(subtotal)}
              </span>
            </div>
            <p className="text-sm text-charcoal/70">
              Shipping and taxes calculated at checkout.
            </p>
            <Link href="/checkout" onClick={() => setIsCartOpen(false)}>
              <Button className="w-full">Checkout</Button>
            </Link>
            <Link href="/cart" onClick={() => setIsCartOpen(false)}>
              <Button variant="outline" className="w-full mt-2">
                View Cart
              </Button>
            </Link>
          </div>
        )}
      </div>
    </Fragment>
  );
}
