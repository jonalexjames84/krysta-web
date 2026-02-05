import { createServerClient } from "@/lib/supabase/server";
import { ProductGrid, CollectionFilter } from "@/components/shop";
import type { ProductWithImages, Collection } from "@/types/database";

export const metadata = {
  title: "Shop | Krysta Mae Ceramics",
  description: "Browse our collection of handcrafted ceramic pieces.",
};

export const revalidate = 60; // Revalidate every 60 seconds

async function getProducts(): Promise<ProductWithImages[]> {
  const supabase = createServerClient();

  const { data: products, error } = await supabase
    .from("products")
    .select(
      `
      *,
      product_images (*),
      collection:collections (*)
    `
    )
    .eq("is_active", true)
    .order("created_at", { ascending: false }) as { data: ProductWithImages[] | null; error: unknown };

  if (error) {
    console.error("Error fetching products:", error);
    return [];
  }

  return products || [];
}

async function getCollections(): Promise<Collection[]> {
  const supabase = createServerClient();

  const { data: collections, error } = await supabase
    .from("collections")
    .select("*")
    .order("sort_order", { ascending: true }) as { data: Collection[] | null; error: unknown };

  if (error) {
    console.error("Error fetching collections:", error);
    return [];
  }

  return collections || [];
}

export default async function ShopPage() {
  const [products, collections] = await Promise.all([
    getProducts(),
    getCollections(),
  ]);

  return (
    <div className="bg-cream">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="font-serif text-4xl md:text-5xl text-charcoal">
            Shop
          </h1>
          <p className="mt-4 text-charcoal/70 max-w-2xl mx-auto">
            Each piece is handcrafted with care, bringing unique character to
            your home.
          </p>
        </div>

        {/* Filters */}
        <div className="mb-10">
          <CollectionFilter collections={collections} />
        </div>

        {/* Products */}
        <ProductGrid products={products} />
      </div>
    </div>
  );
}
