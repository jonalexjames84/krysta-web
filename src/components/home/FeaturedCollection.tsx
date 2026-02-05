import Link from "next/link";
import { ProductGrid } from "@/components/shop";
import { Button } from "@/components/ui";
import type { ProductWithImages } from "@/types/database";

interface FeaturedCollectionProps {
  products: ProductWithImages[];
}

export function FeaturedCollection({ products }: FeaturedCollectionProps) {
  if (products.length === 0) return null;

  return (
    <section className="py-16 lg:py-24 bg-cream">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="font-serif text-3xl md:text-4xl text-charcoal">
            Featured Pieces
          </h2>
          <p className="mt-4 text-charcoal/70 max-w-2xl mx-auto">
            Our most beloved creations, handpicked for their unique beauty and
            craftsmanship.
          </p>
        </div>

        <ProductGrid products={products} />

        <div className="mt-12 text-center">
          <Link href="/shop">
            <Button variant="outline" size="lg">
              View All Products
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
