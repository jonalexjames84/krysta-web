import Link from "next/link";
import { Button } from "@/components/ui";

export function ArtistIntro() {
  return (
    <section className="py-16 lg:py-24 bg-sand/50">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Image placeholder */}
          <div className="aspect-[4/5] bg-sand rounded-lg overflow-hidden relative order-2 lg:order-1">
            <div className="absolute inset-0 flex items-center justify-center text-charcoal/30">
              Studio Image
            </div>
          </div>

          {/* Content */}
          <div className="space-y-6 order-1 lg:order-2">
            <h2 className="font-serif text-3xl md:text-4xl text-charcoal">
              Made with Intention
            </h2>
            <p className="text-charcoal/80 leading-relaxed">
              Every piece in this collection is handcrafted in my Portland
              studio. From wedging the clay to the final firing, each step is
              done with care and attention to detail.
            </p>
            <p className="text-charcoal/80 leading-relaxed">
              I believe that handmade objects carry a special energy. When you
              bring one of these pieces into your home, you&apos;re not just
              getting a beautiful object – you&apos;re getting a piece of
              someone&apos;s creative journey.
            </p>
            <Link href="/about">
              <Button variant="outline">Learn More</Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
