"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui";
import { useCart } from "@/contexts/CartContext";
import { formatCurrency } from "@/lib/utils";
import type { ProductWithImages } from "@/types/database";

interface ProductCardProps {
  product: ProductWithImages;
}

export function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCart();
  const primaryImage = product.product_images?.[0];
  const isOutOfStock = product.inventory_quantity <= 0;

  return (
    <div className="group">
      {/* Image */}
      <Link href={`/product/${product.slug}`} className="block">
        <div className="relative aspect-square overflow-hidden rounded-lg bg-sand">
          {primaryImage ? (
            <Image
              src={primaryImage.url}
              alt={primaryImage.alt_text || product.name}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
          ) : (
            <div className="flex h-full items-center justify-center">
              <span className="text-charcoal/30">No image</span>
            </div>
          )}

          {isOutOfStock && (
            <div className="absolute inset-0 flex items-center justify-center bg-charcoal/50">
              <span className="rounded-md bg-cream px-3 py-1 text-sm font-medium text-charcoal">
                Sold Out
              </span>
            </div>
          )}

          {product.is_featured && !isOutOfStock && (
            <div className="absolute left-3 top-3">
              <span className="rounded-md bg-clay px-2 py-1 text-xs font-medium text-cream">
                Featured
              </span>
            </div>
          )}
        </div>
      </Link>

      {/* Info */}
      <div className="mt-4">
        <Link href={`/product/${product.slug}`}>
          <h3 className="font-serif text-lg text-charcoal group-hover:text-clay transition-colors">
            {product.name}
          </h3>
        </Link>

        <div className="mt-1 flex items-center gap-2">
          <span className="text-charcoal">{formatCurrency(product.price)}</span>
          {product.compare_at_price && product.compare_at_price > product.price && (
            <span className="text-sm text-charcoal/50 line-through">
              {formatCurrency(product.compare_at_price)}
            </span>
          )}
        </div>

        <Button
          variant="outline"
          size="sm"
          className="mt-3 w-full"
          disabled={isOutOfStock}
          onClick={() => addItem(product)}
        >
          {isOutOfStock ? "Sold Out" : "Add to Cart"}
        </Button>
      </div>
    </div>
  );
}
