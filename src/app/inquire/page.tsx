import { InquiryForm } from "@/components/forms";

export const metadata = {
  title: "Inquire | Krysta Mae Ceramics",
  description: "Get in touch for custom orders, collaborations, or any questions about our ceramics.",
};

export default function InquirePage() {
  return (
    <div className="bg-cream">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="font-serif text-4xl md:text-5xl text-charcoal">
            Get in Touch
          </h1>
          <p className="mt-4 text-charcoal/70 max-w-2xl mx-auto">
            Have a question about a piece, interested in a custom order, or just
            want to say hello? I&apos;d love to hear from you.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div className="space-y-8">
            <div>
              <h2 className="font-serif text-2xl text-charcoal mb-4">
                Let&apos;s Connect
              </h2>
              <p className="text-charcoal/70 leading-relaxed">
                Whether you&apos;re looking for a custom piece, have questions
                about care instructions, or want to discuss a collaboration,
                I&apos;m here to help.
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-clay/20 flex items-center justify-center flex-shrink-0">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-clay"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <div>
                  <p className="font-medium text-charcoal">Email</p>
                  <p className="text-charcoal/70">hello@krystamae.com</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-clay/20 flex items-center justify-center flex-shrink-0">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-clay"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <div>
                  <p className="font-medium text-charcoal">Response Time</p>
                  <p className="text-charcoal/70">Within 24-48 hours</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-clay/20 flex items-center justify-center flex-shrink-0">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-clay"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                </div>
                <div>
                  <p className="font-medium text-charcoal">Studio</p>
                  <p className="text-charcoal/70">Portland, Oregon</p>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-sand">
              <p className="font-medium text-charcoal mb-2">Follow Along</p>
              <div className="flex gap-4">
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-charcoal/70 hover:text-clay transition-colors"
                >
                  Instagram
                </a>
                <a
                  href="https://pinterest.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-charcoal/70 hover:text-clay transition-colors"
                >
                  Pinterest
                </a>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white rounded-lg shadow-sm p-6 lg:p-8">
            <InquiryForm />
          </div>
        </div>
      </div>
    </div>
  );
}
