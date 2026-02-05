"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui";
import { useCart } from "@/contexts/CartContext";
import { formatCurrency } from "@/lib/utils";
import type { ProductWithImages } from "@/types/database";

interface ProductInfoProps {
  product: ProductWithImages;
}

export function ProductInfo({ product }: ProductInfoProps) {
  const { addItem } = useCart();
  const [quantity, setQuantity] = useState(1);
  const isOutOfStock = product.inventory_quantity <= 0;
  const lowStock = product.inventory_quantity > 0 && product.inventory_quantity <= 3;

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addItem(product);
    }
  };

  return (
    <div className="space-y-6">
      {/* Collection */}
      {product.collection && (
        <Link
          href={`/shop/${product.collection.slug}`}
          className="text-sm text-clay hover:text-earth transition-colors uppercase tracking-wide"
        >
          {product.collection.name}
        </Link>
      )}

      {/* Name */}
      <h1 className="font-serif text-3xl md:text-4xl text-charcoal">
        {product.name}
      </h1>

      {/* Price */}
      <div className="flex items-center gap-3">
        <span className="text-2xl text-charcoal">
          {formatCurrency(product.price)}
        </span>
        {product.compare_at_price && product.compare_at_price > product.price && (
          <span className="text-lg text-charcoal/50 line-through">
            {formatCurrency(product.compare_at_price)}
          </span>
        )}
      </div>

      {/* Description */}
      {product.description && (
        <div className="prose prose-charcoal">
          <p className="text-charcoal/80 leading-relaxed">
            {product.description}
          </p>
        </div>
      )}

      {/* Stock Status */}
      {isOutOfStock ? (
        <p className="text-red-600 font-medium">Out of Stock</p>
      ) : lowStock ? (
        <p className="text-earth font-medium">
          Only {product.inventory_quantity} left in stock
        </p>
      ) : null}

      {/* Quantity Selector */}
      {!isOutOfStock && (
        <div className="flex items-center gap-4">
          <span className="text-sm text-charcoal">Quantity</span>
          <div className="flex items-center">
            <button
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="flex h-10 w-10 items-center justify-center rounded-l-md border border-sand text-charcoal hover:bg-sand transition-colors"
              aria-label="Decrease quantity"
            >
              -
            </button>
            <span className="flex h-10 w-12 items-center justify-center border-y border-sand text-center">
              {quantity}
            </span>
            <button
              onClick={() =>
                setQuantity(Math.min(product.inventory_quantity, quantity + 1))
              }
              className="flex h-10 w-10 items-center justify-center rounded-r-md border border-sand text-charcoal hover:bg-sand transition-colors"
              aria-label="Increase quantity"
            >
              +
            </button>
          </div>
        </div>
      )}

      {/* Add to Cart */}
      <Button
        size="lg"
        className="w-full"
        disabled={isOutOfStock}
        onClick={handleAddToCart}
      >
        {isOutOfStock ? "Sold Out" : "Add to Cart"}
      </Button>

      {/* Additional Info */}
      <div className="border-t border-sand pt-6 space-y-4">
        <div className="flex items-start gap-3">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 text-clay flex-shrink-0 mt-0.5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"
            />
          </svg>
          <div>
            <p className="text-sm font-medium text-charcoal">Free Shipping</p>
            <p className="text-sm text-charcoal/70">On orders over $100</p>
          </div>
        </div>
        <div className="flex items-start gap-3">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 text-clay flex-shrink-0 mt-0.5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <div>
            <p className="text-sm font-medium text-charcoal">Handmade</p>
            <p className="text-sm text-charcoal/70">Each piece is unique</p>
          </div>
        </div>
      </div>
    </div>
  );
}
