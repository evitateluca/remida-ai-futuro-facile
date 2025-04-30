
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';

const LanguageSelector = () => {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="flex items-center space-x-2">
      <Button
        variant="ghost"
        size="sm"
        className={`${language === 'it' ? 'bg-gray-100' : ''}`}
        onClick={() => setLanguage('it')}
      >
        🇮🇹 IT
      </Button>
      <Button
        variant="ghost"
        size="sm"
        className={`${language === 'en' ? 'bg-gray-100' : ''}`}
        onClick={() => setLanguage('en')}
      >
        🇬🇧 EN
      </Button>
    </div>
  );
};

export default LanguageSelector;
