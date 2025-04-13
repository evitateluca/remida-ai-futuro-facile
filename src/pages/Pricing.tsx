
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Layout from '@/components/Layout';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Check, Shield, Sparkles, Zap, HelpCircle, Award } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { Badge } from '@/components/ui/badge';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { useSubscription } from '@/contexts/SubscriptionContext';

const Pricing = () => {
  const { user } = useAuth();
  const { subscription, isLoading: subscriptionLoading } = useSubscription();
  const navigate = useNavigate();
  
  const handleSubscribe = (tier: string) => {
    if (!user) {
      navigate('/auth');
      return;
    }
    
    navigate(`/checkout?tier=${tier}`);
  };

  return (
    <Layout>
      <div className="container-custom py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-remida-teal mb-4">Piani e Prezzi</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Scegli il piano ReMida AI più adatto alle tue esigenze. Tutti i piani offrono accesso al nostro assistente finanziario, ma con funzionalità differenti.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {/* Free Tier */}
          <Card className="flex flex-col border border-gray-200">
            <CardHeader>
              <CardTitle className="text-2xl">Gratuito</CardTitle>
              <CardDescription>Per iniziare con l'educazione finanziaria</CardDescription>
            </CardHeader>
            <CardContent className="flex-grow">
              <div className="mb-6">
                <p className="text-3xl font-bold">0€<span className="text-lg font-normal text-gray-500">/mese</span></p>
              </div>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mr-2 shrink-0 mt-0.5" />
                  <span>Chat AI (5 domande/giorno)</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mr-2 shrink-0 mt-0.5" />
                  <span>Simulatore di budgeting base</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mr-2 shrink-0 mt-0.5" />
                  <span>Simulatore di pianificazione base</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mr-2 shrink-0 mt-0.5" />
                  <span>3 mini-lezioni</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mr-2 shrink-0 mt-0.5" />
                  <span>Accesso alla community Reddit</span>
                </li>
              </ul>
            </CardContent>
            <CardFooter>
              <Button 
                onClick={() => handleSubscribe('free')} 
                className={`w-full bg-remida-orange hover:bg-remida-orange/90 ${
                  subscription?.tier === 'free' ? 'opacity-50 cursor-not-allowed' : ''
                }`}
                disabled={subscription?.tier === 'free'}
              >
                {subscription?.tier === 'free' ? 'Piano Attuale' : 'Inizia Gratis'}
              </Button>
            </CardFooter>
          </Card>

          {/* Standard Tier */}
          <Card className="flex flex-col relative border-remida-teal border-2">
            <div className="absolute -top-4 left-0 right-0 flex justify-center">
              <Badge className="bg-remida-teal px-3 py-1">Più Popolare</Badge>
            </div>
            <CardHeader>
              <CardTitle className="text-2xl">Standard</CardTitle>
              <CardDescription>Per utenti che vogliono ottimizzare le finanze</CardDescription>
            </CardHeader>
            <CardContent className="flex-grow">
              <div className="mb-6">
                <p className="text-3xl font-bold">5€<span className="text-lg font-normal text-gray-500">/mese</span></p>
                <p className="text-sm text-gray-500">o 50€/anno (risparmi 10€)</p>
              </div>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mr-2 shrink-0 mt-0.5" />
                  <span>Chat AI avanzata (domande illimitate, storico)</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mr-2 shrink-0 mt-0.5" />
                  <span>Simulatore di budgeting con grafico</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mr-2 shrink-0 mt-0.5" />
                  <span>Simulatore di pianificazione con toggle crypto</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mr-2 shrink-0 mt-0.5" />
                  <span>Notifiche proattive (5/mese)</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mr-2 shrink-0 mt-0.5" />
                  <span>Educazione gamificata base (quiz, badge)</span>
                </li>
              </ul>
            </CardContent>
            <CardFooter>
              <Button 
                onClick={() => handleSubscribe('standard')} 
                className={`w-full bg-remida-orange hover:bg-remida-orange/90 ${
                  subscription?.tier === 'standard' ? 'opacity-50 cursor-not-allowed' : ''
                }`}
                disabled={subscription?.tier === 'standard'}
              >
                {subscription?.tier === 'standard' ? 'Piano Attuale' : 'Scegli Standard'}
              </Button>
            </CardFooter>
          </Card>

          {/* Premium Tier */}
          <Card className="flex flex-col border border-gray-200">
            <CardHeader>
              <CardTitle className="text-2xl">Premium</CardTitle>
              <CardDescription>Per chi vuole il massimo controllo finanziario</CardDescription>
            </CardHeader>
            <CardContent className="flex-grow">
              <div className="mb-6">
                <p className="text-3xl font-bold">10€<span className="text-lg font-normal text-gray-500">/mese</span></p>
                <p className="text-sm text-gray-500">o 100€/anno (risparmi 20€)</p>
              </div>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mr-2 shrink-0 mt-0.5" />
                  <span>Tutto del piano Standard</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mr-2 shrink-0 mt-0.5" />
                  <span>Notifiche illimitate con suggerimenti predittivi</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mr-2 shrink-0 mt-0.5" />
                  <span>Educazione gamificata avanzata (contenuti esclusivi)</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mr-2 shrink-0 mt-0.5" />
                  <span>Simulazioni avanzate</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mr-2 shrink-0 mt-0.5" />
                  <span>Supporto prioritario</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mr-2 shrink-0 mt-0.5" />
                  <span>Badge premium</span>
                </li>
              </ul>
            </CardContent>
            <CardFooter>
              <Button 
                onClick={() => handleSubscribe('premium')} 
                className={`w-full bg-remida-orange hover:bg-remida-orange/90 ${
                  subscription?.tier === 'premium' ? 'opacity-50 cursor-not-allowed' : ''
                }`}
                disabled={subscription?.tier === 'premium'}
              >
                {subscription?.tier === 'premium' ? 'Piano Attuale' : 'Scegli Premium'}
              </Button>
            </CardFooter>
          </Card>
        </div>

        {/* Comparison Table */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-remida-teal mb-6 text-center">Confronto Caratteristiche</h2>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-50">
                  <th className="py-3 px-4 text-left border-b">Caratteristica</th>
                  <th className="py-3 px-4 text-center border-b">Gratuito</th>
                  <th className="py-3 px-4 text-center border-b">Standard</th>
                  <th className="py-3 px-4 text-center border-b">Premium</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="py-3 px-4 border-b">Chat AI</td>
                  <td className="py-3 px-4 text-center border-b">5 domande/giorno</td>
                  <td className="py-3 px-4 text-center border-b">Illimitata</td>
                  <td className="py-3 px-4 text-center border-b">Illimitata</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 border-b">Storico chat</td>
                  <td className="py-3 px-4 text-center border-b">No</td>
                  <td className="py-3 px-4 text-center border-b">Sì</td>
                  <td className="py-3 px-4 text-center border-b">Sì</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 border-b">Simulatore di budgeting</td>
                  <td className="py-3 px-4 text-center border-b">Base</td>
                  <td className="py-3 px-4 text-center border-b">Con grafici</td>
                  <td className="py-3 px-4 text-center border-b">Avanzato</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 border-b">Opzione crypto</td>
                  <td className="py-3 px-4 text-center border-b">No</td>
                  <td className="py-3 px-4 text-center border-b">Sì</td>
                  <td className="py-3 px-4 text-center border-b">Sì</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 border-b">Notifiche proattive</td>
                  <td className="py-3 px-4 text-center border-b">No</td>
                  <td className="py-3 px-4 text-center border-b">5/mese</td>
                  <td className="py-3 px-4 text-center border-b">Illimitate</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 border-b">Educazione gamificata</td>
                  <td className="py-3 px-4 text-center border-b">3 mini-lezioni</td>
                  <td className="py-3 px-4 text-center border-b">Base</td>
                  <td className="py-3 px-4 text-center border-b">Avanzata</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 border-b">Supporto</td>
                  <td className="py-3 px-4 text-center border-b">Community</td>
                  <td className="py-3 px-4 text-center border-b">Email</td>
                  <td className="py-3 px-4 text-center border-b">Prioritario</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-remida-teal mb-6 text-center">Domande Frequenti</h2>
          <Accordion type="single" collapsible className="max-w-3xl mx-auto">
            <AccordionItem value="item-1">
              <AccordionTrigger className="text-lg">
                Posso cambiare piano in qualsiasi momento?
              </AccordionTrigger>
              <AccordionContent className="text-gray-600">
                Sì! Vai su Profilo e clicca "Cambia Piano" per modificare il tuo abbonamento in qualsiasi momento.
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-2">
              <AccordionTrigger className="text-lg">
                Come funziona la fatturazione?
              </AccordionTrigger>
              <AccordionContent className="text-gray-600">
                La fatturazione avviene in modo automatico ogni mese o anno, a seconda del ciclo scelto. Puoi modificare 
                il metodo di pagamento o il ciclo di fatturazione in qualsiasi momento dal tuo profilo.
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-3">
              <AccordionTrigger className="text-lg">
                Posso richiedere un rimborso?
              </AccordionTrigger>
              <AccordionContent className="text-gray-600">
                Offriamo un periodo di prova di 14 giorni per tutti i nuovi abbonamenti. Se non sei soddisfatto, contattaci 
                entro questo periodo per un rimborso completo. Dopo i 14 giorni, i rimborsi sono valutati caso per caso.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>

        {/* CTA Section */}
        <div className="text-center bg-gray-50 p-8 rounded-xl">
          <h2 className="text-2xl font-bold text-remida-teal mb-4">Ancora indeciso?</h2>
          <p className="text-gray-600 mb-6">
            Inizia con il piano gratuito e scopri come ReMida AI può trasformare la tua relazione con il denaro.
            Potrai sempre passare a un piano superiore in futuro.
          </p>
          <Button 
            className="bg-remida-teal hover:bg-remida-teal/90" 
            asChild
          >
            <Link to="/contact">
              Contattaci per saperne di più
            </Link>
          </Button>
        </div>
      </div>
    </Layout>
  );
};

export default Pricing;
