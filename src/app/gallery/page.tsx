import Image from "next/image";
import { createServerClient } from "@/lib/supabase/server";
import type { GalleryImage } from "@/types/database";

export const metadata = {
  title: "Gallery | Krysta Mae Ceramics",
  description: "Explore our gallery of handcrafted ceramic pieces and studio work.",
};

export const revalidate = 60;

async function getGalleryImages(): Promise<GalleryImage[]> {
  const supabase = createServerClient();

  const { data: images, error } = await supabase
    .from("gallery_images")
    .select("*")
    .order("sort_order", { ascending: true }) as { data: GalleryImage[] | null; error: unknown };

  if (error) {
    console.error("Error fetching gallery images:", error);
    return [];
  }

  return images || [];
}

export default async function GalleryPage() {
  const images = await getGalleryImages();

  return (
    <div className="bg-cream">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="font-serif text-4xl md:text-5xl text-charcoal">
            Gallery
          </h1>
          <p className="mt-4 text-charcoal/70 max-w-2xl mx-auto">
            A collection of moments from the studio, finished pieces, and the
            creative process behind each handcrafted ceramic.
          </p>
        </div>

        {/* Gallery Grid */}
        {images.length > 0 ? (
          <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
            {images.map((image, index) => (
              <div
                key={image.id}
                className="break-inside-avoid overflow-hidden rounded-lg bg-sand"
              >
                <div className="relative">
                  <Image
                    src={image.url}
                    alt={image.alt_text || `Gallery image ${index + 1}`}
                    width={600}
                    height={600}
                    className="w-full h-auto object-cover"
                  />
                  {image.caption && (
                    <div className="absolute inset-0 bg-charcoal/60 opacity-0 hover:opacity-100 transition-opacity flex items-end">
                      <p className="p-4 text-cream text-sm">{image.caption}</p>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-charcoal/70">Gallery coming soon.</p>
          </div>
        )}
      </div>
    </div>
  );
}
