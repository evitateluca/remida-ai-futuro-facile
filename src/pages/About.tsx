
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { ShieldCheck, TrendingUp, Users, Heart, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const About = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="bg-remida-teal text-white py-20">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Chi Siamo</h1>
            <p className="text-xl">
              ReMida AI nasce dalla volontà di creare un assistente finanziario personale che sia
              trasparente, etico e veramente al servizio degli utenti.
            </p>
          </div>
        </div>
      </section>
      
      {/* Mission Section */}
      <section className="py-20">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="section-title">La Nostra Missione</h2>
              <p className="text-lg mb-6 text-gray-600">
                La nostra missione è fornire a giovani lavoratori e nuove famiglie gli strumenti necessari
                per prendere decisioni finanziarie consapevoli, senza essere influenzati da interessi commerciali.
              </p>
              <p className="text-lg mb-6 text-gray-600">
                Crediamo che la gestione finanziaria debba essere accessibile a tutti, non solo agli esperti o
                a chi ha grandi capitali. Le decisioni quotidiane, come risparmiare per una vacanza o per l'acquisto
                di una casa, dovrebbero essere supportate da consigli chiari e personalizzati.
              </p>
              <p className="text-lg text-gray-600">
                ReMida AI è progettato per essere l'amico esperto che ti guida nelle scelte finanziarie di ogni giorno,
                senza giudicare e sempre con il tuo interesse al primo posto.
              </p>
            </div>
            <div className="rounded-xl overflow-hidden shadow-lg">
              <img 
                src="https://images.unsplash.com/photo-1593508195009-0c7dd3d2ff36?auto=format&fit=crop&q=80&w=1000" 
                alt="Team di ReMida AI" 
                className="w-full h-auto"
              />
            </div>
          </div>
        </div>
      </section>
      
      {/* Values Section */}
      <section className="py-20 bg-gray-50">
        <div className="container-custom">
          <h2 className="section-title text-center mb-12">I Nostri Valori</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="feature-card">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-remida-teal/20 flex items-center justify-center shrink-0">
                  <ShieldCheck className="h-6 w-6 text-remida-teal" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2 text-remida-teal">Trasparenza</h3>
                  <p className="text-gray-600">
                    Non abbiamo agende nascoste. Ti mostriamo chiaramente su cosa si basano i nostri consigli e come
                    funzionano i nostri algoritmi. Nessuna commissione nascosta, nessun interesse commerciale che influenza
                    le nostre raccomandazioni.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="feature-card">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-remida-teal/20 flex items-center justify-center shrink-0">
                  <Users className="h-6 w-6 text-remida-teal" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2 text-remida-teal">Accessibilità</h3>
                  <p className="text-gray-600">
                    Crediamo che gli strumenti finanziari avanzati debbano essere disponibili per tutti, non solo per i ricchi.
                    La nostra interfaccia è progettata per essere facile da usare, con consigli in linguaggio chiaro che tutti possono capire.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="feature-card">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-remida-teal/20 flex items-center justify-center shrink-0">
                  <TrendingUp className="h-6 w-6 text-remida-teal" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2 text-remida-teal">Indipendenza</h3>
                  <p className="text-gray-600">
                    Non vendiamo prodotti finanziari e non riceviamo commissioni. I nostri consigli sono basati solo sui tuoi 
                    obiettivi e sulle tue esigenze, non su ciò che ci farebbe guadagnare di più.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="feature-card">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-remida-teal/20 flex items-center justify-center shrink-0">
                  <Heart className="h-6 w-6 text-remida-teal" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2 text-remida-teal">Empatia</h3>
                  <p className="text-gray-600">
                    Sappiamo che parlare di soldi può essere stressante. Il nostro approccio è sempre rispettoso e incoraggiante, 
                    mai giudicante. Siamo qui per aiutarti a crescere, non per farti sentire in colpa.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Story Section */}
      <section className="py-20">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto">
            <h2 className="section-title">La Nostra Storia</h2>
            
            <p className="text-lg mb-6 text-gray-600">
              ReMida AI è nato dall'esperienza personale dei suoi fondatori, un gruppo di giovani professionisti
              frustrati dalla mancanza di strumenti finanziari veramente imparziali e facili da usare.
            </p>
            
            <p className="text-lg mb-6 text-gray-600">
              Dopo anni di lavoro nel settore finanziario e tecnologico, abbiamo deciso di unire le nostre competenze
              per creare uno strumento che avremmo voluto avere quando abbiamo iniziato il nostro percorso lavorativo.
            </p>
            
            <p className="text-lg mb-6 text-gray-600">
              Il nome "ReMida" si ispira al re Mida della mitologia greca, noto per trasformare in oro tutto ciò che toccava.
              Ma la nostra visione è diversa: non si tratta di accumulare ricchezze a tutti i costi, ma di trasformare la tua 
              relazione con il denaro per raggiungere una vita equilibrata e appagante.
            </p>
            
            <p className="text-lg mb-6 text-gray-600">
              Oggi, ReMida AI è utilizzato da migliaia di giovani lavoratori e famiglie in tutta Italia, aiutandoli a navigare
              nel complesso mondo della finanza personale con sicurezza e ottimismo.
            </p>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 bg-remida-orange text-white">
        <div className="container-custom text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Pronto a Iniziare il Tuo Percorso Finanziario?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Scopri come ReMida AI può aiutarti a raggiungere i tuoi obiettivi finanziari, grande o piccoli che siano.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button className="bg-white text-remida-orange hover:bg-white/90 text-lg" asChild>
              <Link to="/features">
                Esplora le Funzionalità <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button variant="outline" className="border-white text-white hover:bg-white/20 text-lg" asChild>
              <Link to="/contact">
                Contattaci
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default About;
