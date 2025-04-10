
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container-custom py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center">
            <span className="text-remida-teal text-2xl font-bold">ReMida AI</span>
          </Link>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-gray-700 hover:text-remida-teal transition-colors">
              Home
            </Link>
            <Link to="/about" className="text-gray-700 hover:text-remida-teal transition-colors">
              Chi Siamo
            </Link>
            <Link to="/features" className="text-gray-700 hover:text-remida-teal transition-colors">
              Funzionalità
            </Link>
            <Link to="/contact" className="text-gray-700 hover:text-remida-teal transition-colors">
              Contatti
            </Link>
            <Button className="bg-remida-orange hover:bg-remida-orange/90">
              Inizia Ora
            </Button>
          </div>
          
          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button onClick={toggleMenu} className="text-gray-700">
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
        
        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden pt-4 pb-3 border-t mt-4 animate-fade-in">
            <div className="flex flex-col space-y-3">
              <Link 
                to="/" 
                className="text-gray-700 py-2 px-3 rounded-md hover:bg-gray-100"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link 
                to="/about" 
                className="text-gray-700 py-2 px-3 rounded-md hover:bg-gray-100"
                onClick={() => setIsMenuOpen(false)}
              >
                Chi Siamo
              </Link>
              <Link 
                to="/features" 
                className="text-gray-700 py-2 px-3 rounded-md hover:bg-gray-100"
                onClick={() => setIsMenuOpen(false)}
              >
                Funzionalità
              </Link>
              <Link 
                to="/contact" 
                className="text-gray-700 py-2 px-3 rounded-md hover:bg-gray-100"
                onClick={() => setIsMenuOpen(false)}
              >
                Contatti
              </Link>
              <Button className="bg-remida-orange hover:bg-remida-orange/90 w-full justify-center">
                Inizia Ora
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
