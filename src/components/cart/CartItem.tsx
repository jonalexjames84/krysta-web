"use client";

import Image from "next/image";
import Link from "next/link";
import { useCart, CartItem as CartItemType } from "@/contexts/CartContext";
import { formatCurrency } from "@/lib/utils";

interface CartItemProps {
  item: CartItemType;
  showControls?: boolean;
}

export function CartItem({ item, showControls = true }: CartItemProps) {
  const { removeItem, updateQuantity } = useCart();

  return (
    <div className="flex gap-4 py-4 border-b border-sand last:border-0">
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
            <span className="text-charcoal/30 text-xs">No image</span>
          </div>
        )}
      </div>

      {/* Details */}
      <div className="flex flex-1 flex-col">
        <div className="flex justify-between">
          <Link
            href={`/product/${item.slug}`}
            className="font-medium text-charcoal hover:text-clay transition-colors"
          >
            {item.name}
          </Link>
          {showControls && (
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
          )}
        </div>

        <p className="mt-1 text-sm text-charcoal/70">
          {formatCurrency(item.price)}
        </p>

        {/* Quantity */}
        {showControls ? (
          <div className="mt-2 flex items-center gap-2">
            <button
              onClick={() => updateQuantity(item.id, item.quantity - 1)}
              className="flex h-8 w-8 items-center justify-center rounded-md border border-sand text-charcoal hover:bg-sand transition-colors"
              aria-label="Decrease quantity"
            >
              -
            </button>
            <span className="w-8 text-center text-sm">{item.quantity}</span>
            <button
              onClick={() => updateQuantity(item.id, item.quantity + 1)}
              className="flex h-8 w-8 items-center justify-center rounded-md border border-sand text-charcoal hover:bg-sand transition-colors"
              aria-label="Increase quantity"
            >
              +
            </button>
          </div>
        ) : (
          <p className="mt-1 text-sm text-charcoal/50">Qty: {item.quantity}</p>
        )}
      </div>

      {/* Line Total */}
      <div className="text-right">
        <p className="font-medium text-charcoal">
          {formatCurrency(item.price * item.quantity)}
        </p>
      </div>
    </div>
  );
}
