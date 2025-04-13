
import { useState, useEffect } from 'react';
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
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from '@/hooks/use-toast';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const Dashboard = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const [profileData, setProfileData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  
  // Stato per tenere traccia dei livelli e punti utente
  const [userLevel, setUserLevel] = useState(2);
  const [userPoints, setUserPoints] = useState(120);
  const [nextLevelPoints, setNextLevelPoints] = useState(200);
  
  // Dati finanziari simulati
  const savings = 2750;
  const investments = 1500;
  const expenses = [
    { category: 'Casa', amount: 800, percentage: 40 },
    { category: 'Trasporti', amount: 250, percentage: 12.5 },
    { category: 'Alimentazione', amount: 350, percentage: 17.5 },
    { category: 'Svago', amount: 200, percentage: 10 },
    { category: 'Altro', amount: 400, percentage: 20 },
  ];
  const objectives = [
    { name: 'Fondo Emergenza', current: 1500, target: 3000, percentage: 50 },
    { name: 'Vacanza Estate', current: 600, target: 1200, percentage: 50 },
    { name: 'Nuovo Computer', current: 400, target: 1000, percentage: 40 },
  ];
  const achievements = [
    { name: 'Risparmiatore Alle Prime Armi', icon: <Star className="h-5 w-5" />, unlocked: true },
    { name: 'Budget Master', icon: <Wallet className="h-5 w-5" />, unlocked: true },
    { name: 'Pianificatore', icon: <Calendar className="h-5 w-5" />, unlocked: false },
    { name: 'Investitore', icon: <TrendingUp className="h-5 w-5" />, unlocked: false },
    { name: 'Obiettivo Completato', icon: <Target className="h-5 w-5" />, unlocked: false },
  ];
  
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
  
  const handleAddObjective = () => {
    toast({
      title: "Nuovo obiettivo",
      description: "Funzionalità in arrivo nelle prossime versioni!",
    });
  };
  
  const handleViewTransactions = () => {
    toast({
      title: "Transazioni",
      description: "Funzionalità in arrivo nelle prossime versioni!",
    });
  };
  
  const handleManageBudget = () => {
    navigate('/features');
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
              <TabsTrigger value="expenses">Spese</TabsTrigger>
              <TabsTrigger value="objectives">Obiettivi</TabsTrigger>
              <TabsTrigger value="achievements">Traguardi</TabsTrigger>
            </TabsList>
            
            {/* Overview Tab */}
            <TabsContent value="overview">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                {/* Savings Card */}
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg font-semibold flex items-center">
                      <PiggyBank className="mr-2 h-5 w-5 text-remida-teal" /> Risparmi Totali
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-remida-teal">€{savings}</div>
                    <div className="flex items-center text-sm text-green-600">
                      <ArrowUpRight className="h-4 w-4 mr-1" /> 
                      <span>+€250 (10%) rispetto al mese scorso</span>
                    </div>
                  </CardContent>
                  <CardFooter className="pt-0">
                    <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">+10%</Badge>
                  </CardFooter>
                </Card>
                
                {/* Investments Card */}
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg font-semibold flex items-center">
                      <TrendingUp className="mr-2 h-5 w-5 text-remida-teal" /> Investimenti
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-remida-teal">€{investments}</div>
                    <div className="flex items-center text-sm text-green-600">
                      <ArrowUpRight className="h-4 w-4 mr-1" /> 
                      <span>+€100 (7%) rispetto al mese scorso</span>
                    </div>
                  </CardContent>
                  <CardFooter className="pt-0">
                    <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">+7%</Badge>
                  </CardFooter>
                </Card>
                
                {/* Next Level Card */}
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg font-semibold flex items-center">
                      <Award className="mr-2 h-5 w-5 text-remida-orange" /> Prossimo Livello
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-remida-orange">Livello {userLevel + 1}</div>
                    <p className="text-sm text-gray-600">Mancano {nextLevelPoints - userPoints} punti</p>
                    <Progress value={(userPoints/nextLevelPoints)*100} className="h-2 mt-2" />
                  </CardContent>
                  <CardFooter className="pt-0">
                    <Button variant="link" size="sm" className="text-remida-orange p-0">
                      Come guadagnare punti <ArrowRight className="ml-1 h-4 w-4" />
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
                
                {/* Future Projections Chart */}
                <Card className="md:col-span-1">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <TrendingUp className="mr-2 h-5 w-5" /> Proiezione Risparmi
                    </CardTitle>
                    <CardDescription>Stima dei risparmi per i prossimi 6 mesi</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-64">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                          data={savingsProjection}
                          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                        >
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="month" />
                          <YAxis />
                          <Tooltip />
                          <Bar dataKey="pessimistic" fill="#ff7300" name="Pessimistica" />
                          <Bar dataKey="expected" fill="#82ca9d" name="Attesa" />
                          <Bar dataKey="optimistic" fill="#8884d8" name="Ottimistica" />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Recent Activity */}
                <Card className="md:col-span-1">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Clock className="mr-2 h-5 w-5" /> Attività Recente
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex justify-between items-center pb-2 border-b">
                      <div className="flex items-center">
                        <CreditCard className="h-4 w-4 mr-2 text-gray-500" />
                        <span>Supermercato</span>
                      </div>
                      <div className="text-right">
                        <div className="font-medium">-€45,60</div>
                        <div className="text-xs text-gray-500">Oggi</div>
                      </div>
                    </div>
                    <div className="flex justify-between items-center pb-2 border-b">
                      <div className="flex items-center">
                        <Landmark className="h-4 w-4 mr-2 text-gray-500" />
                        <span>Stipendio</span>
                      </div>
                      <div className="text-right">
                        <div className="font-medium text-green-600">+€1.850,00</div>
                        <div className="text-xs text-gray-500">2 giorni fa</div>
                      </div>
                    </div>
                    <div className="flex justify-between items-center pb-2 border-b">
                      <div className="flex items-center">
                        <CreditCard className="h-4 w-4 mr-2 text-gray-500" />
                        <span>Ristorante</span>
                      </div>
                      <div className="text-right">
                        <div className="font-medium">-€32,50</div>
                        <div className="text-xs text-gray-500">3 giorni fa</div>
                      </div>
                    </div>
                    <div className="flex justify-between items-center pb-2 border-b">
                      <div className="flex items-center">
                        <CreditCard className="h-4 w-4 mr-2 text-gray-500" />
                        <span>Benzina</span>
                      </div>
                      <div className="text-right">
                        <div className="font-medium">-€50,00</div>
                        <div className="text-xs text-gray-500">5 giorni fa</div>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="w-full"
                      onClick={handleViewTransactions}
                    >
                      Vedi Tutte le Transazioni
                    </Button>
                  </CardFooter>
                </Card>
                
                {/* Monthly Overview */}
                <Card className="md:col-span-1">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <BarChart3 className="mr-2 h-5 w-5" /> Panoramica Mensile
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium">Reddito</span>
                        <span className="text-sm font-medium text-green-600">€2.000,00</span>
                      </div>
                      <Progress value={100} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium">Spese</span>
                        <span className="text-sm font-medium">€1.500,00</span>
                      </div>
                      <Progress value={75} className="h-2 bg-gray-200 [&>div]:bg-amber-500" />
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium">Risparmi</span>
                        <span className="text-sm font-medium text-green-600">€500,00</span>
                      </div>
                      <Progress value={25} className="h-2" />
                    </div>
                    <div className="pt-4 border-t mt-4">
                      <div className="flex justify-between items-center">
                        <span className="font-medium">Budget Rimanente</span>
                        <span className="font-bold text-remida-teal">€500,00</span>
                      </div>
                      <p className="text-sm text-gray-500 mt-1">25% del tuo reddito mensile</p>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="w-full"
                      onClick={handleManageBudget}
                    >
                      Gestisci Budget
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            </TabsContent>
            
            {/* Expenses Tab */}
            <TabsContent value="expenses">
              <Card>
                <CardHeader>
                  <CardTitle>Le Tue Spese Mensili</CardTitle>
                  <CardDescription>Suddivisione delle tue spese per categoria</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {expenses.map((expense, index) => (
                      <div key={index}>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm font-medium">{expense.category}</span>
                          <span className="text-sm font-medium">€{expense.amount}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Progress value={expense.percentage} className="h-2" />
                          <span className="text-xs text-gray-500">{expense.percentage}%</span>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-6 pt-4 border-t">
                    <div className="flex justify-between items-center">
                      <span className="font-medium">Totale Spese</span>
                      <span className="font-bold">€2.000,00</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="bg-remida-teal hover:bg-remida-teal/90 w-full">
                    Analisi Dettagliata
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
            
            {/* Objectives Tab */}
            <TabsContent value="objectives">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {objectives.map((objective, index) => (
                  <Card key={index}>
                    <CardHeader>
                      <CardTitle className="text-lg">{objective.name}</CardTitle>
                      <CardDescription>
                        €{objective.current} di €{objective.target}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Progress value={objective.percentage} className="h-2" />
                      <p className="text-sm text-gray-500 mt-2">{objective.percentage}% completato</p>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                      <Button variant="outline" size="sm">Modifica</Button>
                      <Button size="sm" className="bg-remida-teal hover:bg-remida-teal/90">
                        Aggiungi Fondi
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
                
                <Card 
                  className="border-dashed border-2 flex flex-col justify-center items-center p-6"
                  onClick={handleAddObjective}
                  role="button"
                  tabIndex={0}
                >
                  <div className="rounded-full bg-gray-100 p-3 mb-4">
                    <Target className="h-6 w-6 text-gray-400" />
                  </div>
                  <h3 className="text-lg font-medium mb-2">Nuovo Obiettivo</h3>
                  <p className="text-gray-500 text-center mb-4">
                    Crea un nuovo obiettivo di risparmio per i tuoi progetti futuri
                  </p>
                  <Button variant="outline">Aggiungi Obiettivo</Button>
                </Card>
              </div>
            </TabsContent>
            
            {/* Achievements Tab */}
            <TabsContent value="achievements">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {achievements.map((achievement, index) => (
                  <Card key={index} className={!achievement.unlocked ? "opacity-50" : ""}>
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start">
                        <div className={`rounded-full p-2 ${achievement.unlocked ? 'bg-remida-teal/20' : 'bg-gray-200'}`}>
                          {achievement.icon}
                        </div>
                        {achievement.unlocked && (
                          <Badge className="bg-remida-teal">Sbloccato</Badge>
                        )}
                      </div>
                    </CardHeader>
                    <CardContent>
                      <h3 className="font-medium">{achievement.name}</h3>
                      <p className="text-sm text-gray-500 mt-1">
                        {achievement.unlocked 
                          ? "Complimenti! Hai raggiunto questo traguardo." 
                          : "Continua a usare l'app per sbloccare questo traguardo."}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
              
              <div className="mt-8 text-center">
                <p className="text-lg font-medium mb-2">Hai sbloccato 2 di 5 traguardi</p>
                <Progress value={40} className="h-2 max-w-md mx-auto" />
                <p className="text-sm text-gray-500 mt-2">
                  Continua a pianificare le tue finanze per guadagnare più punti e sbloccare nuovi traguardi!
                </p>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </Layout>
  );
};

export default Dashboard;
