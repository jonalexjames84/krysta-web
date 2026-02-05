"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import type { Collection } from "@/types/database";

interface CollectionFilterProps {
  collections: Collection[];
}

export function CollectionFilter({ collections }: CollectionFilterProps) {
  const pathname = usePathname();

  return (
    <div className="flex flex-wrap gap-2">
      <Link
        href="/shop"
        className={cn(
          "rounded-full px-4 py-2 text-sm transition-colors",
          pathname === "/shop"
            ? "bg-clay text-cream"
            : "bg-sand text-charcoal hover:bg-clay hover:text-cream"
        )}
      >
        All
      </Link>
      {collections.map((collection) => (
        <Link
          key={collection.id}
          href={`/shop/${collection.slug}`}
          className={cn(
            "rounded-full px-4 py-2 text-sm transition-colors",
            pathname === `/shop/${collection.slug}`
              ? "bg-clay text-cream"
              : "bg-sand text-charcoal hover:bg-clay hover:text-cream"
          )}
        >
          {collection.name}
        </Link>
      ))}
    </div>
  );
}
