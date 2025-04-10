
import Layout from '@/components/Layout';
import AIChatDemo from '@/components/features/AIChatDemo';
import BudgetSimulator from '@/components/features/BudgetSimulator';
import FuturePlanning from '@/components/features/FuturePlanning';
import CryptoOption from '@/components/features/CryptoOption';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MessageSquare, Calculator, CalendarDays, Bitcoin } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

const Features = () => {
  const isMobile = useIsMobile();
  
  return (
    <Layout>
      {/* Hero Section */}
      <section className="bg-remida-teal text-white py-16">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Le Nostre Funzionalità</h1>
            <p className="text-xl">
              Scopri gli strumenti che ReMida AI mette a tua disposizione per aiutarti a gestire
              le tue finanze in modo semplice e intelligente.
            </p>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-16">
        <div className="container-custom">
          <Tabs defaultValue="chat" className="w-full">
            <TabsList className="grid grid-cols-2 md:grid-cols-4 mb-8">
              <TabsTrigger value="chat" className="flex items-center gap-2">
                <MessageSquare className={`${isMobile ? 'h-4 w-4' : 'h-5 w-5'}`} />
                {!isMobile && <span>Chat AI</span>}
              </TabsTrigger>
              <TabsTrigger value="budget" className="flex items-center gap-2">
                <Calculator className={`${isMobile ? 'h-4 w-4' : 'h-5 w-5'}`} />
                {!isMobile && <span>Simulatore Budget</span>}
              </TabsTrigger>
              <TabsTrigger value="planning" className="flex items-center gap-2">
                <CalendarDays className={`${isMobile ? 'h-4 w-4' : 'h-5 w-5'}`} />
                {!isMobile && <span>Pianificazione</span>}
              </TabsTrigger>
              <TabsTrigger value="crypto" className="flex items-center gap-2">
                <Bitcoin className={`${isMobile ? 'h-4 w-4' : 'h-5 w-5'}`} />
                {!isMobile && <span>Opzione Crypto</span>}
              </TabsTrigger>
            </TabsList>
            
            <div className="mt-8">
              <TabsContent value="chat">
                <div className="mb-6">
                  <h2 className="section-title">Chat AI Personalizzata</h2>
                  <p className="text-lg text-gray-600 mb-8">
                    Il nostro assistente AI risponde alle tue domande finanziarie in tempo reale, con consigli 
                    personalizzati in base alla tua situazione. Prova a chiedere qualsiasi cosa legata alle tue finanze quotidiane!
                  </p>
                </div>
                <AIChatDemo />
              </TabsContent>
              
              <TabsContent value="budget">
                <div className="mb-6">
                  <h2 className="section-title">Simulatore di Budget</h2>
                  <p className="text-lg text-gray-600 mb-8">
                    Inserisci le tue entrate e spese per visualizzare la tua situazione finanziaria attuale. 
                    Il nostro simulatore ti offre suggerimenti su come ottimizzare il tuo budget.
                  </p>
                </div>
                <BudgetSimulator />
              </TabsContent>
              
              <TabsContent value="planning">
                <div className="mb-6">
                  <h2 className="section-title">Pianificazione Futura</h2>
                  <p className="text-lg text-gray-600 mb-8">
                    Simula come i tuoi risparmi potrebbero crescere nel tempo. Questo strumento ti aiuta
                    a visualizzare l'impatto di piccoli risparmi costanti sul lungo periodo.
                  </p>
                </div>
                <FuturePlanning />
              </TabsContent>
              
              <TabsContent value="crypto">
                <div className="mb-6">
                  <h2 className="section-title">Esplora le Criptovalute</h2>
                  <p className="text-lg text-gray-600 mb-8">
                    Curioso sul mondo crypto? Questo strumento ti permette di confrontare i potenziali risultati
                    di risparmiare in valuta tradizionale vs criptovalute, con tutte le opportunità e i rischi.
                  </p>
                </div>
                <CryptoOption />
              </TabsContent>
            </div>
          </Tabs>
        </div>
      </section>
      
      {/* How It Works */}
      <section className="py-16 bg-gray-50">
        <div className="container-custom">
          <h2 className="section-title text-center">Come Funziona</h2>
          
          <div className="mt-12">
            <div className="relative">
              {/* Timeline line */}
              <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-remida-teal/30"></div>
              
              {/* Steps */}
              <div className="space-y-12 md:space-y-0">
                {/* Step 1 */}
                <div className="relative flex flex-col md:flex-row md:justify-between items-center">
                  <div className="flex-1 md:w-5/12">
                    <div className="p-6 bg-white rounded-lg shadow-sm md:mr-8">
                      <h3 className="text-xl font-semibold mb-2 text-remida-teal">1. Inserisci i Tuoi Dati</h3>
                      <p className="text-gray-600">
                        Fornisci informazioni di base sulla tua situazione finanziaria attuale: reddito, spese principali,
                        e i tuoi obiettivi finanziari a breve e lungo termine.
                      </p>
                    </div>
                  </div>
                  <div className="hidden md:flex h-10 w-10 rounded-full bg-remida-teal text-white font-bold items-center justify-center my-4 md:my-0 z-10">
                    1
                  </div>
                  <div className="flex-1 md:w-5/12"></div>
                </div>
                
                {/* Step 2 */}
                <div className="relative flex flex-col md:flex-row md:justify-between items-center">
                  <div className="flex-1 md:w-5/12 md:order-3">
                    <div className="p-6 bg-white rounded-lg shadow-sm md:ml-8">
                      <h3 className="text-xl font-semibold mb-2 text-remida-teal">2. Ricevi Analisi Personalizzate</h3>
                      <p className="text-gray-600">
                        ReMida AI analizza i tuoi dati e crea un profilo personalizzato, identificando aree di miglioramento
                        e opportunità di risparmio in base alle tue abitudini e obiettivi.
                      </p>
                    </div>
                  </div>
                  <div className="hidden md:flex h-10 w-10 rounded-full bg-remida-teal text-white font-bold items-center justify-center my-4 md:my-0 z-10 md:order-2">
                    2
                  </div>
                  <div className="flex-1 md:w-5/12 md:order-1"></div>
                </div>
                
                {/* Step 3 */}
                <div className="relative flex flex-col md:flex-row md:justify-between items-center">
                  <div className="flex-1 md:w-5/12">
                    <div className="p-6 bg-white rounded-lg shadow-sm md:mr-8">
                      <h3 className="text-xl font-semibold mb-2 text-remida-teal">3. Esplora le Simulazioni</h3>
                      <p className="text-gray-600">
                        Utilizza i nostri strumenti di simulazione per vedere come diverse decisioni finanziarie
                        potrebbero influenzare il tuo futuro economico, dai piccoli acquisti quotidiani ai grandi investimenti.
                      </p>
                    </div>
                  </div>
                  <div className="hidden md:flex h-10 w-10 rounded-full bg-remida-teal text-white font-bold items-center justify-center my-4 md:my-0 z-10">
                    3
                  </div>
                  <div className="flex-1 md:w-5/12"></div>
                </div>
                
                {/* Step 4 */}
                <div className="relative flex flex-col md:flex-row md:justify-between items-center">
                  <div className="flex-1 md:w-5/12 md:order-3">
                    <div className="p-6 bg-white rounded-lg shadow-sm md:ml-8">
                      <h3 className="text-xl font-semibold mb-2 text-remida-teal">4. Interagisci con l'AI</h3>
                      <p className="text-gray-600">
                        Fai domande specifiche al nostro assistente AI per ricevere consigli su misura per le tue 
                        esigenze quotidiane, dalle spese ordinarie alle decisioni finanziarie più importanti.
                      </p>
                    </div>
                  </div>
                  <div className="hidden md:flex h-10 w-10 rounded-full bg-remida-teal text-white font-bold items-center justify-center my-4 md:my-0 z-10 md:order-2">
                    4
                  </div>
                  <div className="flex-1 md:w-5/12 md:order-1"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Features;
