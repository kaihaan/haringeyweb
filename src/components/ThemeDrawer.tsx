import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Theme metadata for display - color is the primary color for each theme
const THEMES = [
  { id: 'light', name: 'Light', variant: 'light', color: '#570DF8' },
  { id: 'dark', name: 'Dark', variant: 'dark', color: '#661AE6' },
  { id: 'zen-garden', name: 'Zen Garden', variant: 'light', color: '#9CAF88' },
  { id: 'zen-garden-dark', name: 'Zen Garden', variant: 'dark', color: '#7A8F6A' },
  { id: 'serene-ocean', name: 'Serene Ocean', variant: 'light', color: '#7EB8B6' },
  { id: 'serene-ocean-dark', name: 'Serene Ocean', variant: 'dark', color: '#5A9896' },
  { id: 'tranquil-dawn', name: 'Tranquil Dawn', variant: 'light', color: '#D4A5A5' },
  { id: 'tranquil-dawn-dark', name: 'Tranquil Dawn', variant: 'dark', color: '#B88585' },
] as const;

type ThemeId = typeof THEMES[number]['id'];

const VALID_THEME_IDS = THEMES.map(t => t.id);

export default function ThemeDrawer() {
  const [isOpen, setIsOpen] = useState(false);
  const [currentTheme, setCurrentTheme] = useState<ThemeId>('zen-garden');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const savedTheme = localStorage.getItem('theme') as ThemeId;
    if (savedTheme && VALID_THEME_IDS.includes(savedTheme)) {
      setCurrentTheme(savedTheme);
      document.documentElement.setAttribute('data-theme', savedTheme);
    }
  }, []);

  const selectTheme = (themeId: ThemeId) => {
    setCurrentTheme(themeId);
    document.documentElement.setAttribute('data-theme', themeId);
    localStorage.setItem('theme', themeId);
    setIsOpen(false);
  };

  const currentThemeData = THEMES.find(t => t.id === currentTheme);

  // Drawer animation variants
  const drawerVariants = {
    hidden: {
      height: 0,
      opacity: 0,
      transition: { duration: 0.2, ease: 'easeInOut' }
    },
    visible: {
      height: 'auto',
      opacity: 1,
      transition: { duration: 0.3, ease: 'easeOut' }
    },
  };

  // Placeholder during SSR to prevent hydration mismatch
  if (!mounted) {
    return (
      <button
        className="p-1.5 rounded-lg bg-base-200 hover:bg-base-300 transition"
        aria-label="Theme selector"
      >
        <div className="w-6 h-6 rounded bg-base-300" />
      </button>
    );
  }

  return (
    <div className="relative">
      {/* Toggle Button - Color Swatch */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-1.5 rounded-lg bg-base-200 hover:bg-base-300 transition"
        aria-label="Toggle theme selector"
        aria-expanded={isOpen}
      >
        <div
          className="w-6 h-6 rounded"
          style={{ backgroundColor: currentThemeData?.color }}
        />
      </button>

      {/* Backdrop to close drawer when clicking outside */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Full-width drawer - expands underneath navbar */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={drawerVariants}
            className="fixed left-0 right-0 top-[73px] z-50 bg-base-200 shadow-lg overflow-hidden border-t border-base-300"
          >
            <div className="container mx-auto px-4 py-4">
              <div className="flex flex-wrap justify-center gap-3">
                {THEMES.map((theme) => (
                  <motion.button
                    key={theme.id}
                    onClick={() => selectTheme(theme.id)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`
                      px-4 py-3 rounded-lg text-center transition-colors duration-200 min-w-[100px]
                      ${theme.variant === 'light' ? 'bg-white/80' : 'bg-black/30'}
                      ${currentTheme === theme.id
                        ? 'ring-2 ring-primary ring-offset-2 ring-offset-base-200'
                        : ''
                      }
                    `}
                  >
                    <div
                      className="w-8 h-8 rounded mx-auto mb-2"
                      style={{ backgroundColor: theme.color }}
                    />
                    <span className={`text-xs font-medium block ${theme.variant === 'light' ? 'text-gray-800' : 'text-gray-100'}`}>{theme.name}</span>
                    <span className={`text-xs capitalize ${theme.variant === 'light' ? 'text-gray-600' : 'text-gray-300'}`}>{theme.variant}</span>
                  </motion.button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
