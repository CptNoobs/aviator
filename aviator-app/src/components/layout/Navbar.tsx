"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ChevronDown, Plane, BookOpen, Cloud } from 'lucide-react';
import { useTheme } from "next-themes";
import { cn } from '@/lib/utils';

const navigation = [
  { 
    name: 'Features', 
    href: '#features', 
    dropdown: true,
    items: [
      { name: 'Weather', href: '/features/weather', icon: Cloud },
      { name: 'Study', href: '/features/study', icon: BookOpen },
      { name: 'Flight Deck', href: '/features/flight-deck', icon: Plane },
    ]
  },
  { name: 'Pricing', href: '/pricing' },
  { name: 'Weather', href: '/features/weather' },
  { name: 'Study', href: '/features/study' },
  { name: 'Flight Deck', href: '/features/flight-deck' },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={cn(
      'fixed top-0 w-full z-50 transition-all duration-300',
      isScrolled ? 'backdrop-blur-xl bg-background/80 border-b border-white/10' : ''
    )}>
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-xl font-bold text-gradient">Aviator.ai</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:space-x-4">
            {navigation.map((item) => (
              <div key={item.name} className="relative">
                {item.dropdown ? (
                  <button
                    onClick={() => setActiveDropdown(activeDropdown === item.name ? null : item.name)}
                    className="nav-link flex items-center"
                  >
                    {item.name}
                    <ChevronDown className={cn(
                      "ml-1 h-4 w-4 transition-transform",
                      activeDropdown === item.name ? "rotate-180" : ""
                    )} />
                  </button>
                ) : (
                  <Link 
                    href={item.href} 
                    className={cn(
                      "nav-link",
                      pathname === item.href && "text-white"
                    )}
                  >
                    {item.name}
                  </Link>
                )}

                {/* Dropdown Menu */}
                {item.dropdown && activeDropdown === item.name && (
                  <div className="absolute top-full left-0 mt-2 w-48 rounded-lg glass-card">
                    <div className="py-1">
                      {item.items?.map((subItem) => {
                        const Icon = subItem.icon;
                        return (
                          <Link
                            key={subItem.name}
                            href={subItem.href}
                            className={cn(
                              "flex items-center px-4 py-2 text-sm text-gray-300 hover:text-white hover:bg-white/5",
                              pathname === subItem.href && "text-white bg-white/5"
                            )}
                            onClick={() => setActiveDropdown(null)}
                          >
                            <Icon className="h-4 w-4 mr-2" />
                            {subItem.name}
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="hidden md:flex md:items-center md:space-x-4">
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="nav-link"
            >
              {theme === "dark" ? "Light" : "Dark"}
            </button>
            <Link href="/login" className="nav-link">
              Log in
            </Link>
            <Link href="/signup" className="btn-premium">
              Get Started
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden rounded-lg p-2 text-gray-400 hover:bg-white/5"
          >
            {isMobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden glass"
          >
            <div className="space-y-1 px-4 pb-3 pt-2">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    "block nav-link",
                    pathname === item.href && "text-white"
                  )}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <div className="mt-4 flex flex-col space-y-2">
                <button
                  onClick={() => {
                    setTheme(theme === "dark" ? "light" : "dark");
                    setIsMobileMenuOpen(false);
                  }}
                  className="nav-link text-center"
                >
                  {theme === "dark" ? "Light Mode" : "Dark Mode"}
                </button>
                <Link 
                  href="/login" 
                  className="nav-link text-center"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Log in
                </Link>
                <Link 
                  href="/signup" 
                  className="btn-premium text-center"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Get Started
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
} 