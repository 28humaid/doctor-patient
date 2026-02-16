'use client';

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X } from "lucide-react";

const publicItems = [
  { href: "/",          label: "Home" },
  { href: "/about-us",  label: "About Us" },
  { href: "/case-study",label: "Case Studies" },
  { href: "/medicine",  label: "Medicines" },
  { href: "/services",  label: "Services" },
  { href: "/contact-us",label: "Contact Us" },
];

export default function UserNavbar() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  const isActive = (href) => href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-[hsl(var(--color-gray-200))]">
      <div className="container flex items-center justify-between h-16">
        <Link href="/" className="flex items-center gap-2 text-xl font-bold text-[hsl(var(--color-primary))]">
          <Image src="/logo.svg" alt="MedPortal Logo" width={60} height={40} className="object-contain" priority />
        </Link>

        {/* Desktop */}
        <nav className="hidden md:flex items-center gap-6">
          {publicItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`text-sm font-medium transition-colors ${
                isActive(item.href) ? "text-[hsl(var(--color-primary))] font-semibold" : "text-[hsl(var(--color-gray-700))] hover:text-[hsl(var(--color-primary))]"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Mobile button */}
        <button
          className="md:hidden p-2 text-[hsl(var(--color-gray-700))] hover:text-[hsl(var(--color-primary))]"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
        >
          {menuOpen ? <X className="h-7 w-7" /> : <Menu className="h-7 w-7" />}
        </button>
      </div>

      {/* Mobile panel */}
      {menuOpen && (
        <>
          <div className="fixed inset-y-0 right-0 w-72 bg-white shadow-2xl transition-transform md:hidden z-50 translate-x-0">
            <div className="flex flex-col h-full p-6">
              <div className="flex justify-end mb-4">
                <button onClick={() => setMenuOpen(false)}>
                  <X className="h-8 w-8" />
                </button>
              </div>
              <nav className="flex flex-col gap-6 text-lg font-medium">
                {publicItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={isActive(item.href) ? "text-[hsl(var(--color-primary))] font-semibold" : "text-[hsl(var(--color-gray-700))] hover:text-[hsl(var(--color-primary))]"}
                    onClick={() => setMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>
            </div>
          </div>
          <div className="fixed inset-0 bg-black/30 md:hidden z-40 backdrop-blur-[2px]" onClick={() => setMenuOpen(false)} />
        </>
      )}
    </header>
  );
}