import { useEffect, useState } from 'react';

export default function ThemeToggle() {
  const [theme, setTheme] = useState<'tranquil' | 'tranquil-dark'>('tranquil');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Get saved theme from localStorage or default to 'tranquil'
    const savedTheme = localStorage.getItem('theme') as 'tranquil' | 'tranquil-dark';
    if (savedTheme) {
      setTheme(savedTheme);
      document.documentElement.setAttribute('data-theme', savedTheme);
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'tranquil' ? 'tranquil-dark' : 'tranquil';
    console.log('Toggling theme from', theme, 'to', newTheme);
    setTheme(newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    console.log('Theme changed. Current data-theme:', document.documentElement.getAttribute('data-theme'));
  };

  // Prevent hydration mismatch by not rendering until mounted
  if (!mounted) {
    return (
      <button
        className="p-2 rounded-lg bg-base-200 hover:bg-base-300 transition"
        aria-label="Toggle theme"
      >
        <svg className="w-5 h-5 text-base-content" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      </button>
    );
  }

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-lg bg-base-200 hover:bg-base-300 transition"
      aria-label={`Switch to ${theme === 'tranquil' ? 'dark' : 'light'} mode`}
      title={`Switch to ${theme === 'tranquil' ? 'dark' : 'light'} mode`}
    >
      {theme === 'tranquil' ? (
        // Moon icon for dark mode
        <svg className="w-5 h-5 text-base-content" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
        </svg>
      ) : (
        // Sun icon for light mode
        <svg className="w-5 h-5 text-base-content" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      )}
    </button>
  );
}
