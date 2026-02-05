import { createServerClient } from "@/lib/supabase/server";
import { Hero, FeaturedCollection, ArtistIntro } from "@/components/home";
import type { ProductWithImages } from "@/types/database";

export const revalidate = 60;

async function getFeaturedProducts(): Promise<ProductWithImages[]> {
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
    .eq("is_featured", true)
    .order("created_at", { ascending: false })
    .limit(4) as { data: ProductWithImages[] | null; error: unknown };

  if (error) {
    console.error("Error fetching featured products:", error);
    return [];
  }

  return products || [];
}

export default async function HomePage() {
  const featuredProducts = await getFeaturedProducts();

  return (
    <div>
      <Hero />
      <FeaturedCollection products={featuredProducts} />
      <ArtistIntro />
    </div>
  );
}
