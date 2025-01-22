'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTheme } from 'next-themes';
import LogoSharp from '../../../public/medias/LogoSharp';
import LogoGoop from '../../../public/medias/LogoGoop';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();
  const { resolvedTheme } = useTheme();

  const menuVariants = {
    closed: {
      opacity: 0,
      height: 0,
      transition: {
        duration: 0.3,
        staggerChildren: 0.1,
        staggerDirection: -1,
        when: 'afterChildren',
      },
    },
    open: {
      opacity: 1,
      height: '100vh',
      transition: {
        duration: 0.3,
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    closed: {
      opacity: 0,
      y: -20,
      transition: {
        duration: 0.2,
        ease: 'easeIn',
      },
    },
    open: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.2,
        ease: 'easeOut',
      },
    },
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  const navItems = [
    { label: 'Info', href: '#Info' },
    { label: 'Work', href: '/work' },
    { label: 'Art', href: '/art' },
    { label: 'Resume', href: '/resume' },
    { label: 'Contact', href: '/contact' },
  ];

  const isActive = (path: string) => pathname === path;

  const renderLogo = () => {
    if (!mounted) return <div className="w-10 h-10" />;

    return resolvedTheme === 'dark' ? (
      <LogoSharp className="w-10 h-10 text-foreground hover:text-destructive transition-transform transform hover:rotate-180 duration-500" />
    ) : (
      <LogoGoop className="w-10 h-10 text-foreground hover:text-destructive transition-transform transform hover:rotate-180 duration-500" />
    );
  };

  return (
    <nav className="select-none bg-background-transparent backdrop-blur-sm fixed w-full z-50">
      <div className="mx-auto px-6">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="text-xl font-bold">
              {renderLogo()}
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center">
            {navItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className={`px-3 py-2 rounded-md text-sm font-bold transition-all duration-500 ${
                  isActive(item.href)
                    ? 'text-foreground'
                    : 'text-dim hover:text-destructive hover:outline-2 hover:outline-offset-2 hover:outline-destructive'
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
              className="text-foreground hover:text-destructive focus:outline-none"
            >
              <div className="w-6 h-6 relative flex items-center justify-center">
                <span
                  className={`absolute h-0.5 w-5 bg-current transform transition-all duration-300 ease-in-out ${
                    isOpen ? 'rotate-45 translate-y-0' : '-translate-y-1.5'
                  }`}
                />
                <span
                  className={`absolute h-0.5 w-5 bg-current transform transition-all duration-100 ease-in-out ${
                    isOpen ? 'opacity-0' : 'translate-y-0'
                  }`}
                />
                <span
                  className={`absolute h-0.5 w-5 bg-current transform transition-all duration-300 ease-in-out ${
                    isOpen ? '-rotate-45 translate-y-0' : 'translate-y-1.5'
                  }`}
                />
              </div>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              className="md:hidden"
              initial="closed"
              animate="open"
              exit="closed"
              variants={menuVariants}
            >
              <div className="px-2 pt-2 pb-3 h-screen space-y-1">
                {navItems.map((item) => (
                  <motion.div
                    key={item.label}
                    variants={itemVariants}
                    transition={{ duration: 0.3 }}
                  >
                    <Link
                      href={item.href}
                      className={`text-center block px-3 py-2 rounded-md font-bold transition-colors ${
                        isActive(item.href)
                          ? 'text-background bg-foreground'
                          : 'text-foreground hover:text-background hover:bg-destructive'
                      }`}
                      onClick={() => setIsOpen(false)}
                    >
                      {item.label}
                    </Link>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
};

export default Navbar;
