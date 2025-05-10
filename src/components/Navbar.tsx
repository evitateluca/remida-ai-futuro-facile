
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, LogOut, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import ThemeToggle from '@/components/ThemeToggle';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user, signOut } = useAuth();

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <header className="bg-card shadow-sm border-b border-border">
      <div className="container-custom py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <span className="text-2xl font-bold text-remida-teal">ReMida</span>
            <span className="text-remida-orange font-bold ml-1">AI</span>
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-foreground hover:text-remida-teal transition-colors">
              Home
            </Link>
            <Link to="/about" className="text-foreground hover:text-remida-teal transition-colors">
              Chi Siamo
            </Link>
            <Link to="/features" className="text-foreground hover:text-remida-teal transition-colors">
              Funzionalità
            </Link>
            <Link to="/faq" className="text-foreground hover:text-remida-teal transition-colors">
              FAQ
            </Link>
            <Link to="/contact" className="text-foreground hover:text-remida-teal transition-colors">
              Contatti
            </Link>
          </nav>
          
          {/* Call to action */}
          <div className="hidden md:flex items-center gap-4">
            <ThemeToggle />
            
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={user.user_metadata?.avatar_url} alt={user.email || ''} />
                      <AvatarFallback>{user.email?.charAt(0).toUpperCase() || 'U'}</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem asChild>
                    <Link to="/profile">
                      <User className="mr-2 h-4 w-4" />
                      <span>Profilo</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => signOut()}>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Logout</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button className="bg-remida-orange hover:bg-remida-orange/90" asChild>
                <Link to="/auth">
                  Accedi
                </Link>
              </Button>
            )}
          </div>
          
          {/* Mobile menu button */}
          <button 
            className="md:hidden text-foreground hover:text-remida-teal z-50" 
            onClick={toggleMobileMenu}
            aria-label="Toggle mobile menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
        
        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden fixed inset-0 z-40 bg-background/95 backdrop-blur-sm pt-20 pb-6 px-6 flex flex-col">
            <nav className="flex flex-col space-y-6">
              <Link 
                to="/" 
                className="text-lg font-medium text-foreground hover:text-remida-teal transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Home
              </Link>
              <Link 
                to="/about" 
                className="text-lg font-medium text-foreground hover:text-remida-teal transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Chi Siamo
              </Link>
              <Link 
                to="/features" 
                className="text-lg font-medium text-foreground hover:text-remida-teal transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Funzionalità
              </Link>
              <Link 
                to="/faq" 
                className="text-lg font-medium text-foreground hover:text-remida-teal transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                FAQ
              </Link>
              <Link 
                to="/contact" 
                className="text-lg font-medium text-foreground hover:text-remida-teal transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Contatti
              </Link>
              
              <div className="flex items-center justify-between mt-8 pt-8 border-t border-border">
                <ThemeToggle />
                
                {user ? (
                  <Button 
                    variant="destructive" 
                    onClick={() => {
                      signOut();
                      setMobileMenuOpen(false);
                    }}
                    className="flex items-center"
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    Logout
                  </Button>
                ) : (
                  <Button 
                    className="bg-remida-orange hover:bg-remida-orange/90 w-full" 
                    asChild
                  >
                    <Link 
                      to="/auth" 
                      onClick={() => setMobileMenuOpen(false)}
                      className="flex justify-center"
                    >
                      Accedi
                    </Link>
                  </Button>
                )}
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
