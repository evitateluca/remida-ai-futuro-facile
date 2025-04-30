
import { Button } from '@/components/ui/button';
import { ArrowRight, ArrowDownCircle, ShieldCheck, TrendingUp, Award, Bitcoin, Target, DollarSign } from 'lucide-react';
import { Link } from 'react-router-dom';
import Layout from '@/components/Layout';
import { useLanguage } from '@/contexts/LanguageContext';

const Index = () => {
  const { t } = useLanguage();

  return (
    <Layout>
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-remida-gray to-white py-20">
        <div className="container-custom">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="lg:w-1/2 space-y-6">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-remida-teal leading-tight">
                {t('hero.title')}
              </h1>
              <p className="text-xl text-gray-600">
                {t('hero.subtitle')}
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button className="bg-remida-orange hover:bg-remida-orange/90 text-lg px-8 py-6" asChild>
                  <Link to="/dashboard">
                    {t('hero.cta')} <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button variant="outline" className="border-remida-teal text-remida-teal hover:bg-remida-teal/10 text-lg px-8 py-6" asChild>
                  <Link to="/about">
                    {t('hero.learnMore')}
                  </Link>
                </Button>
              </div>
            </div>
            <div className="lg:w-1/2">
              <div className="relative">
                <div className="bg-white rounded-xl shadow-xl p-6 md:p-8 relative z-10">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg font-semibold flex items-center">
                      Crypto Portfolio 
                      <Link to="/dashboard" className="ml-2">
                        <Award className="h-5 w-5 text-remida-orange hover:text-remida-teal transition-colors" />
                      </Link>
                    </h3>
                    <span className="text-sm text-gray-500">Luglio 2024</span>
                  </div>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="flex items-center"><Bitcoin className="h-4 w-4 mr-2 text-orange-500" /> Bitcoin</span>
                      <span className="font-semibold">€12,400.00</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="flex items-center"><DollarSign className="h-4 w-4 mr-2 text-green-500" /> USDT</span>
                      <span className="font-semibold">€5,000.00</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Altri Asset</span>
                      <span className="font-semibold">€2,600.00</span>
                    </div>
                    <div className="border-t pt-2 flex justify-between items-center">
                      <span className="font-semibold">Totale Portfolio</span>
                      <span className="font-bold text-remida-teal">€20,000.00</span>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 mb-1">Obiettivo Fondo Emergenza: €6,000</p>
                      <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div className="bg-remida-teal h-2.5 rounded-full" style={{ width: '83%' }}></div>
                      </div>
                      <p className="text-sm text-gray-600 mt-1">Hai raggiunto l'83% del tuo obiettivo con USDT. Continua così!</p>
                    </div>
                  </div>
                </div>
                <div className="absolute -z-10 inset-0 bg-remida-teal/20 rounded-xl translate-x-4 translate-y-4"></div>
              </div>
            </div>
          </div>
          
          <div className="flex justify-center mt-16">
            <ArrowDownCircle className="h-10 w-10 text-remida-teal animate-bounce" />
          </div>
        </div>
      </section>
      
      {/* Features Preview */}
      <section className="py-20">
        <div className="container-custom">
          <h2 className="section-title text-center">{t('features.title')}</h2>
          <p className="text-xl text-center text-gray-600 mb-12 max-w-3xl mx-auto">
            {t('features.subtitle')}
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
            <div className="feature-card">
              <div className="w-12 h-12 rounded-full bg-remida-teal/20 flex items-center justify-center mb-4">
                <Bitcoin className="h-6 w-6 text-remida-teal" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-remida-teal">{t('features.portfolio.title')}</h3>
              <p className="text-gray-600">
                {t('features.portfolio.description')}
              </p>
            </div>
            
            <div className="feature-card">
              <div className="w-12 h-12 rounded-full bg-remida-teal/20 flex items-center justify-center mb-4">
                <Target className="h-6 w-6 text-remida-teal" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-remida-teal">{t('features.planning.title')}</h3>
              <p className="text-gray-600">
                {t('features.planning.description')}
              </p>
            </div>
            
            <div className="feature-card">
              <div className="w-12 h-12 rounded-full bg-remida-orange/20 flex items-center justify-center mb-4">
                <DollarSign className="h-6 w-6 text-remida-orange" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-remida-teal">{t('features.education.title')}</h3>
              <p className="text-gray-600">
                {t('features.education.description')}
              </p>
            </div>
          </div>
          
          <div className="mt-12 text-center">
            <Button className="bg-remida-orange hover:bg-remida-orange/90 text-lg px-8 py-6" asChild>
              <Link to="/features">
                {t('features.explore')} <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
          
          <div className="mt-16 p-6 bg-gray-50 rounded-xl">
            <h3 className="text-2xl font-semibold text-center text-remida-teal mb-4 flex items-center justify-center">
              <Award className="mr-2 h-6 w-6 text-remida-orange" />
              {t('features.gamification')}
            </h3>
            <p className="text-center text-gray-600 mb-6">
              {t('features.gamification.description')}
            </p>
            <div className="flex justify-center">
              <Button className="bg-remida-teal hover:bg-remida-teal/90" asChild>
                <Link to="/dashboard">
                  {t('hero.cta')} <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
      
      {/* Testimonials */}
      <section className="py-20 bg-gray-50">
        <div className="container-custom">
          <h2 className="section-title text-center">{t('testimonials.title')}</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-full bg-remida-orange/20 flex items-center justify-center text-xl font-bold text-remida-orange">
                  M
                </div>
                <div>
                  <p className="font-medium">{t('testimonial1.name')}</p>
                  <p className="text-sm text-gray-500">{t('testimonial1.job')}</p>
                </div>
              </div>
              <p className="text-gray-600">
                {t('testimonial1.text')}
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-full bg-remida-teal/20 flex items-center justify-center text-xl font-bold text-remida-teal">
                  G
                </div>
                <div>
                  <p className="font-medium">{t('testimonial2.name')}</p>
                  <p className="text-sm text-gray-500">{t('testimonial2.job')}</p>
                </div>
              </div>
              <p className="text-gray-600">
                {t('testimonial2.text')}
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-full bg-remida-orange/20 flex items-center justify-center text-xl font-bold text-remida-orange">
                  A
                </div>
                <div>
                  <p className="font-medium">{t('testimonial3.name')}</p>
                  <p className="text-sm text-gray-500">{t('testimonial3.job')}</p>
                </div>
              </div>
              <p className="text-gray-600">
                {t('testimonial3.text')}
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Partners Section */}
      <section className="py-20 bg-white">
        <div className="container-custom">
          <h2 className="section-title text-center">{t('partners.title')}</h2>
          <p className="text-xl text-center text-gray-600 mb-12 max-w-3xl mx-auto">
            {t('partners.subtitle')}
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            <div className="feature-card">
              <div className="w-12 h-12 rounded-full bg-remida-teal/20 flex items-center justify-center mb-4">
                <Award className="h-6 w-6 text-remida-teal" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-remida-teal">{t('partners.retention')}</h3>
              <p className="text-gray-600">
                {t('partners.retention.desc')}
              </p>
            </div>
            
            <div className="feature-card">
              <div className="w-12 h-12 rounded-full bg-remida-teal/20 flex items-center justify-center mb-4">
                <ShieldCheck className="h-6 w-6 text-remida-teal" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-remida-teal">{t('partners.compliance')}</h3>
              <p className="text-gray-600">
                {t('partners.compliance.desc')}
              </p>
            </div>
            
            <div className="feature-card">
              <div className="w-12 h-12 rounded-full bg-remida-orange/20 flex items-center justify-center mb-4">
                <TrendingUp className="h-6 w-6 text-remida-orange" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-remida-teal">{t('partners.growth')}</h3>
              <p className="text-gray-600">
                {t('partners.growth.desc')}
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-20 bg-remida-teal text-white">
        <div className="container-custom text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            {t('cta.title')}
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            {t('cta.subtitle')}
          </p>
          <Button className="bg-white text-remida-teal hover:bg-white/90 text-lg px-8 py-6" asChild>
            <Link to="/contact">
              {t('cta.button')} <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
