
import Layout from '@/components/Layout';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { HelpCircle, Search, MessageSquare, Mail, Phone } from 'lucide-react';
import { useState } from 'react';

const FAQ = () => {
  const [searchQuery, setSearchQuery] = useState('');

  // Categorie di FAQ
  const faqCategories = [
    {
      id: 'general',
      label: 'Generali',
      faqs: [
        {
          question: "Cos'è ReMida AI?",
          answer: "ReMida AI è un assistente finanziario digitale che utilizza l'intelligenza artificiale per aiutarti a gestire le spese quotidiane, pianificare il tuo futuro finanziario e prendere decisioni economiche più consapevoli, il tutto senza vendere prodotti o avere agende nascoste."
        },
        {
          question: "ReMida AI è davvero imparziale?",
          answer: "Sì, a differenza di molti servizi finanziari, ReMida AI non vende prodotti finanziari né riceve commissioni. Il nostro obiettivo è fornirti consigli trasparenti e imparziali, basati sulle tue esigenze specifiche, non sui nostri interessi commerciali."
        },
        {
          question: "Chi può utilizzare ReMida AI?",
          answer: "ReMida AI è progettato per chiunque voglia migliorare la propria gestione finanziaria, ma è particolarmente utile per giovani lavoratori e nuove famiglie che stanno iniziando a costruire la propria stabilità economica e hanno bisogno di orientamento."
        },
        {
          question: "Come fa ReMida AI a personalizzare i consigli?",
          answer: "ReMida AI analizza le tue informazioni finanziarie, abitudini di spesa e obiettivi personali per creare consigli su misura. Più interagisci con l'assistente, più accurati e personalizzati saranno i suoi suggerimenti."
        }
      ]
    },
    {
      id: 'privacy',
      label: 'Privacy e Sicurezza',
      faqs: [
        {
          question: "Come viene protetta la mia privacy?",
          answer: "La tua privacy è la nostra priorità. Utilizziamo sistemi di crittografia avanzati per proteggere i tuoi dati e non condividiamo mai le tue informazioni personali con terze parti senza il tuo esplicito consenso."
        },
        {
          question: "I miei dati finanziari sono al sicuro?",
          answer: "Assolutamente. ReMida AI utilizza standard di sicurezza bancaria per proteggere tutte le tue informazioni finanziarie. I dati sono crittografati sia in transito che a riposo, e implementiamo regolarmente audit di sicurezza."
        },
        {
          question: "ReMida AI ha accesso ai miei conti bancari?",
          answer: "Solo se lo autorizzi esplicitamente. ReMida AI può analizzare le tue transazioni per fornirti consigli più precisi, ma questa funzionalità è completamente opzionale e puoi revocare l'accesso in qualsiasi momento."
        }
      ]
    },
    {
      id: 'features',
      label: 'Funzionalità',
      faqs: [
        {
          question: "Quali strumenti offre ReMida AI?",
          answer: "ReMida AI offre un assistente di chat AI per domande specifiche, un simulatore di budget per visualizzare e pianificare le tue finanze, strumenti di pianificazione futura per obiettivi a lungo termine, e contenuti educativi su vari aspetti della finanza personale."
        },
        {
          question: "Posso utilizzare ReMida AI per pianificare investimenti?",
          answer: "Sì, ReMida AI può aiutarti a comprendere diverse opzioni di investimento e pianificare strategie adatte al tuo profilo di rischio e ai tuoi obiettivi. Offriamo informazioni educative e simulazioni, ma non vendiamo prodotti di investimento specifici."
        },
        {
          question: "ReMida AI mi aiuta a risparmiare?",
          answer: "Assolutamente. ReMida AI analizza le tue abitudini di spesa per identificare opportunità di risparmio, ti aiuta a impostare obiettivi realistici e ti fornisce suggerimenti pratici per ridurre le spese superflue senza sacrificare la qualità della vita."
        },
        {
          question: "È possibile utilizzare ReMida AI per gestire il budget familiare?",
          answer: "Sì, ReMida AI è ideale per la gestione del budget familiare. Puoi tracciare entrate e uscite, suddividere le spese per categorie e membri della famiglia, e ricevere consigli su come ottimizzare le risorse familiari."
        }
      ]
    },
    {
      id: 'account',
      label: 'Account e Iscrizione',
      faqs: [
        {
          question: "Come posso creare un account?",
          answer: "Puoi registrarti gratuitamente cliccando sul pulsante 'Inizia Ora' nella homepage. Ti verrà chiesto di fornire un'email valida e creare una password sicura. Una volta completata la registrazione, potrai accedere a tutte le funzionalità di base."
        },
        {
          question: "ReMida AI è gratuito?",
          answer: "ReMida AI offre un piano base gratuito che include l'accesso all'assistente AI e agli strumenti fondamentali di pianificazione finanziaria. Sono disponibili anche piani premium con funzionalità avanzate per chi desidera un'esperienza più completa."
        },
        {
          question: "Posso eliminare il mio account?",
          answer: "Sì, puoi eliminare il tuo account in qualsiasi momento dalle impostazioni del profilo. Quando elimini l'account, tutti i tuoi dati personali vengono rimossi permanentemente dai nostri server in conformità con le normative sulla privacy."
        }
      ]
    }
  ];

  // Filtra le FAQ in base alla ricerca
  const filteredFaqs = searchQuery 
    ? faqCategories.map(category => ({
        ...category,
        faqs: category.faqs.filter(faq => 
          faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
          faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
        )
      })).filter(category => category.faqs.length > 0)
    : faqCategories;

  return (
    <Layout>
      {/* Hero Section */}
      <section className="bg-remida-teal text-white py-16">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Come Possiamo Aiutarti?</h1>
            <p className="text-xl">
              Trova risposte alle tue domande o contattaci direttamente per assistenza personalizzata.
            </p>
            <div className="relative mt-8 max-w-xl mx-auto">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <Input 
                type="text" 
                placeholder="Cerca nelle FAQ..." 
                className="pl-10 py-6 bg-white/10 border-white/20 text-white placeholder:text-white/60 focus:ring-white/30"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            <div className="lg:col-span-2">
              <h2 className="section-title">Domande Frequenti</h2>
              
              {searchQuery && filteredFaqs.length === 0 ? (
                <div className="text-center py-10">
                  <HelpCircle className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2">Nessun risultato trovato</h3>
                  <p className="text-gray-600">
                    Prova a utilizzare termini diversi o contattaci direttamente per assistenza.
                  </p>
                </div>
              ) : (
                <Tabs defaultValue={filteredFaqs[0]?.id || "general"} className="mt-8">
                  <TabsList className="grid grid-cols-2 md:grid-cols-4 mb-6">
                    {filteredFaqs.map(category => (
                      <TabsTrigger key={category.id} value={category.id}>
                        {category.label}
                      </TabsTrigger>
                    ))}
                  </TabsList>
                  
                  {filteredFaqs.map(category => (
                    <TabsContent key={category.id} value={category.id} className="mt-4">
                      <Accordion type="single" collapsible className="space-y-4">
                        {category.faqs.map((faq, index) => (
                          <AccordionItem key={index} value={`item-${index}`} className="border rounded-lg px-4">
                            <AccordionTrigger className="text-left font-medium py-4">
                              {faq.question}
                            </AccordionTrigger>
                            <AccordionContent className="text-gray-600 py-4">
                              {faq.answer}
                            </AccordionContent>
                          </AccordionItem>
                        ))}
                      </Accordion>
                    </TabsContent>
                  ))}
                </Tabs>
              )}
            </div>
            
            {/* Supporto Diretto */}
            <div className="lg:col-span-1">
              <Card className="bg-gray-50 border-none shadow-sm">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MessageSquare className="h-5 w-5 text-remida-teal" />
                    Contattaci Direttamente
                  </CardTitle>
                  <CardDescription>
                    Non hai trovato quello che cerchi? Siamo qui per aiutarti.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form className="space-y-4">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                        Nome
                      </label>
                      <Input id="name" placeholder="Il tuo nome" />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                        Email
                      </label>
                      <Input id="email" type="email" placeholder="La tua email" />
                    </div>
                    <div>
                      <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                        Oggetto
                      </label>
                      <Input id="subject" placeholder="Oggetto della richiesta" />
                    </div>
                    <div>
                      <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                        Messaggio
                      </label>
                      <Textarea 
                        id="message" 
                        placeholder="Descrivi nel dettaglio la tua richiesta..." 
                        rows={4}
                      />
                    </div>
                    <Button type="submit" className="w-full bg-remida-teal hover:bg-remida-teal/90">
                      Invia Messaggio
                    </Button>
                  </form>
                  
                  <div className="mt-8 space-y-4">
                    <h3 className="font-semibold text-gray-800">Altri Modi per Contattarci</h3>
                    <div className="flex items-center gap-3">
                      <Mail className="h-5 w-5 text-remida-teal" />
                      <span className="text-gray-600">supporto@remida-ai.it</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Phone className="h-5 w-5 text-remida-teal" />
                      <span className="text-gray-600">+39 02 1234567</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default FAQ;
