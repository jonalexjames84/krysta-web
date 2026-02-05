"use client";

import Link from "next/link";
import { NewsletterForm } from "@/components/forms/NewsletterForm";

const footerLinks = {
  shop: [
    { name: "All Products", href: "/shop" },
    { name: "New Arrivals", href: "/shop?sort=newest" },
    { name: "Featured", href: "/shop?featured=true" },
  ],
  info: [
    { name: "About", href: "/about" },
    { name: "Gallery", href: "/gallery" },
    { name: "Inquire", href: "/inquire" },
  ],
  social: [
    { name: "Instagram", href: "https://instagram.com" },
    { name: "Pinterest", href: "https://pinterest.com" },
  ],
};

export function Footer() {
  return (
    <footer className="bg-sand">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link href="/" className="inline-block">
              <span className="font-serif text-2xl text-charcoal">
                Krysta Mae
              </span>
            </Link>
            <p className="mt-4 text-sm text-charcoal/70 leading-relaxed">
              Handcrafted ceramic pieces made with love and intention. Each
              piece tells a story.
            </p>
          </div>

          {/* Shop Links */}
          <div>
            <h3 className="text-sm font-medium text-charcoal uppercase tracking-wide">
              Shop
            </h3>
            <ul className="mt-4 space-y-3">
              {footerLinks.shop.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-charcoal/70 hover:text-clay transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Info Links */}
          <div>
            <h3 className="text-sm font-medium text-charcoal uppercase tracking-wide">
              Information
            </h3>
            <ul className="mt-4 space-y-3">
              {footerLinks.info.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-charcoal/70 hover:text-clay transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-sm font-medium text-charcoal uppercase tracking-wide">
              Stay Connected
            </h3>
            <p className="mt-4 text-sm text-charcoal/70">
              Subscribe for updates on new pieces and studio news.
            </p>
            <div className="mt-4">
              <NewsletterForm />
            </div>
            <div className="mt-6 flex space-x-4">
              {footerLinks.social.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-charcoal/70 hover:text-clay transition-colors"
                >
                  {link.name}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 pt-8 border-t border-earth/20">
          <p className="text-sm text-charcoal/50 text-center">
            &copy; {new Date().getFullYear()} Krysta Mae Ceramics. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
