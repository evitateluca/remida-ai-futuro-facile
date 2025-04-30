
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, Award, LogOut, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
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
    <header className="bg-white shadow-sm">
      <div className="container-custom py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <span className="text-2xl font-bold text-remida-teal">ReMida</span>
            <span className="text-remida-orange font-bold ml-1">AI</span>
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-gray-700 hover:text-remida-teal transition-colors">
              Home
            </Link>
            <Link to="/about" className="text-gray-700 hover:text-remida-teal transition-colors">
              Chi Siamo
            </Link>
            <Link to="/features" className="text-gray-700 hover:text-remida-teal transition-colors">
              Funzionalità
            </Link>
            <Link to="/pricing" className="text-gray-700 hover:text-remida-teal transition-colors flex items-center">
              <span>Prezzi</span>
              <Award className="ml-1 h-4 w-4 text-remida-orange" />
            </Link>
            <Link to="/faq" className="text-gray-700 hover:text-remida-teal transition-colors">
              FAQ
            </Link>
            <Link to="/contact" className="text-gray-700 hover:text-remida-teal transition-colors">
              Contatti
            </Link>
          </nav>
          
          {/* Call to action */}
          <div className="hidden md:flex items-center gap-4">
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
            className="md:hidden text-gray-500 hover:text-gray-700" 
            onClick={toggleMobileMenu}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
        
        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden pt-4 pb-2">
            <nav className="flex flex-col space-y-3">
              <Link 
                to="/" 
                className="text-gray-700 hover:text-remida-teal transition-colors py-2"
                onClick={toggleMobileMenu}
              >
                Home
              </Link>
              <Link 
                to="/about" 
                className="text-gray-700 hover:text-remida-teal transition-colors py-2"
                onClick={toggleMobileMenu}
              >
                Chi Siamo
              </Link>
              <Link 
                to="/features" 
                className="text-gray-700 hover:text-remida-teal transition-colors py-2"
                onClick={toggleMobileMenu}
              >
                Funzionalità
              </Link>
              <Link 
                to="/pricing" 
                className="text-gray-700 hover:text-remida-teal transition-colors py-2 flex items-center"
                onClick={toggleMobileMenu}
              >
                <span>Prezzi</span>
                <Award className="ml-1 h-4 w-4 text-remida-orange" />
              </Link>
              <Link 
                to="/faq" 
                className="text-gray-700 hover:text-remida-teal transition-colors py-2"
                onClick={toggleMobileMenu}
              >
                FAQ
              </Link>
              <Link 
                to="/contact" 
                className="text-gray-700 hover:text-remida-teal transition-colors py-2"
                onClick={toggleMobileMenu}
              >
                Contatti
              </Link>
              
              {user ? (
                <Button 
                  variant="destructive" 
                  onClick={() => {
                    signOut();
                    toggleMobileMenu();
                  }}
                  className="w-full mt-2"
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  Logout
                </Button>
              ) : (
                <Button className="bg-remida-orange hover:bg-remida-orange/90 w-full mt-2" asChild>
                  <Link to="/auth" onClick={toggleMobileMenu}>
                    Accedi
                  </Link>
                </Button>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
