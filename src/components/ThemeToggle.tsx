
import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/contexts/ThemeContext";
import { useTranslation } from "@/contexts/TranslationContext";
import { Switch } from "@/components/ui/switch";
import { useState, useEffect } from "react";

interface ThemeToggleProps {
  variant?: "default" | "outline" | "ghost";
  size?: "default" | "sm" | "lg" | "icon";
  showLabel?: boolean;
}

const ThemeToggle = ({ 
  variant = "ghost", 
  size = "icon",
  showLabel = false
}: ThemeToggleProps) => {
  const { theme, toggleTheme } = useTheme();
  const { t } = useTranslation();
  const [mounted, setMounted] = useState(false);
  
  // Only render the toggle client-side to avoid hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);
  
  if (!mounted) return null;
  
  const isDark = theme === "dark";
  
  if (showLabel) {
    return (
      <div className="flex items-center gap-2">
        <Sun className="h-4 w-4" />
        <Switch 
          checked={isDark}
          onCheckedChange={toggleTheme}
          aria-label={isDark ? t('switch_to_light') : t('switch_to_dark')}
        />
        <Moon className="h-4 w-4" />
      </div>
    );
  }
  
  return (
    <Button 
      variant={variant} 
      size={size} 
      onClick={toggleTheme}
      title={isDark ? t('switch_to_light') : t('switch_to_dark')}
      className="text-foreground hover:text-foreground"
    >
      {isDark ? (
        <Moon className="h-5 w-5" />
      ) : (
        <Sun className="h-5 w-5" />
      )}
      <span className="sr-only">{t('theme')}</span>
    </Button>
  );
};

export default ThemeToggle;
