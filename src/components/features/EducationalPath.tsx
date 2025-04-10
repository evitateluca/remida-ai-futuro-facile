
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ChevronRight } from 'lucide-react';

const EducationalPath = () => {
  const [activeTab, setActiveTab] = useState('basics');

  const educationalContent = {
    basics: [
      {
        title: "Cos'è un Fondo Pensione?",
        description: "Un fondo pensione è uno strumento di risparmio a lungo termine progettato per integrare la pensione pubblica. Contribuisci regolarmente per costruire un capitale che potrai utilizzare quando andrai in pensione.",
        tips: "Iniziare presto ti permette di beneficiare dell'interesse composto, anche con piccoli contributi mensili."
      },
      {
        title: "Budget Mensile",
        description: "Un budget è un piano che ti aiuta a gestire i tuoi soldi, tracciando entrate e spese. Ti permette di risparmiare per obiettivi specifici e ridurre spese non necessarie.",
        tips: "La regola 50/30/20: 50% per i bisogni essenziali, 30% per i desideri, 20% per risparmi e investimenti."
      },
      {
        title: "Fondo di Emergenza",
        description: "Un fondo di emergenza è un risparmio destinato a coprire spese impreviste come riparazioni auto o spese mediche, evitando di dover ricorrere al credito.",
        tips: "Cerca di risparmiare l'equivalente di 3-6 mesi di spese essenziali."
      }
    ],
    investing: [
      {
        title: "ETF: Cosa Sono?",
        description: "Gli ETF (Exchange-Traded Funds) sono fondi che replicano un indice di mercato e vengono scambiati in borsa come azioni. Offrono diversificazione a basso costo.",
        tips: "Gli ETF sono spesso consigliati per investitori principianti grazie ai bassi costi e alla diversificazione automatica."
      },
      {
        title: "Investimenti a Basso Rischio",
        description: "Includono conti di deposito, buoni del tesoro e fondi del mercato monetario. Offrono rendimenti bassi ma stabili con rischio minimo.",
        tips: "Ideali per obiettivi a breve termine o per una parte del tuo portafoglio di investimenti."
      },
      {
        title: "Comprendere il Rischio",
        description: "Il rischio negli investimenti è la possibilità di perdere parte o tutto il capitale investito. Ogni tipo di investimento comporta un livello di rischio diverso.",
        tips: "Maggiore è il potenziale rendimento, maggiore è generalmente il rischio associato."
      }
    ],
    saving: [
      {
        title: "Obiettivi di Risparmio",
        description: "Definire obiettivi chiari ti motiva a risparmiare. Possono essere a breve termine (vacanza), medio termine (auto) o lungo termine (casa, pensione).",
        tips: "Usa conti separati per diversi obiettivi per monitorare meglio i tuoi progressi."
      },
      {
        title: "Automazione del Risparmio",
        description: "Impostare trasferimenti automatici verso conti di risparmio o investimento appena ricevi lo stipendio rende il risparmio più facile e costante.",
        tips: "\"Paga prima te stesso\": tratta i risparmi come una spesa fissa prioritaria."
      },
      {
        title: "Piccoli Risparmi Quotidiani",
        description: "Piccoli cambiamenti nelle abitudini quotidiane possono portare a risparmi significativi nel tempo, come portare il pranzo al lavoro o ridurre gli abbonamenti non utilizzati.",
        tips: "Risparmia €3 al giorno portando il caffè da casa e accumulerai oltre €1000 in un anno."
      }
    ],
  };

  return (
    <div className="feature-card h-full flex flex-col">
      <h3 className="text-xl font-semibold mb-4 text-remida-teal">Percorso Educativo</h3>
      
      <Tabs defaultValue="basics" className="w-full" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-3 mb-6">
          <TabsTrigger value="basics">Nozioni Base</TabsTrigger>
          <TabsTrigger value="investing">Investimenti</TabsTrigger>
          <TabsTrigger value="saving">Risparmio</TabsTrigger>
        </TabsList>
        
        {Object.entries(educationalContent).map(([key, topics]) => (
          <TabsContent key={key} value={key} className="space-y-4">
            {topics.map((topic, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle className="text-lg text-remida-teal">{topic.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">{topic.description}</p>
                </CardContent>
                <CardFooter className="bg-gray-50 border-t">
                  <p className="text-sm text-gray-700 italic">
                    <span className="font-semibold text-remida-teal">Consiglio: </span>
                    {topic.tips}
                  </p>
                </CardFooter>
              </Card>
            ))}
            
            <div className="text-center mt-6 pt-4 border-t">
              <Button variant="link" className="text-remida-orange hover:text-remida-orange/90">
                Scopri altri argomenti <ChevronRight className="ml-1 h-4 w-4" />
              </Button>
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};

export default EducationalPath;
