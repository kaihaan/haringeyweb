import { useState } from 'react';

interface Locale {
  code: string;
  name: string;
  flag: string;
}

const locales: Locale[] = [
  { code: 'en', name: 'English', flag: '🇬🇧' },
  { code: 'es', name: 'Español', flag: '🇪🇸' },
  { code: 'fr', name: 'Français', flag: '🇫🇷' },
  { code: 'fa', name: 'فارسی', flag: '🇮🇷' },
  { code: 'ar', name: 'العربية', flag: '🇸🇦' },
];

export default function LocaleSwitcher() {
  const [currentLocale, setCurrentLocale] = useState('en');
  const [isOpen, setIsOpen] = useState(false);

  const handleLocaleChange = (localeCode: string) => {
    setCurrentLocale(localeCode);
    setIsOpen(false);
    // In a real implementation, this would change the site language
    console.log(`Switching to locale: ${localeCode}`);
  };

  const selectedLocale = locales.find((l) => l.code === currentLocale) || locales[0];

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 text-gray-700 hover:text-blue-900 transition rounded-md hover:bg-gray-100"
        aria-label="Select language"
      >
        <span className="text-xl">{selectedLocale.flag}</span>
        <span className="text-sm font-medium">{selectedLocale.code.toUpperCase()}</span>
        <svg
          className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-10"
            onClick={() => setIsOpen(false)}
          ></div>
          <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-20">
            {locales.map((locale) => (
              <button
                key={locale.code}
                onClick={() => handleLocaleChange(locale.code)}
                className={`w-full flex items-center gap-3 px-4 py-2 text-left hover:bg-gray-100 transition ${
                  locale.code === currentLocale ? 'bg-blue-50 text-blue-900' : 'text-gray-700'
                }`}
              >
                <span className="text-xl">{locale.flag}</span>
                <span className="text-sm font-medium">{locale.name}</span>
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
