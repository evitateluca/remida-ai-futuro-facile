
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';

const LanguageSelector = () => {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="flex items-center space-x-1">
      <Button
        variant="ghost"
        size="sm"
        className={`px-2 py-1 text-sm transition-colors ${
          language === 'it' 
            ? 'text-remida-teal font-medium border-b-2 border-remida-teal' 
            : 'text-gray-500 hover:text-remida-teal'
        }`}
        onClick={() => setLanguage('it')}
      >
        IT
      </Button>
      <span className="text-gray-400">|</span>
      <Button
        variant="ghost"
        size="sm"
        className={`px-2 py-1 text-sm transition-colors ${
          language === 'en' 
            ? 'text-remida-teal font-medium border-b-2 border-remida-teal' 
            : 'text-gray-500 hover:text-remida-teal'
        }`}
        onClick={() => setLanguage('en')}
      >
        EN
      </Button>
    </div>
  );
};

export default LanguageSelector;
