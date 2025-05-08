
import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AlertTriangle, TrendingDown, TrendingUp, ExternalLink, BarChart3 } from 'lucide-react';
import { AreaChart, Area, LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer } from 'recharts';
import { toast } from '@/hooks/use-toast';

interface CryptoData {
  id: string;
  name: string;
  symbol: string;
  current_price: number;
  price_change_percentage_24h: number;
  market_cap: number;
  total_volume: number;
  circulating_supply: number;
  image: string;
  sparkline_in_7d: {
    price: number[];
  };
}

const MarketTab = () => {
  const [selectedTimeframe, setSelectedTimeframe] = useState('24h');
  const [selectedTab, setSelectedTab] = useState('prices');
  const [cryptoData, setCryptoData] = useState<CryptoData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Dati per la volatilità (statici poiché sono dati di esempio)
  const volatilityData = [
    { date: 'May 1', BTC: 18, ETH: 12, USDT: 0.5 },
    { date: 'May 2', BTC: 22, ETH: 15, USDT: 0.3 },
    { date: 'May 3', BTC: 16, ETH: 10, USDT: 0.4 },
    { date: 'May 4', BTC: 25, ETH: 18, USDT: 0.2 },
    { date: 'May 5', BTC: 12, ETH: 8, USDT: 0.5 },
    { date: 'May 6', BTC: 20, ETH: 14, USDT: 0.3 },
    { date: 'May 7', BTC: 15, ETH: 10, USDT: 0.4 },
  ];

  // Dati di notizie statiche
  const marketNews = [
    {
      title: "L'UE approva la regolamentazione delle stablecoin",
      content: "Le nuove normative dell'UE confermano USDT come un'opzione stablecoin conforme per gli utenti europei, fornendo stabilità nel mercato crypto.",
      date: "7 Maggio 2025",
      tag: "Regolamentazione"
    },
    {
      title: "Bitcoin registra una volatilità del 10%",
      content: "BTC ha sperimentato significative oscillazioni di prezzo questa settimana. Gli esperti consigliano di considerare stablecoin come USDT come rifugio temporaneo.",
      date: "6 Maggio 2025",
      tag: "Mercato"
    },
    {
      title: "Aumento dei tassi di staking",
      content: "Le principali piattaforme stanno aumentando le ricompense di staking per USDT per attrarre liquidità. I tassi ora variano dal 4,5% al 6% annuale.",
      date: "5 Maggio 2025",
      tag: "Staking"
    },
    {
      title: "I protocolli DeFi adottano USDT",
      content: "Le principali piattaforme DeFi hanno ampliato l'integrazione di USDT, offrendo nuove opportunità per la generazione di rendimenti e la fornitura di liquidità.",
      date: "4 Maggio 2025",
      tag: "DeFi"
    }
  ];

  useEffect(() => {
    const fetchCryptoData = async () => {
      setLoading(true);
      try {
        // Uso l'API pubblica di CoinGecko per ottenere i dati di mercato
        const response = await fetch(
          'https://api.coingecko.com/api/v3/coins/markets?vs_currency=eur&order=market_cap_desc&per_page=10&page=1&sparkline=true&price_change_percentage=24h'
        );
        
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        
        const data = await response.json();
        setCryptoData(data);
      } catch (err) {
        console.error('Error fetching crypto data:', err);
        setError('Impossibile caricare i dati. Riprova più tardi.');
        toast({
          title: 'Errore',
          description: 'Impossibile caricare i dati crypto. Riprova più tardi.',
          variant: 'destructive',
        });
      } finally {
        setLoading(false);
      }
    };

    fetchCryptoData();
    
    // Aggiorna i dati ogni 60 secondi
    const intervalId = setInterval(() => {
      fetchCryptoData();
    }, 60000);
    
    return () => clearInterval(intervalId);
  }, []);

  // Transforma i dati di sparkline per Recharts
  const getSparklineData = (sparkline: number[]) => {
    return sparkline?.map((price, index) => ({
      time: index,
      price: price,
    })) || [];
  };
  
  // Formatta il numero per la visualizzazione
  const formatMarketCap = (num: number) => {
    if (num >= 1e9) return `€${(num / 1e9).toFixed(1)}B`;
    if (num >= 1e6) return `€${(num / 1e6).toFixed(1)}M`;
    return `€${num.toLocaleString()}`;
  };

  if (loading && cryptoData.length === 0) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-remida-teal"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold flex items-center gap-2">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6"><circle cx="12" cy="12" r="10"></circle><path d="M9 12h6"></path><path d="M11 9h2"></path><path d="M11 15h2"></path></svg>
        Mercato Crypto
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {cryptoData.slice(0, 3).map((crypto, index) => (
          <Card key={crypto.id}>
            <CardHeader className="pb-2">
              <div className="flex items-center gap-2">
                <img src={crypto.image} alt={crypto.name} className="h-6 w-6" />
                <CardTitle className="text-lg">{crypto.symbol.toUpperCase()}/EUR</CardTitle>
              </div>
              <CardDescription>{crypto.name}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">€{crypto.current_price.toLocaleString()}</div>
              <div className={`flex items-center ${crypto.price_change_percentage_24h < 0 ? 'text-red-500' : 'text-green-500'}`}>
                {crypto.price_change_percentage_24h < 0 ? <TrendingDown className="h-4 w-4 mr-1" /> : <TrendingUp className="h-4 w-4 mr-1" />}
                <span>{crypto.price_change_percentage_24h.toFixed(2)}%</span>
              </div>
            </CardContent>
          </Card>
        ))}
        
        <Card className="bg-yellow-50 border-yellow-200">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Avviso di Mercato</CardTitle>
            <CardDescription>Avviso di volatilità</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center text-amber-600">
              <AlertTriangle className="h-5 w-5 mr-2" />
              <span className="font-medium">Alta volatilità oggi</span>
            </div>
            <p className="text-sm mt-1">USDT rimane stabile a $1,00</p>
          </CardContent>
        </Card>
      </div>
      
      <Tabs value={selectedTab} onValueChange={setSelectedTab} className="w-full">
        <TabsList className="grid grid-cols-3 mb-4">
          <TabsTrigger value="prices">Prezzi</TabsTrigger>
          <TabsTrigger value="volatility">Volatilità</TabsTrigger>
          <TabsTrigger value="insights">Approfondimenti di Mercato</TabsTrigger>
        </TabsList>
        
        <TabsContent value="prices">
          <div className="grid grid-cols-1 gap-6">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle>Prezzi di Mercato</CardTitle>
                    <CardDescription>Valori delle criptovalute in tempo reale</CardDescription>
                  </div>
                  <div className="flex gap-2">
                    {['24h', '7d', '30d', '90d'].map(time => (
                      <Button 
                        key={time}
                        variant={selectedTimeframe === time ? "default" : "outline"}
                        size="sm"
                        onClick={() => setSelectedTimeframe(time)}
                      >
                        {time}
                      </Button>
                    ))}
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {error ? (
                    <div className="p-4 border border-red-300 bg-red-50 rounded-lg text-red-500">
                      {error}
                    </div>
                  ) : (
                    cryptoData.map((crypto) => (
                      <div key={crypto.id} className="p-4 border rounded-lg">
                        <div className="flex justify-between items-center mb-2">
                          <div className="flex items-center gap-2">
                            <img src={crypto.image} alt={crypto.name} className="w-8 h-8 rounded-full" />
                            <div>
                              <div className="font-medium">{crypto.name}</div>
                              <div className="text-sm text-muted-foreground">{crypto.symbol.toUpperCase()}</div>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="font-bold">€{crypto.current_price.toLocaleString()}</div>
                            <div className={`text-sm ${crypto.price_change_percentage_24h < 0 ? 'text-red-500' : 'text-green-500'}`}>
                              {crypto.price_change_percentage_24h < 0 ? <TrendingDown className="inline h-3 w-3 mr-1" /> : <TrendingUp className="inline h-3 w-3 mr-1" />}
                              {crypto.price_change_percentage_24h.toFixed(2)}%
                            </div>
                          </div>
                        </div>
                        <div className="h-16">
                          <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={getSparklineData(crypto.sparkline_in_7d?.price || [])}>
                              <Line 
                                type="monotone" 
                                dataKey="price" 
                                stroke={crypto.price_change_percentage_24h < 0 ? '#ef4444' : '#10b981'} 
                                dot={false} 
                                strokeWidth={2}
                              />
                            </LineChart>
                          </ResponsiveContainer>
                        </div>
                        <div className="grid grid-cols-3 gap-2 mt-2 text-xs text-muted-foreground">
                          <div>Capitalizzazione di Mercato: {formatMarketCap(crypto.market_cap)}</div>
                          <div>Volume 24h: {formatMarketCap(crypto.total_volume)}</div>
                          <div>Offerta Circolante: {crypto.circulating_supply.toLocaleString()}</div>
                        </div>
                      </div>
                    ))
                  )}
                  
                  {loading && (
                    <div className="flex justify-center py-4">
                      <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-remida-teal"></div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="volatility">
          <Card>
            <CardHeader>
              <CardTitle>Confronto di Volatilità</CardTitle>
              <CardDescription>Confronto della volatilità dei prezzi tra gli asset</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={volatilityData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <RechartsTooltip />
                    <Bar dataKey="BTC" fill="#f7931a" name="Bitcoin" />
                    <Bar dataKey="ETH" fill="#627eea" name="Ethereum" />
                    <Bar dataKey="USDT" fill="#26a17b" name="Tether" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-4 p-3 bg-blue-50 border border-blue-100 rounded-lg">
                <h4 className="font-medium text-blue-800 mb-1 flex items-center">
                  <TrendingDown className="h-4 w-4 mr-2" /> 
                  Analisi della Volatilità
                </h4>
                <p className="text-sm text-blue-700">
                  USDT mantiene una volatilità di prezzo minima (±0,5%) anche durante le turbolenze di mercato, 
                  rendendolo un'ottima scelta per preservare il valore in condizioni di incertezza.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="insights">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Notizie di Mercato</CardTitle>
                  <CardDescription>Ultimi aggiornamenti che influenzano il mercato crypto</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {marketNews.map((news, index) => (
                      <div key={index} className="border-b pb-4 last:border-0 last:pb-0">
                        <div className="flex justify-between items-start">
                          <h4 className="font-medium">{news.title}</h4>
                          <Badge variant="outline">{news.tag}</Badge>
                        </div>
                        <p className="text-sm mt-1 mb-2 text-muted-foreground">{news.content}</p>
                        <div className="text-xs text-muted-foreground">{news.date}</div>
                      </div>
                    ))}
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full" size="sm">Carica altre notizie</Button>
                </CardFooter>
              </Card>
            </div>
            
            <div>
              <Card>
                <CardHeader>
                  <CardTitle>Suggerimenti Rapidi di Mercato</CardTitle>
                  <CardDescription>Raccomandazioni personalizzate basate sulle condizioni attuali del mercato</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="p-3 bg-amber-50 border border-amber-100 rounded-lg">
                        <h4 className="font-medium text-amber-800 mb-1">Strategia di Volatilità BTC</h4>
                        <p className="text-sm text-amber-700">
                          Con BTC {cryptoData[0]?.price_change_percentage_24h < 0 ? 'in calo' : 'in aumento'} del {cryptoData[0]?.price_change_percentage_24h ? Math.abs(cryptoData[0]?.price_change_percentage_24h).toFixed(1) : '5.2'}%, considera di spostare il 20% del tuo BTC in USDT fino a quando il mercato non si stabilizza.
                        </p>
                        <Button size="sm" variant="outline" className="mt-2 w-full border-amber-200 text-amber-700">Rivedi Strategia</Button>
                      </div>
                      
                      <div className="p-3 bg-green-50 border border-green-100 rounded-lg">
                        <h4 className="font-medium text-green-800 mb-1">Opportunità di Staking</h4>
                        <p className="text-sm text-green-700">
                          Gli attuali tassi di staking di USDT sono ai massimi annuali. Considera di mettere in staking USDT inattivi per ottenere fino al 5% di APY.
                        </p>
                        <Button size="sm" variant="outline" className="mt-2 w-full border-green-200 text-green-700">Esplora Staking</Button>
                      </div>
                      
                      <div className="p-3 bg-blue-50 border border-blue-100 rounded-lg">
                        <h4 className="font-medium text-blue-800 mb-1">Opportunità di DCA</h4>
                        <p className="text-sm text-blue-700">
                          Con i prezzi {cryptoData[0]?.price_change_percentage_24h < 0 ? 'in calo' : 'in variazione'}, è un buon momento per implementare una strategia di Dollar-Cost Averaging utilizzando piccole quantità di USDT.
                        </p>
                        <Button size="sm" variant="outline" className="mt-2 w-full border-blue-200 text-blue-700">Inizia DCA</Button>
                      </div>
                    </div>
                  </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default MarketTab;
