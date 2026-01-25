"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

// Import only the icons you need (tree-shakable)
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  const isAdminRoute = pathname.startsWith("/admin");

  const publicItems = [
    { href: "/", label: "Home" },
    { href: "/about-us", label: "About Us" },
    { href: "/case-study", label: "Case Studies" },
    { href: "/medicine", label: "Medicines" },
    { href: "/services", label: "Services" },
    { href: "/contact-us", label: "Contact Us" },
  ];

  const adminItems = [
    { href: "/admin/prescriptions", label: "Prescriptions" },
    { href: "/admin/case-study", label: "Case Studies" },
    { href: "/admin/medicine", label: "Medicines" },
  ];

  const items = isAdminRoute ? adminItems : publicItems;
  const brand = isAdminRoute ? "Admin Panel" : "MedPortal";

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-[hsl(var(--color-gray-200))]">
      <div className="container flex items-center justify-between h-16">
        {/* Logo / Brand */}
        <Link
          href={isAdminRoute ? "/admin" : "/"}
          className="flex items-center gap-2 text-xl font-bold text-[hsl(var(--color-primary))]"
        >
          <Image
            src="/logo.svg"           // Make sure this exists in /public/logo.svg
            alt="MedPortal Logo"
            width={60}
            height={40}
            className="object-contain"
            priority
          />
          {/* Optional: show text brand next to logo if you want */}
          {/* <span className="hidden sm:inline">{brand}</span> */}
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          {items.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`text-sm font-medium transition-colors ${
                (isAdminRoute
                  ? pathname.startsWith(item.href)
                  : pathname === item.href)
                  ? "text-[hsl(var(--color-primary))] font-semibold"
                  : "text-[hsl(var(--color-gray-700))] hover:text-[hsl(var(--color-primary))]"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Hamburger Button – mobile only */}
        <button
          className="md:hidden p-2 text-[hsl(var(--color-gray-700))] hover:text-[hsl(var(--color-primary))] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[hsl(var(--color-primary))]"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
        >
          {menuOpen ? (
            <X className="h-7 w-7" strokeWidth={2.2} />
          ) : (
            <Menu className="h-7 w-7" strokeWidth={2.2} />
          )}
        </button>
      </div>

      {/* Mobile Slide-in Panel */}
      <div
        className={`fixed inset-y-0 right-0 w-72 bg-white shadow-2xl transform transition-transform duration-300 ease-in-out md:hidden z-50 ${
          menuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full p-6">
          <div className="flex justify-end items-center mb-4">
            <button
              className="text-[hsl(var(--color-gray-700))] hover:text-[hsl(var(--color-primary))] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[hsl(var(--color-primary))]"
              onClick={() => setMenuOpen(false)}
              aria-label="Close menu"
            >
              <X className="h-8 w-8" strokeWidth={2.2} />
            </button>
          </div>

          <nav className="flex flex-col gap-6">
            {items.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`text-lg font-medium transition-colors ${
                  (isAdminRoute
                    ? pathname.startsWith(item.href)
                    : pathname === item.href)
                    ? "text-[hsl(var(--color-primary))] font-semibold"
                    : "text-[hsl(var(--color-gray-700))] hover:text-[hsl(var(--color-primary))]"
                }`}
                onClick={() => setMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>

      {/* Backdrop when menu is open */}
      {menuOpen && (
        <div
          className="fixed inset-0 bg-black/30 md:hidden z-40 backdrop-blur-[2px]"
          onClick={() => setMenuOpen(false)}
          aria-hidden="true"
        />
      )}
    </header>
  );
}