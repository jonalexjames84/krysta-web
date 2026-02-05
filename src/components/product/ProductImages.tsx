"use client";

import { useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import type { ProductImage } from "@/types/database";

interface ProductImagesProps {
  images: ProductImage[];
  productName: string;
}

export function ProductImages({ images, productName }: ProductImagesProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);

  if (images.length === 0) {
    return (
      <div className="aspect-square rounded-lg bg-sand flex items-center justify-center">
        <span className="text-charcoal/30">No image</span>
      </div>
    );
  }

  const selectedImage = images[selectedIndex];

  return (
    <div className="space-y-4">
      {/* Main Image */}
      <div className="relative aspect-square overflow-hidden rounded-lg bg-sand">
        <Image
          src={selectedImage.url}
          alt={selectedImage.alt_text || productName}
          fill
          className="object-cover"
          priority
        />
      </div>

      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="flex gap-3 overflow-x-auto pb-2">
          {images.map((image, index) => (
            <button
              key={image.id}
              onClick={() => setSelectedIndex(index)}
              className={cn(
                "relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-md",
                selectedIndex === index
                  ? "ring-2 ring-clay"
                  : "ring-1 ring-sand hover:ring-clay/50"
              )}
            >
              <Image
                src={image.url}
                alt={image.alt_text || `${productName} ${index + 1}`}
                fill
                className="object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
