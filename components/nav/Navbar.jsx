// components/nav/Navbar.jsx
'use client';

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X, LogOut } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext"; // adjust path

export default function Navbar() {
  const { isAuthenticated, isLoading, logout } = useAuth();
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

  // Decide what to show
  let items = [];
  let showNavLinks = false;

  if (isLoading) {
    // During load → minimal (just logo)
    showNavLinks = false;
  } else if (isAdminRoute && isAuthenticated) {
    items = adminItems;
    showNavLinks = true;
  } else if (!isAdminRoute) {
    items = publicItems;
    showNavLinks = true;
  } else {
    // Admin route + not authenticated → only logo (middleware already redirects, but safe)
    showNavLinks = false;
  }

  const brand = isAdminRoute ? "Admin Panel" : "MedPortal";

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-[hsl(var(--color-gray-200))]">
      <div className="container flex items-center justify-between h-16">
        {/* Logo / Brand - always visible */}
        <Link
          href={isAdminRoute ? "/admin" : "/"}
          className="flex items-center gap-2 text-xl font-bold text-[hsl(var(--color-primary))]"
        >
          <Image
            src="/logo.svg"
            alt="MedPortal Logo"
            width={60}
            height={40}
            className="object-contain"
            priority
          />
        </Link>

        {/* Desktop Navigation - only when we want links */}
        {showNavLinks && (
          <nav className="hidden md:flex items-center gap-6">
            {items.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`text-sm font-medium transition-colors ${
                  pathname === item.href || (isAdminRoute && pathname.startsWith(item.href))
                    ? "text-[hsl(var(--color-primary))] font-semibold"
                    : "text-[hsl(var(--color-gray-700))] hover:text-[hsl(var(--color-primary))]"
                }`}
              >
                {item.label}
              </Link>
            ))}

            {/* Logout - only in admin + logged in */}
            {isAdminRoute && isAuthenticated && (
              <button
                onClick={logout}
                className="flex items-center gap-2 text-sm font-medium text-red-600 hover:text-red-800 transition-colors"
              >
                <LogOut className="h-4 w-4" />
                Logout
              </button>
            )}
          </nav>
        )}

        {/* Hamburger - only show if we have links */}
        {showNavLinks && (
          <button
            className="md:hidden p-2 text-[hsl(var(--color-gray-700))] hover:text-[hsl(var(--color-primary))]"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
          >
            {menuOpen ? <X className="h-7 w-7" /> : <Menu className="h-7 w-7" />}
          </button>
        )}
      </div>

      {/* Mobile menu - same logic */}
      {showNavLinks && menuOpen && (
        <div className="fixed inset-y-0 right-0 w-72 bg-white shadow-2xl transform transition-transform md:hidden z-50 translate-x-0">
          <div className="flex flex-col h-full p-6">
            <div className="flex justify-end mb-4">
              <button onClick={() => setMenuOpen(false)}>
                <X className="h-8 w-8" />
              </button>
            </div>
            <nav className="flex flex-col gap-6">
              {items.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`text-lg font-medium ${
                    pathname === item.href || (isAdminRoute && pathname.startsWith(item.href))
                      ? "text-[hsl(var(--color-primary))] font-semibold"
                      : "text-[hsl(var(--color-gray-700))] hover:text-[hsl(var(--color-primary))]"
                  }`}
                  onClick={() => setMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}

              {isAdminRoute && isAuthenticated && (
                <button
                  onClick={() => {
                    logout();
                    setMenuOpen(false);
                  }}
                  className="text-lg font-medium text-red-600 hover:text-red-800 text-left"
                >
                  Logout
                </button>
              )}
            </nav>
          </div>
        </div>
      )}

      {menuOpen && showNavLinks && (
        <div
          className="fixed inset-0 bg-black/30 md:hidden z-40 backdrop-blur-[2px]"
          onClick={() => setMenuOpen(false)}
        />
      )}
    </header>
  );
}