
import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const { t } = useLanguage();
  
  return (
    <footer className="bg-remida-teal text-white">
      <div className="container-custom py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-xl font-bold mb-4">ReMida AI</h3>
            <p className="mb-4 text-gray-100">
              {t('footer.description')}
            </p>
          </div>
          
          <div>
            <h4 className="font-bold mb-4">{t('footer.links')}</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-100 hover:text-white transition-colors">
                  {t('nav.home')}
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-100 hover:text-white transition-colors">
                  {t('nav.about')}
                </Link>
              </li>
              <li>
                <Link to="/features" className="text-gray-100 hover:text-white transition-colors">
                  {t('nav.features')}
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-bold mb-4">{t('footer.contacts')}</h4>
            <Link to="/contact" className="text-gray-100 hover:text-white transition-colors block mb-2">
              {t('nav.contact')}
            </Link>
            <p className="text-gray-100">info@remida-ai.it</p>
          </div>
        </div>
        
        <div className="border-t border-gray-600 mt-8 pt-6 text-center text-gray-300">
          <p>&copy; {currentYear} ReMida AI. {t('footer.rights')}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
