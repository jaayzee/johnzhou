'use client';

import React from 'react';
import { useTheme } from 'next-themes';
import { Sun, Moon } from 'lucide-react';

const ThemeSwitcher = () => {
  const { theme, setTheme, systemTheme } = useTheme();
  const [isMounted, setIsMounted] = React.useState(false);
  const currentTheme = theme === 'system' ? systemTheme : theme;

  // Handle hydration mismatch
  React.useEffect(() => {
    setIsMounted(true);
  }, []);

  const toggleTheme = React.useCallback(() => {
    setTheme(currentTheme === 'dark' ? 'light' : 'dark');
  }, [currentTheme, setTheme]);

  // Prevent hydration mismatch
  if (!isMounted) {
    return null;
  }

  return (
    <button
      onClick={toggleTheme}
      type="button"
      aria-label={`Switch to ${currentTheme === 'dark' ? 'light' : 'dark'} theme`}
      className="fixed right-5 bottom-5 z-50 p-2 rounded-lg border border-foreground-transparent 
                bg-background-transparent backdrop-blur-sm 
                shadow-lg transition-all duration-300 hover:scale-110 hover:ring-2 ring-foreground
                hover:border-foreground-transparent"
    >
      <div className="relative w-6 h-6">
        <Sun
          className="absolute inset-0 h-6 w-6 rotate-0 scale-100 transition-all duration-300
                     dark:-rotate-90 dark:scale-0 fill-current"
        />
        <Moon
          className="absolute inset-0 h-6 w-6 rotate-90 scale-0 transition-all duration-300
                     dark:rotate-0 dark:scale-100 fill-current"
        />
      </div>
    </button>
  );
};

export default ThemeSwitcher;
