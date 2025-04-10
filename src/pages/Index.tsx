import { Button } from '@/components/ui/button';
import { ArrowRight, ArrowDownCircle, ShieldCheck, TrendingUp, Award } from 'lucide-react';
import { Link } from 'react-router-dom';
import Layout from '@/components/Layout';

const Index = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-remida-gray to-white py-20">
        <div className="container-custom">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="lg:w-1/2 space-y-6">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-remida-teal leading-tight">
                Il Tuo Assistente Finanziario, Sempre Con Te
              </h1>
              <p className="text-xl text-gray-600">
                ReMida AI ti aiuta a gestire le spese quotidiane e pianificare il tuo futuro, senza nessuna agenda nascosta.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button className="bg-remida-orange hover:bg-remida-orange/90 text-lg px-8 py-6" asChild>
                  <Link to="/dashboard">
                    Inizia Ora <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button variant="outline" className="border-remida-teal text-remida-teal hover:bg-remida-teal/10 text-lg px-8 py-6" asChild>
                  <Link to="/about">
                    Scopri di Più
                  </Link>
                </Button>
              </div>
            </div>
            <div className="lg:w-1/2">
              <div className="relative">
                <div className="bg-white rounded-xl shadow-xl p-6 md:p-8 relative z-10">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg font-semibold flex items-center">
                      Il tuo Bilancio 
                      <Link to="/dashboard" className="ml-2">
                        <Award className="h-5 w-5 text-remida-orange hover:text-remida-teal transition-colors" />
                      </Link>
                    </h3>
                    <span className="text-sm text-gray-500">Luglio 2023</span>
                  </div>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span>Entrate</span>
                      <span className="font-semibold">€2,400.00</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Spese</span>
                      <span className="font-semibold">€1,850.00</span>
                    </div>
                    <div className="border-t pt-2 flex justify-between items-center">
                      <span className="font-semibold">Risparmiati</span>
                      <span className="font-bold text-green-600">€550.00</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div className="bg-remida-teal h-2.5 rounded-full" style={{ width: '23%' }}></div>
                    </div>
                    <p className="text-sm text-gray-600">Hai risparmiato il 23% delle tue entrate questo mese. Ottimo lavoro!</p>
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
          <h2 className="section-title text-center">Come ReMida AI Ti Aiuta</h2>
          <p className="text-xl text-center text-gray-600 mb-12 max-w-3xl mx-auto">
            Il nostro assistente finanziario ti offre strumenti pratici e consigli personalizzati 
            per ogni aspetto della tua vita finanziaria.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
            <div className="feature-card">
              <div className="w-12 h-12 rounded-full bg-remida-teal/20 flex items-center justify-center mb-4">
                <ShieldCheck className="h-6 w-6 text-remida-teal" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-remida-teal">Consigli Personalizzati</h3>
              <p className="text-gray-600">
                Chatbot AI che risponde alle tue domande finanziarie quotidiane in modo semplice e chiaro.
              </p>
            </div>
            
            <div className="feature-card">
              <div className="w-12 h-12 rounded-full bg-remida-teal/20 flex items-center justify-center mb-4">
                <TrendingUp className="h-6 w-6 text-remida-teal" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-remida-teal">Pianificazione Facile</h3>
              <p className="text-gray-600">
                Strumenti per gestire il tuo budget e simulare i tuoi risparmi futuri in pochi clic.
              </p>
            </div>
            
            <div className="feature-card">
              <div className="w-12 h-12 rounded-full bg-remida-orange/20 flex items-center justify-center mb-4">
                <svg 
                  className="h-6 w-6 text-remida-orange" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24" 
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-remida-teal">Opzioni Diversificate</h3>
              <p className="text-gray-600">
                Esplora opportunità tradizionali e innovative, incluse opzioni per risparmiare in criptovalute.
              </p>
            </div>
          </div>
          
          <div className="mt-12 text-center">
            <Button className="bg-remida-orange hover:bg-remida-orange/90 text-lg px-8 py-6" asChild>
              <Link to="/features">
                Esplora Tutte le Funzionalità <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
          
          <div className="mt-16 p-6 bg-gray-50 rounded-xl">
            <h3 className="text-2xl font-semibold text-center text-remida-teal mb-4 flex items-center justify-center">
              <Award className="mr-2 h-6 w-6 text-remida-orange" />
              Gamification e Premi
            </h3>
            <p className="text-center text-gray-600 mb-6">
              Accedi alla tua dashboard personale per guadagnare punti, sbloccare badge e raggiungere i tuoi obiettivi finanziari.
            </p>
            <div className="flex justify-center">
              <Button className="bg-remida-teal hover:bg-remida-teal/90" asChild>
                <Link to="/dashboard">
                  Vai alla Dashboard <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
      
      {/* Testimonials */}
      <section className="py-20 bg-gray-50">
        <div className="container-custom">
          <h2 className="section-title text-center">Chi Usa ReMida AI</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-full bg-remida-orange/20 flex items-center justify-center text-xl font-bold text-remida-orange">
                  M
                </div>
                <div>
                  <p className="font-medium">Marco, 28</p>
                  <p className="text-sm text-gray-500">Sviluppatore Software</p>
                </div>
              </div>
              <p className="text-gray-600">
                "ReMida mi ha aiutato a risparmiare per l'acquisto della mia prima casa. I consigli pratici
                e la visualizzazione dei progressi hanno fatto la differenza."
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-full bg-remida-teal/20 flex items-center justify-center text-xl font-bold text-remida-teal">
                  G
                </div>
                <div>
                  <p className="font-medium">Giulia, 32</p>
                  <p className="text-sm text-gray-500">Insegnante</p>
                </div>
              </div>
              <p className="text-gray-600">
                "Come giovane famiglia, avevamo bisogno di pianificare meglio le nostre finanze. ReMida ci ha 
                permesso di visualizzare dove andavano i nostri soldi e come risparmiare."
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-full bg-remida-orange/20 flex items-center justify-center text-xl font-bold text-remida-orange">
                  A
                </div>
                <div>
                  <p className="font-medium">Andrea, 25</p>
                  <p className="text-sm text-gray-500">Libero Professionista</p>
                </div>
              </div>
              <p className="text-gray-600">
                "Finalmente un'app che non cerca di vendermi prodotti finanziari, ma mi dà consigli
                onesti e trasparenti su come gestire i miei risparmi."
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-20 bg-remida-teal text-white">
        <div className="container-custom text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Pronto a Riprendere il Controllo delle Tue Finanze?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Inizia oggi il tuo percorso verso la serenità finanziaria con ReMida AI,
            il tuo assistente personale sempre al tuo fianco.
          </p>
          <Button className="bg-white text-remida-teal hover:bg-white/90 text-lg px-8 py-6" asChild>
            <Link to="/contact">
              Contattaci <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
