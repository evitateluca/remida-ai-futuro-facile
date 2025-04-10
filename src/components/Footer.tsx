
import { Link } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-remida-teal text-white">
      <div className="container-custom py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-xl font-bold mb-4">ReMida AI</h3>
            <p className="mb-4 text-gray-100">
              Il tuo assistente finanziario personale, sempre con te. Ti aiutiamo a gestire le tue spese quotidiane e a pianificare il tuo futuro.
            </p>
          </div>
          
          <div>
            <h4 className="font-bold mb-4">Link Utili</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-100 hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-100 hover:text-white transition-colors">
                  Chi Siamo
                </Link>
              </li>
              <li>
                <Link to="/features" className="text-gray-100 hover:text-white transition-colors">
                  Funzionalità
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-bold mb-4">Contatti</h4>
            <Link to="/contact" className="text-gray-100 hover:text-white transition-colors block mb-2">
              Contattaci
            </Link>
            <p className="text-gray-100">info@remida-ai.it</p>
          </div>
        </div>
        
        <div className="border-t border-gray-600 mt-8 pt-6 text-center text-gray-300">
          <p>&copy; {currentYear} ReMida AI. Tutti i diritti riservati.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
