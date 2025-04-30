import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '@/components/Layout';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import {
  ArrowRight,
  TrendingUp,
  Wallet,
  Target,
  Award,
  Star,
  Clock,
  PiggyBank,
  CreditCard,
  Landmark,
  BarChart3,
  Calendar,
  ArrowUpRight,
  ArrowDownRight,
  MessageCircle,
  BitcoinIcon,
  CircleDollarSign,
  Book,
  Lightbulb,
  TrendingDown,
  Medal,
  ChevronRight,
  Bell
} from 'lucide-react';
import Shield from '@/components/icons/Shield';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from '@/hooks/use-toast';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Slider } from '@/components/ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

// Import the new features components
import EducationalPath from '@/components/features/EducationalPath';
import FuturePlanning from '@/components/features/FuturePlanning';

const Dashboard = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const [profileData, setProfileData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [chatMessages, setChatMessages] = useState([
    { role: 'assistant', content: 'Ciao! Sono il tuo assistente ReMida AI. Come posso aiutarti con le tue finanze oggi?' }
  ]);
  const [newMessage, setNewMessage] = useState('');
  const [selectedGoal, setSelectedGoal] = useState(null);
  const [newGoalName, setNewGoalName] = useState('');
  const [newGoalAmount, setNewGoalAmount] = useState('');
  const [newGoalTimeframe, setNewGoalTimeframe] = useState(''); // Fixed: renamed setter function
  
  // Stato per tenere traccia dei livelli e punti utente
  const [userLevel, setUserLevel] = useState(2);
  const [userPoints, setUserPoints] = useState(120);
  const [nextLevelPoints, setNextLevelPoints] = useState(200);
  
  // Dati del portafoglio simulato
  const portfolioData = [
    { name: 'Bitcoin (BTC)', value: 2500, percentage: 25, color: '#FF9500' },
    { name: 'Ethereum (ETH)', value: 1800, percentage: 18, color: '#627EEA' },
    { name: 'USD Coin (USDC)', value: 3000, percentage: 30, color: '#2775CA' },
    { name: 'Tether (USDT)', value: 1200, percentage: 12, color: '#26A17B' },
    { name: 'Conto Corrente', value: 1500, percentage: 15, color: '#00C389' }
  ];

  // Money Dials - categorie di spesa
  const moneyDials = [
    { category: 'Cibo & Bevande', amount: 450, importance: 7, color: '#FF6B6B' },
    { category: 'Alloggio', amount: 800, importance: 9, color: '#4ECDC4' },
    { category: 'Trasporto', amount: 250, importance: 5, color: '#FF9F1C' },
    { category: 'Intrattenimento', amount: 200, importance: 6, color: '#A882DD' },
    { category: 'Crypto Trading', amount: 300, importance: 8, color: '#E4B363' },
    { category: 'Risparmio', amount: 300, importance: 7, color: '#1A936F' }
  ];
  
  // Dati obiettivi
  const objectives = [
    { 
      id: 1,
      name: 'Fondo Emergenza', 
      current: 1500, 
      target: 3000, 
      percentage: 50,
      timeframe: '6 mesi',
      strategy: 'USDT in staking (5%)',
      monthlyContribution: 250
    },
    { 
      id: 2,
      name: 'Viaggio a Tokyo', 
      current: 600, 
      target: 1200, 
      percentage: 50,
      timeframe: '1 anno',
      strategy: 'DCA in BTC + USDC',
      monthlyContribution: 50
    },
    { 
      id: 3,
      name: 'Gaming PC', 
      current: 400, 
      target: 1000, 
      percentage: 40,
      timeframe: '3 mesi',
      strategy: 'Risparmio su conto',
      monthlyContribution: 200
    },
  ];
  
  // AI chat responses
  const aiResponses = {
    "ciao": "Ciao! Come posso aiutarti con le tue finanze oggi?",
    "come funziona": "ReMida AI ti aiuta a gestire il tuo patrimonio crypto e tradizionale, pianificare obiettivi finanziari e migliorare le tue abitudini di spesa. Cosa ti interessa approfondire?",
    "cosa sono le stablecoin": "Le stablecoin sono criptovalute ancorate al valore di un'altra attività, come il dollaro USA. Tether (USDT) e USD Coin (USDC) sono esempi popolari. Sono utili per mantenere stabilità nel tuo portafoglio crypto e possono essere usate per il risparmio con tassi di interesse interessanti.",
    "come risparmio per un viaggio": "Per risparmiare per un viaggio, potresti: 1) Creare un obiettivo dedicato con una timeline precisa, 2) Utilizzare stablecoin come USDT con programmi di staking per guadagnare interessi durante il risparmio, 3) Impostare trasferimenti automatici mensili, 4) Usare una app di budget per ridurre spese non necessarie e accelerare il risparmio.",
    "posso comprare bitcoin": "Puoi comprare Bitcoin attraverso exchange come Binance, Coinbase o Crypto.com. Ti consiglio di iniziare con piccole somme e considerare una strategia DCA (Dollar-Cost Averaging) piuttosto che investire tutto in una volta. Ricorda: investi solo ciò che sei disposto a perdere e diversifica il tuo portafoglio.",
    "come iniziare con le crypto": "Per iniziare con le crypto: 1) Educati sui concetti base (blockchain, wallet, exchange), 2) Scegli un exchange affidabile e crea un account, 3) Imposta un budget che puoi permetterti di rischiare, 4) Inizia con Bitcoin ed Ethereum per imparare, 5) Valuta di usare stablecoin come USDT per la parte più conservativa, 6) Tieni traccia dei tuoi investimenti qui su ReMida AI."
  };
  
  // Dati per i grafici
  const monthlyData = [
    { name: 'Gen', income: 1900, expenses: 1700, savings: 200 },
    { name: 'Feb', income: 1950, expenses: 1650, savings: 300 },
    { name: 'Mar', income: 2000, expenses: 1600, savings: 400 },
    { name: 'Apr', income: 2000, expenses: 1550, savings: 450 },
    { name: 'Mag', income: 2000, expenses: 1500, savings: 500 },
    { name: 'Giu', income: 2100, expenses: 1550, savings: 550 },
  ];
  
  const savingsProjection = [
    { month: 'Lug', pessimistic: 3000, expected: 3300, optimistic: 3600 },
    { month: 'Ago', pessimistic: 3250, expected: 3600, optimistic: 4000 },
    { month: 'Set', pessimistic: 3500, expected: 3900, optimistic: 4400 },
    { month: 'Ott', pessimistic: 3750, expected: 4200, optimistic: 4800 },
    { month: 'Nov', pessimistic: 4000, expected: 4500, optimistic: 5200 },
    { month: 'Dic', pessimistic: 4250, expected: 4800, optimistic: 5600 },
  ];
  
  useEffect(() => {
    if (!loading && !user) {
      navigate('/auth');
      return;
    }
    
    if (user) {
      fetchProfileData();
    }
  }, [user, loading, navigate]);
  
  const fetchProfileData = async () => {
    if (!user) return;
    
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();
        
      if (error) {
        throw error;
      }
      
      setProfileData(data);
    } catch (error) {
      console.error('Error fetching profile:', error);
      toast({
        title: 'Error fetching profile',
        description: 'There was a problem loading your profile data.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleSendMessage = () => {
    if (!newMessage.trim()) return;
    
    // Add user message to chat
    setChatMessages([...chatMessages, { role: 'user', content: newMessage }]);
    
    // Generate AI response
    setTimeout(() => {
      let response = "Non ho una risposta specifica per questa domanda. Puoi provare a chiedere qualcosa sulle crypto, risparmio o pianificazione finanziaria?";
      
      // Check for predefined responses
      const lowercaseMsg = newMessage.toLowerCase();
      Object.keys(aiResponses).forEach(key => {
        if (lowercaseMsg.includes(key)) {
          response = aiResponses[key];
        }
      });
      
      setChatMessages(prev => [...prev, { role: 'assistant', content: response }]);
    }, 1000);
    
    setNewMessage('');
  };
  
  const handleViewGoalDetails = (goal) => {
    setSelectedGoal(goal);
  };

  const handleAddObjective = () => {
    toast({
      title: "Funzionalità in arrivo",
      description: "La creazione di nuovi obiettivi sarà disponibile a breve!",
    });
  };
  
  const handleViewTransactions = () => {
    toast({
      title: "Transazioni",
      description: "Funzionalità in arrivo nelle prossime versioni!",
    });
  };
  
  const handleConnectWallet = () => {
    toast({
      title: "Collegamento Wallet",
      description: "La funzionalità di collegamento wallet sarà disponibile a breve!",
    });
  };

  if (loading || isLoading) {
    return (
      <Layout>
        <div className="flex justify-center items-center h-[60vh]">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-remida-teal"></div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      {/* Hero Section */}
      <section className="bg-remida-teal text-white py-10">
        <div className="container-custom">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold mb-2">Benvenuto {profileData?.full_name || profileData?.username || 'alla tua Dashboard'}</h1>
              <p className="text-lg">La tua panoramica finanziaria completa</p>
            </div>
            <div className="mt-4 md:mt-0 flex flex-col items-center">
              <div className="bg-white text-remida-teal rounded-full p-3 mb-1">
                <Award size={36} />
              </div>
              <span className="text-xl font-bold">Livello {userLevel}</span>
              <div className="w-full bg-white/20 rounded-full h-2.5 mt-2">
                <div className="bg-remida-orange h-2.5 rounded-full" style={{ width: `${(userPoints/nextLevelPoints)*100}%` }}></div>
              </div>
              <span className="text-sm mt-1">{userPoints}/{nextLevelPoints} punti</span>
            </div>
          </div>
        </div>
      </section>

      {/* Dashboard Content */}
      <section className="py-10">
        <div className="container-custom">
          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="grid grid-cols-4 mb-8">
              <TabsTrigger value="overview">Panoramica</TabsTrigger>
              <TabsTrigger value="portfolio">Patrimonio</TabsTrigger>
              <TabsTrigger value="planning">Pianificazione</TabsTrigger>
              <TabsTrigger value="chatai">Chat AI</TabsTrigger>
            </TabsList>
            
            {/* Overview Tab */}
            <TabsContent value="overview">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                {/* Total Portfolio */}
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg font-semibold flex items-center">
                      <Wallet className="mr-2 h-5 w-5 text-remida-teal" /> Patrimonio Totale
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-remida-teal">€10.000</div>
                    <div className="flex items-center text-sm text-green-600">
                      <ArrowUpRight className="h-4 w-4 mr-1" /> 
                      <span>+€500 (5%) rispetto al mese scorso</span>
                    </div>
                  </CardContent>
                  <CardFooter className="pt-0">
                    <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">+5%</Badge>
                  </CardFooter>
                </Card>
                
                {/* Crypto Portfolio */}
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg font-semibold flex items-center">
                      <BitcoinIcon className="mr-2 h-5 w-5 text-remida-teal" /> Portafoglio Crypto
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-remida-teal">€8.500</div>
                    <div className="flex items-center text-sm text-green-600">
                      <ArrowUpRight className="h-4 w-4 mr-1" /> 
                      <span>+€600 (7.5%) rispetto al mese scorso</span>
                    </div>
                  </CardContent>
                  <CardFooter className="pt-0">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="text-remida-teal"
                      onClick={handleConnectWallet}
                    >
                      Collega Wallet <ArrowRight className="ml-1 h-4 w-4" />
                    </Button>
                  </CardFooter>
                </Card>
                
                {/* Objectives Progress */}
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg font-semibold flex items-center">
                      <Target className="mr-2 h-5 w-5 text-remida-orange" /> Obiettivi
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-remida-orange">3 Attivi</div>
                    <p className="text-sm text-gray-600">50% completati in media</p>
                    <Progress value={50} className="h-2 mt-2" />
                  </CardContent>
                  <CardFooter className="pt-0">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="text-remida-orange"
                      onClick={() => {
                        // Fixed: Using query selector to find the planning tab and dispatch a click event properly
                        const planningTab = document.querySelector('button[value="planning"]');
                        if (planningTab) {
                          (planningTab as HTMLButtonElement).click();
                        }
                      }}
                    >
                      Gestisci Obiettivi <ArrowRight className="ml-1 h-4 w-4" />
                    </Button>
                  </CardFooter>
                </Card>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                {/* Monthly Trends Chart */}
                <Card className="md:col-span-1">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <BarChart3 className="mr-2 h-5 w-5" /> Trends Mensili
                    </CardTitle>
                    <CardDescription>Andamento finanziario degli ultimi 6 mesi</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-64">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart
                          data={monthlyData}
                          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                        >
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="name" />
                          <YAxis />
                          <Tooltip />
                          <Line type="monotone" dataKey="income" stroke="#8884d8" activeDot={{ r: 8 }} name="Entrate" />
                          <Line type="monotone" dataKey="expenses" stroke="#ff7300" name="Uscite" />
                          <Line type="monotone" dataKey="savings" stroke="#82ca9d" name="Risparmi" />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
                
                {/* Money Dials Chart */}
                <Card className="md:col-span-1">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <CircleDollarSign className="mr-2 h-5 w-5" /> Money Dials
                    </CardTitle>
                    <CardDescription>Dove destini i tuoi soldi</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-64 flex items-center justify-center">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={moneyDials}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            outerRadius={80}
                            fill="#8884d8"
                            dataKey="amount"
                            label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                          >
                            {moneyDials.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                          </Pie>
                          <Tooltip formatter={(value) => `€${value}`} />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            
            {/* Portfolio Tab */}
            <TabsContent value="portfolio">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="md:col-span-1">
                  <Card className="h-full">
                    <CardHeader>
                      <CardTitle>Il Tuo Portafoglio</CardTitle>
                      <CardDescription>Distribuzione degli asset</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="h-64 flex items-center justify-center">
                        <ResponsiveContainer width="100%" height="100%">
                          <PieChart>
                            <Pie
                              data={portfolioData}
                              cx="50%"
                              cy="50%"
                              labelLine={false}
                              outerRadius={80}
                              fill="#8884d8"
                              dataKey="value"
                              label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                            >
                              {portfolioData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.color} />
                              ))}
                            </Pie>
                            <Tooltip formatter={(value) => `€${value}`} />
                          </PieChart>
                        </ResponsiveContainer>
                      </div>
                    </CardContent>
                  </Card>
                </div>
                
                <div className="md:col-span-2">
                  <Card>
                    <CardHeader>
                      <CardTitle>Dettaglio Asset</CardTitle>
                      <CardDescription>Valori e percentuali</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {portfolioData.map((asset, index) => (
                          <div key={index}>
                            <div className="flex justify-between mb-1">
                              <span className="text-sm font-medium">{asset.name}</span>
                              <span className="text-sm font-medium">€{asset.value}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Progress value={asset.percentage} className="h-2" 
                                style={{color: asset.color}} />
                              <span className="text-xs text-gray-500">{asset.percentage}%</span>
                            </div>
                          </div>
                        ))}
                      </div>
                      
                      <div className="mt-8">
                        <Button 
                          onClick={handleConnectWallet} 
                          className="bg-remida-teal hover:bg-remida-teal/90 w-full"
                        >
                          <Wallet className="mr-2 h-4 w-4" />
                          Collega il tuo Wallet
                        </Button>
                        
                        <div className="mt-4 text-sm text-center text-gray-500">
                          <p>ReMida AI supporta i principali wallet crypto e può collegarsi anche ai tuoi conti bancari per una visione completa del tuo patrimonio.</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card className="mt-6">
                    <CardHeader>
                      <CardTitle>Money Dials</CardTitle>
                      <CardDescription>Su cosa spendi i tuoi soldi</CardDescription>
                    </CardHeader>
                    <CardContent>
                      {moneyDials.map((category, index) => (
                        <div key={index} className="mb-4">
                          <div className="flex justify-between items-center mb-2">
                            <div>
                              <span className="font-medium">{category.category}</span>
                              <p className="text-sm text-gray-500">€{category.amount}/mese</p>
                            </div>
                            <div className="text-right">
                              <span className="text-sm">Importanza: {category.importance}/10</span>
                            </div>
                          </div>
                          <Slider
                            defaultValue={[category.importance * 10]}
                            max={100}
                            step={10}
                            disabled
                          />
                        </div>
                      ))}
                      
                      <div className="mt-4 text-sm text-center text-gray-500">
                        <p>I "Money Dials" ti mostrano dove dirigi i tuoi soldi in base alle tue priorità. Aumenta la spesa in ciò che ti dà più felicità e riduci il resto.</p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>
            
            {/* Planning Tab */}
            <TabsContent value="planning">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="md:col-span-1">
                  {selectedGoal ? (
                    <Card>
                      <CardHeader>
                        <div className="flex justify-between items-start">
                          <div>
                            <CardTitle>{selectedGoal.name}</CardTitle>
                            <CardDescription>Dettaglio obiettivo</CardDescription>
                          </div>
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => setSelectedGoal(null)}
                          >
                            Torna alla lista
                          </Button>
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div>
                          <h4 className="font-medium text-sm mb-1">Progresso</h4>
                          <Progress value={selectedGoal.percentage} className="h-2" />
                          <div className="flex justify-between mt-1 text-sm">
                            <span>€{selectedGoal.current}</span>
                            <span>{selectedGoal.percentage}%</span>
                            <span>€{selectedGoal.target}</span>
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <h4 className="font-medium text-sm mb-1">Timeframe</h4>
                            <p>{selectedGoal.timeframe}</p>
                          </div>
                          <div>
                            <h4 className="font-medium text-sm mb-1">Contributo Mensile</h4>
                            <p>€{selectedGoal.monthlyContribution}/mese</p>
                          </div>
                        </div>
                        
                        <div>
                          <h4 className="font-medium text-sm mb-1">Strategia</h4>
                          <p>{selectedGoal.strategy}</p>
                        </div>
                        
                        <div className="pt-4 border-t">
                          <h4 className="font-medium text-sm mb-3">Simulazione</h4>
                          <div className="h-40">
                            <ResponsiveContainer width="100%" height="100%">
                              <LineChart
                                data={savingsProjection}
                                margin={{ top: 5, right: 20, left: 10, bottom: 5 }}
                              >
                                <XAxis dataKey="month" />
                                <YAxis />
                                <Tooltip />
                                <Line type="monotone" dataKey="expected" stroke="#82ca9d" name="Atteso" />
                                <Line type="monotone" dataKey="optimistic" stroke="#8884d8" name="Ottimistico" />
                                <Line type="monotone" dataKey="pessimistic" stroke="#ff7300" name="Pessimistico" />
                              </LineChart>
                            </ResponsiveContainer>
                          </div>
                        </div>
                      </CardContent>
                      <CardFooter>
                        <Button 
                          className="bg-remida-teal hover:bg-remida-teal/90 w-full"
                        >
                          Aggiungi Fondi
                        </Button>
                      </CardFooter>
                    </Card>
                  ) : (
                    <Card className="h-full">
                      <CardHeader>
                        <CardTitle>I Tuoi Obiettivi</CardTitle>
                        <CardDescription>Pianifica il tuo futuro</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        {objectives.map((objective, index) => (
                          <div 
                            key={index} 
                            className="p-4 border rounded-md cursor-pointer hover:bg-gray-50 transition-colors"
                            onClick={() => handleViewGoalDetails(objective)}
                          >
                            <div className="flex justify-between items-start mb-2">
                              <h3 className="font-medium">{objective.name}</h3>
                              <Badge>{objective.timeframe}</Badge>
                            </div>
                            <Progress value={objective.percentage} className="h-2 mb-2" />
                            <div className="flex justify-between text-sm">
                              <span>€{objective.current} / €{objective.target}</span>
                              <span>{objective.percentage}%</span>
                            </div>
                          </div>
                        ))}
                      </CardContent>
                      <CardFooter>
                        <Button 
                          onClick={handleAddObjective}
                          className="bg-remida-orange hover:bg-remida-orange/90 w-full"
                        >
                          + Nuovo Obiettivo
                        </Button>
                      </CardFooter>
                    </Card>
                  )}
                </div>
                
                <div className="md:col-span-2">
                  <Card>
                    <CardHeader>
                      <CardTitle>Simulatore di Pianificazione</CardTitle>
                      <CardDescription>Calcola come raggiungere i tuoi obiettivi</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                        <div>
                          <label className="block text-sm font-medium mb-2">Nome Obiettivo</label>
                          <Input 
                            placeholder="es. Fondo Emergenza" 
                            value={newGoalName}
                            onChange={e => setNewGoalName(e.target.value)}
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-2">Importo Target</label>
                          <Input 
                            placeholder="es. 5000" 
                            type="number" 
                            value={newGoalAmount}
                            onChange={e => setNewGoalAmount(e.target.value)}
                          />
                        </div>
                      </div>
                      
                      <div className="mb-6">
                        <label className="block text-sm font-medium mb-2">Timeframe</label>
                        <div className="grid grid-cols-3 gap-2">
                          <Button variant="outline">3 mesi</Button>
                          <Button variant="outline">6 mesi</Button>
                          <Button variant="outline">1 anno</Button>
                          <Button variant="outline">2 anni</Button>
                          <Button variant="outline">5 anni</Button>
                          <Button variant="outline">Personalizzato</Button>
                        </div>
                      </div>
                      
                      <div className="mb-6">
                        <label className="block text-sm font-medium mb-2">Strategia di Risparmio</label>
                        <div className="grid grid-cols-2 gap-3">
                          <div className="border p-4 rounded-md cursor-pointer hover:bg-gray-50 transition-colors">
                            <div className="flex items-center mb-2">
                              <Landmark className="h-5 w-5 mr-2 text-blue-500" />
                              <h4 className="font-medium">Tradizionale</h4>
                            </div>
                            <p className="text-sm text-gray-500">Risparmio su conto corrente con un interesse dell'1%</p>
                          </div>
                          
                          <div className="border border-remida-teal p-4 rounded-md cursor-pointer bg-remida-teal/5">
                            <div className="flex items-center mb-2">
                              <BitcoinIcon className="h-5 w-5 mr-2 text-orange-500" />
                              <h4 className="font-medium">Crypto Mix</h4>
                            </div>
                            <p className="text-sm text-gray-500">70% USDT staking (5%) + 30% BTC/ETH</p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="mb-6 pt-4 border-t">
                        <h3 className="text-lg font-medium mb-3">Risultati Simulazione</h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                          <div className="p-4 bg-gray-50 rounded-md">
                            <h4 className="text-sm font-medium mb-1">Contributo Mensile</h4>
                            <p className="text-2xl font-bold text-remida-teal">€200</p>
                          </div>
                          <div className="p-4 bg-gray-50 rounded-md">
                            <h4 className="text-sm font-medium mb-1">Rendimento Stimato</h4>
                            <p className="text-2xl font-bold text-green-600">+€126</p>
                          </div>
                          <div className="p-4 bg-gray-50 rounded-md">
                            <h4 className="text-sm font-medium mb-1">Totale Finale</h4>
                            <p className="text-2xl font-bold">€2.526</p>
                          </div>
                        </div>
                        
                        <div className="h-64">
                          <ResponsiveContainer width="100%" height="100%">
                            <BarChart
                              data={[
                                { month: "Contributi", amount: 2400 },
                                { month: "Rendimenti", amount: 126 },
                                { month: "Totale", amount: 2526 }
                              ]}
                              margin={{ top: 5, right: 20, left: 20, bottom: 5 }}
                            >
                              <CartesianGrid strokeDasharray="3 3" />
                              <XAxis dataKey="month" />
                              <YAxis />
                              <Tooltip formatter={(value) => `€${value}`} />
                              <Bar dataKey="amount" fill="#3b82f6" />
                            </BarChart>
                          </ResponsiveContainer>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="flex flex-col items-stretch">
                      <Button 
                        className="bg-remida-teal hover:bg-remida-teal/90 w-full"
                      >
                        Crea Questo Obiettivo
                      </Button>
                      <p className="text-xs text-center mt-2 text-gray-500">
                        La simulazione è solo a scopo indicativo. I rendimenti effettivi potrebbero variare.
                      </p>
                    </CardFooter>
                  </Card>
                </div>
              </div>
            </TabsContent>
            
            {/* Chat AI Tab */}
            <TabsContent value="chatai">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="md:col-span-1">
                  <Card className="h-full">
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <MessageCircle className="mr-2 h-5 w-5" /> 
                        Domande frequenti
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        {Object.keys(aiResponses).map((key, index) => (
                          <Button 
                            key={index} 
                            variant="outline" 
                            className="w-full justify-start text-left h-auto py-2"
                            onClick={() => {
                              setNewMessage(key);
                              handleSendMessage();
                            }}
                          >
                            {key.charAt(0).toUpperCase() + key.slice(1)}?
                          </Button>
                        ))}
                      </div>
                    </CardContent>
                    <CardFooter>
                      <div className="text-sm text-gray-500">
                        <p>Puoi chiedere informazioni su crypto, strategie di risparmio, obiettivi finanziari e molto altro!</p>
                      </div>
                    </CardFooter>
                  </Card>
                </div>
                
                <div className="md:col-span-2">
                  <Card className="h-full flex flex-col">
                    <CardHeader>
                      <CardTitle>ReMida AI Chat</CardTitle>
                      <CardDescription>Il tuo assistente finanziario personale</CardDescription>
                    </CardHeader>
                    <CardContent className="flex-grow overflow-y-auto max-h-[500px]">
                      <div className="space-y-4">
                        {chatMessages.map((message, index) => (
                          <div 
                            key={index} 
                            className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                          >
                            <div 
                              className={`max-w-[80%] p-3 rounded-lg ${
                                message.role === 'user' 
                                  ? 'bg-remida-teal text-white' 
                                  : 'bg-gray-100 text-gray-800'
                              }`}
                            >
                              {message.content}
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                    <CardFooter className="border-t pt-4 mt-auto">
                      <div className="flex w-full gap-2">
                        <Input 
                          placeholder="Scrivi un messaggio..." 
                          value={newMessage}
                          onChange={(e) => setNewMessage(e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                              handleSendMessage();
                            }
                          }}
                        />
                        <Button 
                          className="bg-remida-teal hover:bg-remida-teal/90"
                          onClick={handleSendMessage}
                        >
                          Invia
                        </Button>
                      </div>
                    </CardFooter>
                  </Card>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </Layout>
  );
};

export default Dashboard;
