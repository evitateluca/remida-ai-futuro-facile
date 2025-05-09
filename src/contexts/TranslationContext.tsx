
import React, { createContext, useContext, useState, useEffect } from 'react';

// Define our language types
export type Language = 'it' | 'en';

// Define translation record type
type TranslationRecord = Record<string, string>;

// Type for the context
interface TranslationContextType {
  language: Language;
  t: (key: string) => string;
  changeLanguage: (lang: Language) => void;
  translations: {
    [key in Language]: TranslationRecord;
  };
}

// Create the context with default values
const TranslationContext = createContext<TranslationContextType>({
  language: 'it',
  t: (key) => key,
  changeLanguage: () => {},
  translations: {
    it: {},
    en: {}
  }
});

// Custom hook to use translations
export const useTranslation = () => useContext(TranslationContext);

interface TranslationProviderProps {
  children: React.ReactNode;
  initialLanguage?: Language;
}

export const TranslationProvider: React.FC<TranslationProviderProps> = ({ 
  children, 
  initialLanguage = 'it' 
}) => {
  const [language, setLanguage] = useState<Language>(initialLanguage);
  const [translations, setTranslations] = useState<{
    [key in Language]: TranslationRecord;
  }>({
    it: {},
    en: {}
  });

  // Load translations on mount
  useEffect(() => {
    const loadTranslations = async () => {
      try {
        const itTranslations = await import('../translations/it.json');
        const enTranslations = await import('../translations/en.json');
        
        setTranslations({
          it: itTranslations.default,
          en: enTranslations.default
        });
      } catch (error) {
        console.error('Error loading translations:', error);
      }
    };
    
    loadTranslations();
  }, []);

  // Check for stored language preference
  useEffect(() => {
    const storedLanguage = localStorage.getItem('preferred-language');
    if (storedLanguage && (storedLanguage === 'it' || storedLanguage === 'en')) {
      setLanguage(storedLanguage as Language);
    }
  }, []);

  // Function to change language
  const changeLanguage = (lang: Language) => {
    setLanguage(lang);
    localStorage.setItem('preferred-language', lang);
  };

  // Translation function
  const t = (key: string): string => {
    if (!translations[language]) return key;
    return translations[language][key] || key;
  };

  return (
    <TranslationContext.Provider value={{ language, t, changeLanguage, translations }}>
      {children}
    </TranslationContext.Provider>
  );
};
