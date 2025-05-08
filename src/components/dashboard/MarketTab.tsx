
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
      title: "EU Passes Stablecoin Regulation",
      content: "New EU regulations confirm USDT as a compliant stablecoin option for European users, providing stability in the crypto market.",
      date: "May 7, 2025",
      tag: "Regulation"
    },
    {
      title: "Bitcoin Sees 10% Volatility",
      content: "BTC experienced significant price swings this week. Experts recommend considering stablecoins like USDT as a temporary haven.",
      date: "May 6, 2025",
      tag: "Market"
    },
    {
      title: "Staking Rates Increase",
      content: "Major platforms are increasing USDT staking rewards to attract liquidity. Rates now range from 4.5% to 6% annually.",
      date: "May 5, 2025",
      tag: "Staking"
    },
    {
      title: "DeFi Protocols Adopt USDT",
      content: "Leading DeFi platforms have expanded USDT integration, offering new opportunities for yield generation and liquidity provision.",
      date: "May 4, 2025",
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
        Crypto Market
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
            <CardTitle className="text-lg">Market Alert</CardTitle>
            <CardDescription>Volatility warning</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center text-amber-600">
              <AlertTriangle className="h-5 w-5 mr-2" />
              <span className="font-medium">High volatility today</span>
            </div>
            <p className="text-sm mt-1">USDT remains stable at $1.00</p>
          </CardContent>
        </Card>
      </div>
      
      <Tabs value={selectedTab} onValueChange={setSelectedTab} className="w-full">
        <TabsList className="grid grid-cols-3 mb-4">
          <TabsTrigger value="prices">Prices</TabsTrigger>
          <TabsTrigger value="volatility">Volatility</TabsTrigger>
          <TabsTrigger value="insights">Market Insights</TabsTrigger>
        </TabsList>
        
        <TabsContent value="prices">
          <div className="grid grid-cols-1 gap-6">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle>Market Prices</CardTitle>
                    <CardDescription>Real-time cryptocurrency values</CardDescription>
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
                          <div>Market Cap: {formatMarketCap(crypto.market_cap)}</div>
                          <div>24h Vol: {formatMarketCap(crypto.total_volume)}</div>
                          <div>Supply: {crypto.circulating_supply.toLocaleString()}</div>
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
              <CardTitle>Volatility Comparison</CardTitle>
              <CardDescription>Comparing price volatility between assets</CardDescription>
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
                  Volatility Analysis
                </h4>
                <p className="text-sm text-blue-700">
                  USDT maintains minimal price volatility (±0.5%) even during market turbulence, 
                  making it an excellent choice for preserving value during uncertain conditions.
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
                  <CardTitle>Market News</CardTitle>
                  <CardDescription>Latest updates affecting the crypto market</CardDescription>
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
                  <Button variant="outline" className="w-full" size="sm">Load more news</Button>
                </CardFooter>
              </Card>
            </div>
            
            <div>
              <Card>
                <CardHeader>
                  <CardTitle>Quick Market Suggestions</CardTitle>
                  <CardDescription>Personalized recommendations based on current market conditions</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-3 bg-amber-50 border border-amber-100 rounded-lg">
                      <h4 className="font-medium text-amber-800 mb-1">BTC Volatility Strategy</h4>
                      <p className="text-sm text-amber-700">
                        With BTC {cryptoData[0]?.price_change_percentage_24h < 0 ? 'down' : 'up'} {cryptoData[0]?.price_change_percentage_24h ? Math.abs(cryptoData[0]?.price_change_percentage_24h).toFixed(1) : '5.2'}%, consider moving 20% of your BTC to USDT until the market stabilizes.
                      </p>
                      <Button size="sm" variant="outline" className="mt-2 w-full border-amber-200 text-amber-700">Review Strategy</Button>
                    </div>
                    
                    <div className="p-3 bg-green-50 border border-green-100 rounded-lg">
                      <h4 className="font-medium text-green-800 mb-1">Staking Opportunity</h4>
                      <p className="text-sm text-green-700">
                        Current USDT staking rates are at yearly highs. Consider staking idle USDT for up to 5% APY.
                      </p>
                      <Button size="sm" variant="outline" className="mt-2 w-full border-green-200 text-green-700">Explore Staking</Button>
                    </div>
                    
                    <div className="p-3 bg-blue-50 border border-blue-100 rounded-lg">
                      <h4 className="font-medium text-blue-800 mb-1">DCA Opportunity</h4>
                      <p className="text-sm text-blue-700">
                        With prices {cryptoData[0]?.price_change_percentage_24h < 0 ? 'down' : 'changing'}, it's a good time to implement a Dollar-Cost Averaging strategy using small USDT amounts.
                      </p>
                      <Button size="sm" variant="outline" className="mt-2 w-full border-blue-200 text-blue-700">Start DCA</Button>
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
