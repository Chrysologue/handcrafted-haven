"use client";
import React, { useState } from "react";
import SearchBar from "./SearchBar";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface HeaderProps {
  onSearch?: (searchTerm: string) => void;
}

export default function Header({ onSearch }: HeaderProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  const navLinks = [
    { name: "Products", href: "/products" },
    { name: "Favorites", href: "/favorites" },
    { name: "Log In", href: "/login" },
    { name: "Register", href: "/register" },
    { name: "Trending", href: "/trending" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <header className="width-full top-0 z-50 bg-[var(--background)] border-b border-gray-200 dark:border-gray-800">
      <div className="width-full container mx-auto px-4">
        {/* Top row with logo and mobile menu button */}
        <div className="flex items-center justify-between h-16">
          {/* Mobile menu button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-md text-[var(--foreground)] hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none transition-colors"
            aria-label="Toggle menu"
          >
            <svg
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Navigation Links - Desktop */}

        <nav className="hidden md:flex space-x-6 py-3 border-t border-gray-200 dark:border-gray-800">
          <Link href="/" className="font-bold text-[var(--foreground)]">
            Handcrafted Haven
          </Link>
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-[var(--foreground)] hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200"
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-gray-200 dark:border-gray-800">
            <nav className="px-2 pt-2 pb-3 space-y-1">
              <Link
                href="/"
                className="block px-3 py-2 font-bold text-[var(--foreground)] hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Handcrafted Haven
              </Link>
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="block px-3 py-2 text-[var(--foreground)] hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
            </nav>
            {/* Mobile Search Bar */}
            {pathname === '/products' && (
              <div className="px-2 pb-3">
                <SearchBar />
              </div>
            )}
          </div>
        )}

        {/* Search Bar - Desktop */}
        {pathname === '/products' && <SearchBar/>}
      </div>
    </header>
  );
}
