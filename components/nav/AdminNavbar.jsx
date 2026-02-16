// components/nav/AdminNavbar.jsx
'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { Menu, X, LogOut } from 'lucide-react';
import ConfirmModal from '@/components/common/ConfirmModal';
import { useAuth } from '@/contexts/AuthContext';

const adminItems = [
  { href: '/admin/prescriptions', label: 'Prescriptions' },
  { href: '/admin/case-study',    label: 'Case Studies' },
  { href: '/admin/medicine',      label: 'Medicines' },
];

export default function AdminNavbar() {
  const pathname = usePathname();
  const { isAuthenticated, isLoading, logout } = useAuth();

  const [menuOpen, setMenuOpen] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const handleLogout = async () => {
    setShowLogoutModal(false);
    await logout();           // context handles redirect
  };

  const isActive = (href) => pathname.startsWith(href);

  // Show minimal header while loading or not authenticated
  if (isLoading) {
    return (
      <header className="sticky top-0 z-50 bg-white border-b border-[hsl(var(--color-gray-200))]">
        <div className="container flex items-center justify-between h-16">
          <Link href="/admin" className="flex items-center gap-2 text-xl font-bold text-[hsl(var(--color-primary))]">
            <Image src="/logo.svg" alt="MedPortal Logo" width={60} height={40} className="object-contain" priority />
            <span className="hidden sm:inline">Admin Panel</span>
          </Link>
        </div>
      </header>
    );
  }

  return (
    <>
      <header className="sticky top-0 z-50 bg-white border-b border-[hsl(var(--color-gray-200))]">
        <div className="container flex items-center justify-between h-16">
          <Link href="/admin" className="flex items-center gap-2 text-xl font-bold text-[hsl(var(--color-primary))]">
            <Image src="/logo.svg" alt="MedPortal Logo" width={60} height={40} className="object-contain" priority />
            <span className="hidden sm:inline">Admin Panel</span>
          </Link>

          {isAuthenticated && (
            <>
              {/* Desktop */}
              <nav className="hidden md:flex items-center gap-6">
                {adminItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`text-sm font-medium transition-colors ${
                      isActive(item.href)
                        ? 'text-[hsl(var(--color-primary))] font-semibold'
                        : 'text-[hsl(var(--color-gray-700))] hover:text-[hsl(var(--color-primary))]'
                    }`}
                  >
                    {item.label}
                  </Link>
                ))}
                <button
                  onClick={() => setShowLogoutModal(true)}
                  className="flex items-center gap-2 text-sm font-medium text-red-600 hover:text-red-800 transition-colors"
                >
                  <LogOut className="h-4 w-4" />
                  Logout
                </button>
              </nav>

              {/* Mobile trigger */}
              <button
                className="md:hidden p-2 text-[hsl(var(--color-gray-700))] hover:text-[hsl(var(--color-primary))]"
                onClick={() => setMenuOpen(!menuOpen)}
                aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              >
                {menuOpen ? <X className="h-7 w-7" /> : <Menu className="h-7 w-7" />}
              </button>
            </>
          )}
        </div>

        {/* Mobile menu — only when authenticated */}
        {isAuthenticated && menuOpen && (
          <>
            <div className="fixed inset-y-0 right-0 w-72 bg-white shadow-2xl md:hidden z-50">
              <div className="flex flex-col h-full p-6">
                <div className="flex justify-end mb-4">
                  <button onClick={() => setMenuOpen(false)}>
                    <X className="h-8 w-8" />
                  </button>
                </div>
                <nav className="flex flex-col gap-6 text-lg font-medium">
                  {adminItems.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={
                        isActive(item.href)
                          ? 'text-[hsl(var(--color-primary))] font-semibold'
                          : 'text-[hsl(var(--color-gray-700))] hover:text-[hsl(var(--color-primary))]'
                      }
                      onClick={() => setMenuOpen(false)}
                    >
                      {item.label}
                    </Link>
                  ))}
                  <button
                    onClick={() => {
                      setShowLogoutModal(true);
                      setMenuOpen(false);
                    }}
                    className="text-left text-red-600 hover:text-red-800 font-medium"
                  >
                    Logout
                  </button>
                </nav>
              </div>
            </div>
            <div
              className="fixed inset-0 bg-black/30 md:hidden z-40 backdrop-blur-[2px]"
              onClick={() => setMenuOpen(false)}
            />
          </>
        )}
      </header>

      <ConfirmModal
        isOpen={showLogoutModal}
        onClose={() => setShowLogoutModal(false)}
        onConfirm={handleLogout}
        title="Logout"
        message="You will be signed out of the admin panel."
        confirmText="Logout"
        confirmButtonClass="bg-red-600 hover:bg-red-700 text-white"
      />
    </>
  );
}