import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useTranslation } from '@/contexts/TranslationContext';
import { supabase } from '@/integrations/supabase/client';
import {
  Plus,
  Bitcoin,
  LayoutDashboard,
  Wallet,
  LineChart,
  MessageSquare,
  BookOpen,
  Bell,
  CircleDollarSign,
  Menu
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from '@/hooks/use-toast';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { 
  Sidebar, 
  SidebarContent, 
  SidebarFooter, 
  SidebarHeader, 
  SidebarMenu, 
  SidebarMenuButton, 
  SidebarMenuItem, 
  SidebarProvider, 
  SidebarTrigger 
} from '@/components/ui/sidebar';
import DashboardNavbar from '@/components/dashboardNavbar/DashboardNavbar';

// Import components
import OverviewTab from '@/components/dashboard/OverviewTab';
import PortfolioTab from '@/components/dashboard/PortfolioTab';
import PlanningTab from '@/components/dashboard/PlanningTab';
import ChatAITab from '@/components/dashboard/ChatAITab';
import AcademyTab from '@/components/dashboard/AcademyTab';
import NotificationsTab from '@/components/dashboard/NotificationsTab';
import UsdtWalletTab from '@/components/dashboard/UsdtWalletTab';
import MarketTab from '@/components/dashboard/MarketTab';
import IntegrationManager from '@/components/integrations/IntegrationManager';

// Import services
import { getUserAssets, getUserTransactions } from '@/integrations/dataImport/ImportService';

// Import our notification event system
import { notificationEvents } from '@/components/dashboard/NotificationsTab';

const Dashboard = () => {
  const { user, loading } = useAuth();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [profileData, setProfileData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [chatMessages, setChatMessages] = useState([
    { role: 'assistant', content: 'Ciao! Sono il tuo assistente ReMida AI. Come posso aiutarti con le tue finanze oggi?' }
  ]);
  const [newMessage, setNewMessage] = useState('');
  
  // State for user gamification and portfolio
  const [userLevel, setUserLevel] = useState(2);
  const [userPoints, setUserPoints] = useState(120);
  const [nextLevelPoints, setNextLevelPoints] = useState(200);
  const [showIntegrationManager, setShowIntegrationManager] = useState(false);
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const [activeTab, setActiveTab] = useState('overview');
  
  // Dati del portafoglio
  const [portfolioData, setPortfolioData] = useState([]);
  const [totalPortfolioValue, setTotalPortfolioValue] = useState(0);
  
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
  
  // Planning simulator
  const [simulationInputs, setSimulationInputs] = useState({
    goalName: "Fondo di emergenza",
    targetAmount: 5000,
    timeframe: 6, // months
    monthlyContribution: 500,
    strategy: "mixed", // can be: safe, mixed, aggressive
    expectedReturn: 0.05, // 5% annually
  });
  
  const [simulationResults, setSimulationResults] = useState({
    monthlyContribution: 0,
    expectedReturn: 0,
    totalContributions: 0,
    totalReturns: 0,
    finalAmount: 0,
  });
  
  // Calculate simulation results when inputs change
  useEffect(() => {
    const { targetAmount, timeframe, expectedReturn, strategy } = simulationInputs;
    
    // Adjust expected return based on strategy
    let annualReturn = expectedReturn;
    if (strategy === "safe") {
      annualReturn = 0.03; // 3%
    } else if (strategy === "mixed") {
      annualReturn = 0.05; // 5%
    } else if (strategy === "aggressive") {
      annualReturn = 0.08; // 8%
    }
    
    // Convert annual return to monthly
    const monthlyReturn = Math.pow(1 + annualReturn, 1/12) - 1;
    
    // Calculate required monthly contribution
    const monthlyContribution = targetAmount / ((Math.pow(1 + monthlyReturn, timeframe) - 1) / monthlyReturn);
    
    // Calculate total contributions and returns
    const totalContributions = monthlyContribution * timeframe;
    const totalReturns = targetAmount - totalContributions;
    
    setSimulationResults({
      monthlyContribution: Math.round(monthlyContribution),
      expectedReturn: annualReturn * 100, // convert to percentage
      totalContributions: Math.round(totalContributions),
      totalReturns: Math.round(totalReturns),
      finalAmount: targetAmount,
    });
    
    // Update the monthly contribution in the inputs
    setSimulationInputs(prev => ({
      ...prev,
      monthlyContribution: Math.round(monthlyContribution)
    }));
    
  }, [simulationInputs.targetAmount, simulationInputs.timeframe, simulationInputs.strategy]);
  
  useEffect(() => {
    if (!loading && !user) {
      navigate('/auth');
      return;
    }
    
    if (user) {
      fetchProfileData();
      fetchUserAssets();
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
  
  const fetchUserAssets = async () => {
    if (!user) return;
    
    try {
      const assets = await getUserAssets(user.id);
      
      // Transform assets for the pie chart
      const chartData = assets.map(asset => ({
        name: asset.name,
        value: asset.value,
        percentage: 0, // Will be calculated after we get the total
        color: getAssetColor(asset.type)
      }));
      
      // Calculate the total value and percentages
      const total = chartData.reduce((sum, asset) => sum + asset.value, 0);
      
      chartData.forEach(asset => {
        asset.percentage = (asset.value / total) * 100;
      });
      
      setPortfolioData(chartData);
      setTotalPortfolioValue(total);
    } catch (error) {
      console.error('Error fetching user assets:', error);
    }
  };
  
  const getAssetColor = (type: string) => {
    const colors = {
      crypto: '#FF9500',
      fiat: '#00C389',
      stock: '#3B82F6',
      other: '#8884D8'
    };
    
    return colors[type as keyof typeof colors] || '#CCCCCC';
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
      
      // Award points for engagement
      setUserPoints(prev => {
        const newPoints = prev + 5;
        if (newPoints >= nextLevelPoints) {
          setUserLevel(prevLevel => prevLevel + 1);
          setNextLevelPoints(prevLevel => prevLevel + 100);
          toast({
            title: 'Level Up!',
            description: `Congratulazioni! Sei salito al livello ${userLevel + 1}!`,
          });
        }
        return newPoints;
      });
    }, 1000);
    
    setNewMessage('');
  };
  
  const handleDataImported = () => {
    setRefreshTrigger(prev => prev + 1);
    fetchUserAssets();
    
    // Award points for connecting a data source
    setUserPoints(prev => prev + 30);
    
    toast({
      title: "Dati importati",
      description: "I tuoi dati finanziari sono stati importati con successo!",
    });
  };

  const [unreadNotifications, setUnreadNotifications] = useState(0);
  
  // Subscribe to notification count changes
  useEffect(() => {
    // Get initial unread count
    const unreadCount = 3; // Default for demonstration
    setUnreadNotifications(unreadCount);
    
    // Subscribe to future changes
    const unsubscribe = notificationEvents.subscribe(
      'unread-count-changed', 
      (count: number) => setUnreadNotifications(count)
    );
    
    return () => unsubscribe();
  }, []);

  if (loading || isLoading) {
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-remida-teal"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <div className="container-custom py-6">
        {/* Integration Manager Dialog */}
        <Dialog open={showIntegrationManager} onOpenChange={setShowIntegrationManager}>
          <DialogContent className="max-w-4xl">
            <DialogHeader>
              <DialogTitle>Gestione Integrazioni</DialogTitle>
              <DialogDescription>
                Collega i tuoi conti e servizi finanziari per visualizzarli in un'unica dashboard
              </DialogDescription>
            </DialogHeader>
            <IntegrationManager 
              userId={user?.id || ''} 
              onClose={() => setShowIntegrationManager(false)}
              onDataImported={handleDataImported}
            />
          </DialogContent>
        </Dialog>

        <div className="flex">
          <SidebarProvider>
            <div className="flex w-full flex-col">
              {/* Dashboard Navbar */}
              <DashboardNavbar unreadNotifications={unreadNotifications} />
              
              <div className="flex w-full flex-1">
                {/* Sidebar - explicitly set collapsible to icon mode */}
                <Sidebar variant="sidebar" collapsible="icon">
                  <SidebarHeader className="px-4 py-2">
                    <div className="flex items-center justify-between">
                      <h2 className="text-xl font-bold">ReMida Finance</h2>
                      <SidebarTrigger />
                    </div>
                  </SidebarHeader>
                  <SidebarContent>
                    <SidebarMenu>
                      <SidebarMenuItem>
                        <SidebarMenuButton 
                          onClick={() => setActiveTab('overview')}
                          isActive={activeTab === 'overview'}
                          tooltip={t('overview')}
                        >
                          <LayoutDashboard className="mr-2" />
                          <span>{t('overview')}</span>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                      <SidebarMenuItem>
                        <SidebarMenuButton 
                          onClick={() => setActiveTab('portfolio')}
                          isActive={activeTab === 'portfolio'}
                          tooltip={t('portfolio')}
                        >
                          <Wallet className="mr-2" />
                          <span>{t('portfolio')}</span>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                      <SidebarMenuItem>
                        <SidebarMenuButton 
                          onClick={() => setActiveTab('planning')}
                          isActive={activeTab === 'planning'}
                          tooltip={t('planning')}
                        >
                          <LineChart className="mr-2" />
                          <span>{t('planning')}</span>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                      <SidebarMenuItem>
                        <SidebarMenuButton 
                          onClick={() => setActiveTab('notifications')}
                          isActive={activeTab === 'notifications'}
                          tooltip={t('notifications')}
                        >
                          <Bell className="mr-2" />
                          <span>{t('notifications')}</span>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                      <SidebarMenuItem>
                        <SidebarMenuButton 
                          onClick={() => setActiveTab('usdt')}
                          isActive={activeTab === 'usdt'}
                          tooltip="USDT Wallet"
                        >
                          <CircleDollarSign className="mr-2" />
                          <span>{t('usdt_wallet')}</span>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                      <SidebarMenuItem>
                        <SidebarMenuButton 
                          onClick={() => setActiveTab('market')}
                          isActive={activeTab === 'market'}
                          tooltip={t('crypto_market')}
                        >
                          <Bitcoin className="mr-2" />
                          <span>{t('crypto_market')}</span>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                      <SidebarMenuItem>
                        <SidebarMenuButton 
                          onClick={() => setActiveTab('chatai')}
                          isActive={activeTab === 'chatai'}
                          tooltip={t('chat_ai')}
                        >
                          <MessageSquare className="mr-2" />
                          <span>{t('chat_ai')}</span>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                      <SidebarMenuItem>
                        <SidebarMenuButton 
                          onClick={() => setActiveTab('academy')}
                          isActive={activeTab === 'academy'}
                          tooltip={t('academy')}
                        >
                          <BookOpen className="mr-2" />
                          <span>{t('academy')}</span>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    </SidebarMenu>
                  </SidebarContent>
                  <SidebarFooter>
                    <Button 
                      className="w-full bg-remida-teal hover:bg-remida-teal/90"
                      onClick={() => setShowIntegrationManager(true)}
                    >
                      <Plus size={16} className="mr-2" />
                      {t('connect_data')}
                    </Button>
                  </SidebarFooter>
                </Sidebar>

                {/* Main Content */}
                <div className="flex-1 p-6">
                  <div className="mb-4 md:hidden">
                    <Button variant="outline" size="sm" className="flex items-center gap-2">
                      <Menu size={16} />
                      <span>{t('menu')}</span>
                    </Button>
                  </div>
                  
                  {activeTab === 'overview' && (
                    <>
                      {/* Hero Section/Banner (only in overview tab) */}
                      <section className="bg-remida-teal text-white py-10 mb-6 rounded-lg">
                        <div className="container-custom">
                          <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
                            <div>
                              <h1 className="text-3xl md:text-4xl font-bold mb-2">
                                {t('welcome')} {profileData?.full_name || profileData?.username || ''}
                              </h1>
                              <p className="text-lg">{t('financial_overview')}</p>
                            </div>
                            <div className="mt-4 md:mt-0 flex flex-col items-center">
                              <div className="bg-white text-remida-teal rounded-full p-3 mb-1">
                                <Bitcoin size={36} />
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
                      
                      <OverviewTab
                        totalPortfolioValue={totalPortfolioValue}
                        portfolioData={portfolioData}
                        objectives={objectives}
                        monthlyData={monthlyData}
                        moneyDials={moneyDials}
                        onShowIntegrationManager={() => setShowIntegrationManager(true)}
                      />
                    </>
                  )}
                  
                  {activeTab === 'portfolio' && (
                    <PortfolioTab
                      userId={user?.id || ''}
                      refreshTrigger={refreshTrigger}
                      moneyDials={moneyDials}
                    />
                  )}
                  
                  {activeTab === 'planning' && (
                    <PlanningTab
                      objectives={objectives}
                      savingsProjection={savingsProjection}
                      simulationInputs={simulationInputs}
                      setSimulationInputs={setSimulationInputs}
                      simulationResults={simulationResults}
                    />
                  )}
                  
                  {activeTab === 'chatai' && (
                    <ChatAITab
                      chatMessages={chatMessages}
                      setChatMessages={setChatMessages}
                      aiResponses={aiResponses}
                      newMessage={newMessage}
                      setNewMessage={setNewMessage}
                      handleSendMessage={handleSendMessage}
                    />
                  )}
                  
                  {activeTab === 'academy' && (
                    <AcademyTab />
                  )}
                  
                  {activeTab === 'notifications' && (
                    <NotificationsTab />
                  )}
                  
                  {activeTab === 'usdt' && (
                    <UsdtWalletTab />
                  )}
                  
                  {activeTab === 'market' && (
                    <MarketTab />
                  )}
                </div>
              </div>
            </div>
          </SidebarProvider>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
