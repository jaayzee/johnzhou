'use client';

import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Logo from '@/../public/medias/JZLogo'

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const navItems = [
    { label: 'Home', href: '/' },
    { label: 'Work', href: '/work' },
    { label: 'Art', href: '/art' },
    { label: 'Resume', href: '/resume' },
    { label: 'Contact', href: '/contact' }
  ];

  const isActive = (path: string) => pathname === path;

  return (
    <nav className="bg-background-transparent backdrop-blur-sm fixed w-full z-50">
      <div className="mx-auto px-6">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
          <Link href="/" className="text-xl font-bold">
            <Logo className="w-10 h-10 text-foreground hover:text-destructive transition-transform transform hover:rotate-180 duration-500"/>
          </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center">
            {navItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className={`px-3 py-2 rounded-md text-sm font-bold transition-colors ${
                  isActive(item.href)
                    ? 'text-foreground'
                    : 'text-dim hover:text-destructive transition-all duration-500 '
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-foreground hover:text-white focus:outline-none"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 h-screen space-y-1">
              {navItems.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className={`block px-3 py-2 rounded-md text-base font-medium transition-colors ${
                    isActive(item.href)
                      ? 'text-background bg-foreground'
                      : 'text-foreground hover:text-background hover:bg-destructive'
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;