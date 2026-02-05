import { notFound } from "next/navigation";
import { createServerClient } from "@/lib/supabase/server";
import { ProductImages, ProductInfo } from "@/components/product";
import { ProductGrid } from "@/components/shop";
import type { ProductWithImages } from "@/types/database";

export const revalidate = 60;

interface Props {
  params: Promise<{ slug: string }>;
}

async function getProduct(slug: string) {
  const supabase = createServerClient();

  const { data: product, error } = await supabase
    .from("products")
    .select(
      `
      *,
      product_images (*),
      collection:collections (*)
    `
    )
    .eq("slug", slug)
    .eq("is_active", true)
    .single();

  if (error || !product) {
    return null;
  }

  return product as ProductWithImages;
}

async function getRelatedProducts(
  collectionId: string | null,
  productId: string
) {
  if (!collectionId) return [];

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
    .neq("id", productId)
    .limit(4);

  if (error) {
    console.error("Error fetching related products:", error);
    return [];
  }

  return products as ProductWithImages[];
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const product = await getProduct(slug);

  if (!product) {
    return {
      title: "Product Not Found | Krysta Mae Ceramics",
    };
  }

  return {
    title: `${product.name} | Krysta Mae Ceramics`,
    description: product.description || `Shop ${product.name} - handcrafted ceramic piece.`,
    openGraph: {
      images: product.product_images?.[0]?.url
        ? [product.product_images[0].url]
        : [],
    },
  };
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const product = await getProduct(slug);

  if (!product) {
    notFound();
  }

  const relatedProducts = await getRelatedProducts(
    product.collection_id,
    product.id
  );

  return (
    <div className="bg-cream">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        {/* Product Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Images */}
          <ProductImages
            images={product.product_images || []}
            productName={product.name}
          />

          {/* Info */}
          <ProductInfo product={product} />
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-20 pt-12 border-t border-sand">
            <h2 className="font-serif text-2xl md:text-3xl text-charcoal text-center mb-10">
              You May Also Like
            </h2>
            <ProductGrid products={relatedProducts} />
          </div>
        )}
      </div>
    </div>
  );
}
