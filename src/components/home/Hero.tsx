import Link from "next/link";
import { Button } from "@/components/ui";

export function Hero() {
  return (
    <section className="relative min-h-[80vh] flex items-center justify-center bg-sand">
      {/* Background pattern/texture could go here */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-cream/30" />

      <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl text-charcoal leading-tight">
          Handcrafted
          <br />
          <span className="text-clay">Ceramics</span>
        </h1>

        <p className="mt-6 text-lg md:text-xl text-charcoal/70 max-w-2xl mx-auto">
          Each piece is thoughtfully created with care, bringing unique
          character and warmth to your home.
        </p>

        <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/shop">
            <Button size="lg">Shop Collection</Button>
          </Link>
          <Link href="/about">
            <Button variant="outline" size="lg">
              Meet the Artist
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
