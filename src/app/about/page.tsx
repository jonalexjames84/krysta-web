import Image from "next/image";

export const metadata = {
  title: "About | Krysta Mae Ceramics",
  description: "Learn about Krysta Mae and the story behind each handcrafted ceramic piece.",
};

export default function AboutPage() {
  return (
    <div className="bg-cream">
      {/* Hero Section */}
      <section className="relative h-[50vh] min-h-[400px] bg-sand flex items-center justify-center">
        <div className="absolute inset-0 bg-charcoal/10" />
        <div className="relative text-center px-4">
          <h1 className="font-serif text-4xl md:text-6xl text-charcoal">
            About the Artist
          </h1>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-16 lg:py-24">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="aspect-[4/5] bg-sand rounded-lg overflow-hidden relative">
              <div className="absolute inset-0 flex items-center justify-center text-charcoal/30">
                Artist Photo
              </div>
            </div>

            <div className="space-y-6">
              <h2 className="font-serif text-3xl text-charcoal">
                Hello, I&apos;m Krysta Mae
              </h2>
              <p className="text-charcoal/80 leading-relaxed">
                My journey with ceramics began as a quiet exploration into
                mindfulness and creativity. What started as a hobby quickly
                became a passion, and eventually, a way of life.
              </p>
              <p className="text-charcoal/80 leading-relaxed">
                Each piece I create is a reflection of the natural world that
                inspires me daily. From the earthy textures to the organic
                shapes, every ceramic tells a story of patience, intention, and
                love for the craft.
              </p>
              <p className="text-charcoal/80 leading-relaxed">
                Working with clay connects me to something ancient and timeless.
                There&apos;s a meditative quality to throwing on the wheel,
                shaping each form by hand, and watching the transformation
                through the kiln.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="py-16 lg:py-24 bg-sand/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-serif text-3xl text-charcoal mb-8">
            My Philosophy
          </h2>
          <p className="text-lg text-charcoal/80 leading-relaxed max-w-2xl mx-auto">
            &quot;I believe that handmade objects carry a special energy. When
            you hold something made by human hands, you&apos;re connecting with
            the maker&apos;s intention, care, and creativity. My goal is to
            create pieces that bring beauty and meaning to your everyday
            moments.&quot;
          </p>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-16 lg:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <h2 className="font-serif text-3xl text-charcoal text-center mb-12">
            The Process
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-clay/20 flex items-center justify-center">
                <span className="font-serif text-2xl text-clay">1</span>
              </div>
              <h3 className="font-serif text-xl text-charcoal mb-2">
                Hand Formed
              </h3>
              <p className="text-charcoal/70">
                Each piece begins on the wheel or is hand-built, shaped with
                intention and care.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-clay/20 flex items-center justify-center">
                <span className="font-serif text-2xl text-clay">2</span>
              </div>
              <h3 className="font-serif text-xl text-charcoal mb-2">
                Glazed
              </h3>
              <p className="text-charcoal/70">
                Custom glazes are applied by hand, creating unique variations in
                each piece.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-clay/20 flex items-center justify-center">
                <span className="font-serif text-2xl text-clay">3</span>
              </div>
              <h3 className="font-serif text-xl text-charcoal mb-2">
                Kiln Fired
              </h3>
              <p className="text-charcoal/70">
                High-fired in the kiln, transforming clay into durable,
                functional art.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
