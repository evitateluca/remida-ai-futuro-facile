
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// Definizione delle lingue disponibili
export type Language = 'it' | 'en';

// Interfaccia per il contesto delle lingue
interface LanguageContextType {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (key: string) => string;
}

// Creazione del contesto
const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Traduzioni
const translations: Record<Language, Record<string, string>> = {
  it: {
    // Header
    'nav.home': 'Home',
    'nav.about': 'Chi Siamo',
    'nav.features': 'Funzionalità',
    'nav.contact': 'Contatti',
    'nav.dashboard': 'Dashboard',
    'nav.login': 'Accedi',
    'nav.profile': 'Profilo',
    'nav.logout': 'Logout',
    
    // Hero Section
    'hero.title': 'Il Tuo Mentore Finanziario Crypto',
    'hero.subtitle': 'Trasforma il tuo approccio alle criptovalute: da speculazione impulsiva a investimenti consapevoli',
    'hero.cta': 'Inizia Ora',
    'hero.learnMore': 'Scopri di Più',
    
    // Features
    'features.title': 'Come ReMida AI Ti Aiuta',
    'features.subtitle': 'Trasformiamo la tua esperienza con le crypto da speculativa a strategica',
    'features.portfolio.title': 'Visione Completa',
    'features.portfolio.description': 'Monitora crypto e asset tradizionali in un unico posto per decisioni più consapevoli',
    'features.planning.title': 'Pianifica con le Crypto',
    'features.planning.description': 'Usa stablecoin come USDT per costruire un risparmio stabile e raggiungere i tuoi obiettivi',
    'features.education.title': 'Educazione Crypto',
    'features.education.description': 'Impara a utilizzare le criptovalute in modo intelligente e strategico',
    'features.explore': 'Esplora Tutte le Funzionalità',
    'features.gamification': 'Gamification e Premi',
    'features.gamification.description': 'Guadagna badge e sblocca achievement migliorando le tue abitudini finanziarie',
    
    // Testimonials
    'testimonials.title': 'Chi Usa ReMida AI',
    'testimonial1.name': 'Marco, 28',
    'testimonial1.job': 'Sviluppatore Software',
    'testimonial1.text': '"ReMida mi ha aiutato a capire come usare USDT per creare un fondo emergenza, invece di fare trading impulsivo. Ora ho obiettivi chiari."',
    'testimonial2.name': 'Giulia, 25',
    'testimonial2.job': 'Content Creator',
    'testimonial2.text': '"Prima compravo crypto solo per FOMO dopo video su TikTok. ReMida mi ha insegnato a pianificare e usare le stablecoin strategicamente."',
    'testimonial3.name': 'Andrea, 32',
    'testimonial3.job': 'Libero Professionista',
    'testimonial3.text': '"Finalmente un\'app che non mi spinge solo a fare trading, ma mi aiuta a usare le crypto per i miei obiettivi di vita reale."',
    
    // CTA
    'cta.title': 'Pronto a Rivoluzionare il Tuo Rapporto con le Crypto?',
    'cta.subtitle': 'Passa da trader impulsivo a investitore consapevole con ReMida AI, il tuo mentore finanziario personale.',
    'cta.button': 'Contattaci',
    
    // Footer
    'footer.description': 'Il tuo mentore finanziario personale, sempre con te. Ti aiutiamo a trasformare le crypto da semplici strumenti speculativi a mattoni per costruire il tuo futuro finanziario.',
    'footer.links': 'Link Utili',
    'footer.contacts': 'Contatti',
    'footer.rights': 'Tutti i diritti riservati.',
    
    // Partners
    'partners.title': 'Per i Partner Crypto',
    'partners.subtitle': 'ReMida AI offre valore aggiunto alle piattaforme crypto',
    'partners.retention': 'Maggiore Fidelizzazione',
    'partners.retention.desc': 'Gli utenti che pianificano con ReMida mantengono più fondi in stablecoin',
    'partners.compliance': 'Miglioramento Compliance',
    'partners.compliance.desc': 'Dimostra un impegno per l\'educazione finanziaria responsabile',
    'partners.growth': 'Crescita Sostenibile',
    'partners.growth.desc': 'Attrai utenti più consapevoli con obiettivi a lungo termine',
  },
  en: {
    // Header
    'nav.home': 'Home',
    'nav.about': 'About Us',
    'nav.features': 'Features',
    'nav.contact': 'Contact',
    'nav.dashboard': 'Dashboard',
    'nav.login': 'Login',
    'nav.profile': 'Profile',
    'nav.logout': 'Logout',
    
    // Hero Section
    'hero.title': 'Your Crypto Financial Mentor',
    'hero.subtitle': 'Transform your approach to cryptocurrencies: from impulsive speculation to conscious investments',
    'hero.cta': 'Get Started',
    'hero.learnMore': 'Learn More',
    
    // Features
    'features.title': 'How ReMida AI Helps You',
    'features.subtitle': 'We transform your crypto experience from speculative to strategic',
    'features.portfolio.title': 'Complete Overview',
    'features.portfolio.description': 'Monitor crypto and traditional assets in one place for more informed decisions',
    'features.planning.title': 'Plan with Crypto',
    'features.planning.description': 'Use stablecoins like USDT to build stable savings and achieve your goals',
    'features.education.title': 'Crypto Education',
    'features.education.description': 'Learn how to use cryptocurrencies intelligently and strategically',
    'features.explore': 'Explore All Features',
    'features.gamification': 'Gamification & Rewards',
    'features.gamification.description': 'Earn badges and unlock achievements by improving your financial habits',
    
    // Testimonials
    'testimonials.title': 'Who Uses ReMida AI',
    'testimonial1.name': 'Mark, 28',
    'testimonial1.job': 'Software Developer',
    'testimonial1.text': '"ReMida helped me understand how to use USDT to create an emergency fund, instead of impulsive trading. Now I have clear goals."',
    'testimonial2.name': 'Julia, 25',
    'testimonial2.job': 'Content Creator',
    'testimonial2.text': '"I used to buy crypto just because of FOMO after TikTok videos. ReMida taught me how to plan and use stablecoins strategically."',
    'testimonial3.name': 'Andrew, 32',
    'testimonial3.job': 'Freelancer',
    'testimonial3.text': '"Finally an app that doesn\'t just push me to trade, but helps me use crypto for my real-life goals."',
    
    // CTA
    'cta.title': 'Ready to Revolutionize Your Relationship with Crypto?',
    'cta.subtitle': 'Go from impulsive trader to conscious investor with ReMida AI, your personal financial mentor.',
    'cta.button': 'Contact Us',
    
    // Footer
    'footer.description': 'Your personal financial mentor, always with you. We help you transform crypto from simple speculative tools into building blocks for your financial future.',
    'footer.links': 'Useful Links',
    'footer.contacts': 'Contacts',
    'footer.rights': 'All rights reserved.',
    
    // Partners
    'partners.title': 'For Crypto Partners',
    'partners.subtitle': 'ReMida AI offers added value to crypto platforms',
    'partners.retention': 'Increased Retention',
    'partners.retention.desc': 'Users who plan with ReMida keep more funds in stablecoins',
    'partners.compliance': 'Compliance Improvement',
    'partners.compliance.desc': 'Demonstrate a commitment to responsible financial education',
    'partners.growth': 'Sustainable Growth',
    'partners.growth.desc': 'Attract more aware users with long-term goals',
  }
};

// Provider
export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>('it');

  // Funzione per ottenere la traduzione
  const t = (key: string) => {
    return translations[language][key] || key;
  };

  // Salva la preferenza della lingua nel localStorage
  useEffect(() => {
    localStorage.setItem('remida-language', language);
  }, [language]);

  // Carica la preferenza della lingua dal localStorage
  useEffect(() => {
    const savedLanguage = localStorage.getItem('remida-language') as Language;
    if (savedLanguage && (savedLanguage === 'it' || savedLanguage === 'en')) {
      setLanguage(savedLanguage);
    }
  }, []);

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

// Hook personalizzato
export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
