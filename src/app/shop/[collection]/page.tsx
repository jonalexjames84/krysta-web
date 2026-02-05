import { notFound } from "next/navigation";
import { createServerClient } from "@/lib/supabase/server";
import { ProductGrid, CollectionFilter } from "@/components/shop";
import type { ProductWithImages, Collection } from "@/types/database";

export const revalidate = 60;

interface Props {
  params: Promise<{ collection: string }>;
}

async function getCollection(slug: string): Promise<Collection | null> {
  const supabase = createServerClient();

  const { data: collection, error } = await supabase
    .from("collections")
    .select("*")
    .eq("slug", slug)
    .single() as { data: Collection | null; error: unknown };

  if (error || !collection) {
    return null;
  }

  return collection;
}

async function getProductsByCollection(collectionId: string): Promise<ProductWithImages[]> {
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
    .eq("collection_id", collectionId)
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

export async function generateMetadata({ params }: Props) {
  const { collection: slug } = await params;
  const collection = await getCollection(slug);

  if (!collection) {
    return {
      title: "Collection Not Found | Krysta Mae Ceramics",
    };
  }

  return {
    title: `${collection.name} | Krysta Mae Ceramics`,
    description: collection.description || `Shop the ${collection.name} collection.`,
  };
}

export default async function CollectionPage({ params }: Props) {
  const { collection: slug } = await params;
  const collection = await getCollection(slug);

  if (!collection) {
    notFound();
  }

  const [products, collections] = await Promise.all([
    getProductsByCollection(collection.id),
    getCollections(),
  ]);

  return (
    <div className="bg-cream">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="font-serif text-4xl md:text-5xl text-charcoal">
            {collection.name}
          </h1>
          {collection.description && (
            <p className="mt-4 text-charcoal/70 max-w-2xl mx-auto">
              {collection.description}
            </p>
          )}
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
