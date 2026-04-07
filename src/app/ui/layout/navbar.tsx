
"use client";
import React, { useState } from "react";
import SearchBar from "./SearchBar";
import Link from "next/link";
import "./navbar.css";
import "./navbar.responsive.css";
import "./navbar.hamburger.css";

interface HeaderProps {
  onSearch?: (searchTerm: string) => void;
}

export default function Header({ onSearch }: HeaderProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { name: "Products", href: "/products" },
    { name: "Log In", href: "/login" },
    { name: "Register", href: "/register" },
    { name: "Trending", href: "/trending" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <header className="navbar-header">
      <div className="navbar-container">
        {/* Top row with logo and mobile menu button */}
        <div className="navbar-toprow">
          {/* Mobile menu button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="navbar-mobile-btn"
            aria-label="Toggle menu"
          >
            <svg
              className="navbar-svg"
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
        <nav className="navbar-nav">
          <Link href="/" className="navbar-link">
            Handcrafted Haven
          </Link>
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="navbar-link-secondary"
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Search Bar - Desktop */}
        <SearchBar
          onSearch={onSearch}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
        />
      </div>
    </header>
  );
}
