
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Bell, User, LogOut, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/contexts/AuthContext';
import { useTranslation, Language } from '@/contexts/TranslationContext';
import ThemeToggle from '@/components/ThemeToggle';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import NotificationsTab from '@/components/dashboard/NotificationsTab';

interface DashboardNavbarProps {
  unreadNotifications?: number;
}

const DashboardNavbar = ({ 
  unreadNotifications = 0
}: DashboardNavbarProps) => {
  const { signOut } = useAuth();
  const { language, changeLanguage, t } = useTranslation();

  const handleLanguageChange = (lang: Language) => {
    changeLanguage(lang);
  };

  return (
    <div className="bg-card border-b border-border px-4 py-2 flex justify-end items-center gap-4">
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
          <div className="px-4 py-2 font-medium">{t('notifications')}</div>
          <DropdownMenuSeparator />
          {unreadNotifications > 0 ? (
            <div className="px-4 py-4">
              <Link to="/dashboard" className="text-blue-500 hover:underline" onClick={() => {}}>
                {t('notifications_unread').replace('{count}', unreadNotifications.toString())}
              </Link>
            </div>
          ) : (
            <div className="px-4 py-4 text-muted-foreground">
              {t('no_notifications')}
            </div>
          )}
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Theme Toggle */}
      <ThemeToggle />

      {/* Language Selector */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" className="flex gap-1 items-center px-2">
            <Globe className="h-5 w-5" />
            <span className="text-xs font-medium">{language.toUpperCase()}</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem 
            className={language === 'it' ? 'bg-muted' : ''} 
            onClick={() => handleLanguageChange('it')}
          >
            🇮🇹 Italiano
          </DropdownMenuItem>
          <DropdownMenuItem 
            className={language === 'en' ? 'bg-muted' : ''} 
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
            <Link to="/profile">{t('profile')}</Link>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => signOut()}>
            <LogOut className="h-4 w-4 mr-2" />
            {t('logout')}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default DashboardNavbar;
