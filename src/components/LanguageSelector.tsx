
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';

const LanguageSelector = () => {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="flex items-center">
      <div className="flex items-center bg-background/60 backdrop-blur-sm rounded-md border border-border shadow-sm">
        <Button
          variant="ghost"
          size="sm"
          className={`px-3 py-1.5 text-sm rounded-l-md transition-colors ${
            language === 'it' 
              ? 'bg-primary/10 text-primary font-medium' 
              : 'text-muted-foreground hover:text-foreground'
          }`}
          onClick={() => setLanguage('it')}
        >
          IT
        </Button>
        <div className="h-5 w-px bg-border mx-0.5"></div>
        <Button
          variant="ghost"
          size="sm"
          className={`px-3 py-1.5 text-sm rounded-r-md transition-colors ${
            language === 'en' 
              ? 'bg-primary/10 text-primary font-medium' 
              : 'text-muted-foreground hover:text-foreground'
          }`}
          onClick={() => setLanguage('en')}
        >
          EN
        </Button>
      </div>
    </div>
  );
};

export default LanguageSelector;
