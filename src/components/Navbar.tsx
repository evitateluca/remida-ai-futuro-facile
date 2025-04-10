
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, Award } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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
            <Link to="/dashboard" className="text-gray-700 hover:text-remida-teal transition-colors flex items-center">
              <span>Dashboard</span>
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
          <div className="hidden md:block">
            <Button className="bg-remida-orange hover:bg-remida-orange/90" asChild>
              <Link to="/dashboard">
                Accedi
              </Link>
            </Button>
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
                to="/dashboard" 
                className="text-gray-700 hover:text-remida-teal transition-colors py-2 flex items-center"
                onClick={toggleMobileMenu}
              >
                <span>Dashboard</span>
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
              <Button className="bg-remida-orange hover:bg-remida-orange/90 w-full mt-2" asChild>
                <Link to="/dashboard" onClick={toggleMobileMenu}>
                  Accedi
                </Link>
              </Button>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
