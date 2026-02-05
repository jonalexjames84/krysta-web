"use client";

import { useState } from "react";
import Link from "next/link";
import { useCart } from "@/contexts/CartContext";
import { cn } from "@/lib/utils";

const navigation = [
  { name: "Shop", href: "/shop" },
  { name: "Gallery", href: "/gallery" },
  { name: "About", href: "/about" },
  { name: "Inquire", href: "/inquire" },
];

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { itemCount, setIsCartOpen } = useCart();

  return (
    <header className="sticky top-0 z-40 bg-cream/95 backdrop-blur-sm border-b border-sand">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <span className="font-serif text-2xl text-charcoal">
              Krysta Mae
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-charcoal hover:text-clay transition-colors text-sm tracking-wide uppercase"
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Cart Button */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-2 text-charcoal hover:text-clay transition-colors"
              aria-label="Open cart"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                />
              </svg>
              {itemCount > 0 && (
                <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-clay text-xs text-cream">
                  {itemCount}
                </span>
              )}
            </button>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 text-charcoal hover:text-clay transition-colors"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div
        className={cn(
          "md:hidden border-t border-sand overflow-hidden transition-all duration-300",
          isMobileMenuOpen ? "max-h-64" : "max-h-0"
        )}
      >
        <nav className="flex flex-col px-4 py-4 space-y-4">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-charcoal hover:text-clay transition-colors text-sm tracking-wide uppercase"
            >
              {item.name}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
