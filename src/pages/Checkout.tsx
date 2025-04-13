
import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Layout from '@/components/Layout';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Loader2, CreditCard, CalendarClock } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Switch } from '@/components/ui/switch';
import { toast } from '@/hooks/use-toast';
import { useSubscription } from '@/contexts/SubscriptionContext';

const tierDetails = {
  standard: {
    name: 'Standard',
    monthlyPrice: 5,
    yearlyPrice: 50,
    features: [
      'Chat AI avanzata (domande illimitate, storico)',
      'Simulatore di budgeting con grafico',
      'Simulatore di pianificazione con toggle crypto',
      'Notifiche proattive (5/mese)',
      'Educazione gamificata base (quiz, badge)',
    ]
  },
  premium: {
    name: 'Premium',
    monthlyPrice: 10,
    yearlyPrice: 100,
    features: [
      'Tutto del piano Standard',
      'Notifiche illimitate con suggerimenti predittivi',
      'Educazione gamificata avanzata (contenuti esclusivi)',
      'Simulazioni avanzate',
      'Supporto prioritario',
      'Badge premium',
    ]
  }
};

const Checkout = () => {
  const [searchParams] = useSearchParams();
  const tier = searchParams.get('tier') || 'standard';
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');
  const [isProcessing, setIsProcessing] = useState(false);
  const { user } = useAuth();
  const { updateSubscription } = useSubscription();
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect if tier is not valid or is free (free doesn't need checkout)
    if (!tierDetails[tier as keyof typeof tierDetails] || tier === 'free') {
      navigate('/pricing');
    }
  }, [tier, navigate]);

  useEffect(() => {
    // Redirect if not logged in
    if (!user) {
      navigate('/auth');
    }
  }, [user, navigate]);

  const handleSubmit = async () => {
    if (!user) return;
    
    setIsProcessing(true);
    
    try {
      await updateSubscription(tier as 'standard' | 'premium', billingCycle);
      
      // Show success message
      toast({
        title: 'Abbonamento attivato!',
        description: `Benvenuto nel piano ${tierDetails[tier as keyof typeof tierDetails]?.name}!`,
      });
      
      // Redirect to dashboard
      navigate('/dashboard');
    } catch (error) {
      console.error('Error updating subscription:', error);
      toast({
        title: 'Errore durante la sottoscrizione',
        description: 'Si è verificato un errore durante l\'attivazione dell\'abbonamento. Riprova più tardi.',
        variant: 'destructive',
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const tierInfo = tierDetails[tier as keyof typeof tierDetails];
  if (!tierInfo) return null;
  
  const price = billingCycle === 'monthly' ? tierInfo.monthlyPrice : tierInfo.yearlyPrice;

  return (
    <Layout>
      <div className="container-custom py-12">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold mb-8 text-center">Completa la tua iscrizione</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
            <div className="md:col-span-3">
              <Card>
                <CardHeader>
                  <CardTitle>Dettagli Abbonamento</CardTitle>
                  <CardDescription>Conferma il tuo piano e le opzioni di pagamento</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <Label className="text-base font-medium">Il tuo piano</Label>
                    <div className="mt-2 p-4 bg-gray-50 rounded-lg">
                      <div className="flex justify-between items-center">
                        <div>
                          <h3 className="font-medium">{tierInfo.name}</h3>
                          <p className="text-sm text-gray-500">
                            {billingCycle === 'monthly' ? 'Fatturazione mensile' : 'Fatturazione annuale'}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="font-bold">{price}€</p>
                          <p className="text-xs text-gray-500">
                            {billingCycle === 'monthly' ? '/mese' : '/anno'}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <Label className="text-base font-medium mb-3 block">Ciclo di fatturazione</Label>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Mensile</span>
                      <Switch 
                        checked={billingCycle === 'yearly'}
                        onCheckedChange={(checked) => setBillingCycle(checked ? 'yearly' : 'monthly')}
                      />
                      <span className="text-sm">Annuale <span className="text-green-600 text-xs">(risparmio 20%)</span></span>
                    </div>
                  </div>
                  
                  <div>
                    <Label className="text-base font-medium mb-3 block">Metodo di pagamento</Label>
                    <RadioGroup defaultValue="card">
                      <div className="flex items-center space-x-2 border p-3 rounded-lg">
                        <RadioGroupItem value="card" id="card" />
                        <Label htmlFor="card" className="flex items-center gap-2">
                          <CreditCard className="h-5 w-5" /> 
                          Carta di credito/debito
                        </Label>
                      </div>
                    </RadioGroup>
                  </div>
                  
                  <div className="pt-4 border-t">
                    <div className="flex justify-between mb-2">
                      <span>Subtotale</span>
                      <span>{price}€</span>
                    </div>
                    <div className="flex justify-between mb-2">
                      <span>IVA (22%)</span>
                      <span>{(price * 0.22).toFixed(2)}€</span>
                    </div>
                    <div className="flex justify-between font-bold text-lg pt-2 border-t">
                      <span>Totale</span>
                      <span>{(price * 1.22).toFixed(2)}€</span>
                    </div>
                  </div>
                </CardContent>
                
                <CardFooter>
                  <Button 
                    className="w-full bg-remida-orange hover:bg-remida-orange/90"
                    onClick={handleSubmit}
                    disabled={isProcessing}
                  >
                    {isProcessing ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Elaborazione...
                      </>
                    ) : (
                      'Conferma Abbonamento'
                    )}
                  </Button>
                </CardFooter>
              </Card>
            </div>
            
            <div className="md:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Riepilogo Piano</CardTitle>
                </CardHeader>
                <CardContent>
                  <h3 className="font-medium text-lg mb-2">{tierInfo.name}</h3>
                  <ul className="space-y-2 mb-4">
                    {tierInfo.features.map((feature, index) => (
                      <li key={index} className="text-sm flex items-start">
                        <span className="text-green-500 mr-2">✓</span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                  
                  <div className="text-sm text-gray-500 space-y-2 border-t pt-4 mt-4">
                    <div className="flex items-center gap-2">
                      <CalendarClock className="h-4 w-4" />
                      <span>
                        Abbonamento {billingCycle === 'monthly' ? 'mensile' : 'annuale'} con rinnovo automatico
                      </span>
                    </div>
                    <p>Puoi disdire in qualsiasi momento dalla pagina profilo.</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Checkout;
