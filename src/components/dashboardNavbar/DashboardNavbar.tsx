
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Bell, User, LogOut, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/contexts/AuthContext';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';

type LanguageOption = 'it' | 'en';

interface DashboardNavbarProps {
  unreadNotifications?: number;
  onLanguageChange?: (lang: LanguageOption) => void;
}

const DashboardNavbar = ({ 
  unreadNotifications = 0, 
  onLanguageChange = () => {} 
}: DashboardNavbarProps) => {
  const { signOut } = useAuth();
  const [currentLanguage, setCurrentLanguage] = useState<LanguageOption>('it');

  const handleLanguageChange = (lang: LanguageOption) => {
    setCurrentLanguage(lang);
    onLanguageChange(lang);
  };

  return (
    <div className="bg-white border-b px-4 py-2 flex justify-end items-center gap-4">
      {/* Notification Bell */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="h-5 w-5" />
            {unreadNotifications > 0 && (
              <Badge 
                className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 bg-red-500" 
                variant="destructive"
              >
                {unreadNotifications}
              </Badge>
            )}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-64">
          <div className="px-4 py-2 font-medium">Notifiche</div>
          <DropdownMenuSeparator />
          {unreadNotifications > 0 ? (
            <div className="px-4 py-4">
              <Link to="/dashboard" className="text-blue-500 hover:underline" onClick={() => {}}>
                Hai {unreadNotifications} notifiche non lette. Visualizza tutto
              </Link>
            </div>
          ) : (
            <div className="px-4 py-4 text-muted-foreground">
              Nessuna nuova notifica
            </div>
          )}
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Language Selector */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" className="flex gap-1 items-center px-2">
            <Globe className="h-5 w-5" />
            <span className="text-xs font-medium">{currentLanguage.toUpperCase()}</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem 
            className={currentLanguage === 'it' ? 'bg-muted' : ''} 
            onClick={() => handleLanguageChange('it')}
          >
            🇮🇹 Italiano
          </DropdownMenuItem>
          <DropdownMenuItem 
            className={currentLanguage === 'en' ? 'bg-muted' : ''} 
            onClick={() => handleLanguageChange('en')}
          >
            🇬🇧 English
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Profile */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon">
            <User className="h-5 w-5" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem asChild>
            <Link to="/profile">Profilo</Link>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => signOut()}>
            <LogOut className="h-4 w-4 mr-2" />
            Logout
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default DashboardNavbar;
