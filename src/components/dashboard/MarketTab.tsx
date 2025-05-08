import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, Legend } from 'recharts';
import { BitcoinIcon, ArrowUpRight, ArrowDownRight, Info, RefreshCw, ExternalLink } from 'lucide-react';

interface CryptoPrice {
  symbol: string;
  name: string;
  price: number;
  change24h: number;
  marketCap: number;
  volume24h: number;
  currentPrice?: number; // For real-time updates
}

interface NewsItem {
  id: string;
  title: string;
  summary: string;
  source: string;
  date: Date;
  url: string;
}

// Simulated market data for demonstration purposes
const sampleMarketData = [
  { id: 'btc', symbol: 'BTC', name: 'Bitcoin', price: 30000, change24h: -5, marketCap: 580000000000, volume24h: 25000000000 },
  { id: 'eth', symbol: 'ETH', name: 'Ethereum', price: 1800, change24h: -3, marketCap: 216000000000, volume24h: 12000000000 },
  { id: 'usdt', symbol: 'USDT', name: 'Tether', price: 1, change24h: 0, marketCap: 83000000000, volume24h: 40000000000 },
  { id: 'bnb', symbol: 'BNB', name: 'Binance Coin', price: 220, change24h: -2, marketCap: 35000000000, volume24h: 1500000000 },
  { id: 'usdc', symbol: 'USDC', name: 'USD Coin', price: 1, change24h: 0.03, marketCap: 28000000000, volume24h: 3000000000 },
  { id: 'xrp', symbol: 'XRP', name: 'XRP', price: 0.5, change24h: -1.2, marketCap: 25000000000, volume24h: 1200000000 },
];

// Sample price history data for charts
const generateHistoricalData = (basePrice: number, volatility: number) => {
  const data = [];
  let currentPrice = basePrice;
  
  // Generate 24 hourly data points
  for (let i = 24; i >= 0; i--) {
    const time = new Date();
    time.setHours(time.getHours() - i);
    
    // More volatile for non-stablecoins
    const change = (Math.random() - 0.5) * volatility * basePrice;
    currentPrice = Math.max(currentPrice + change, basePrice * 0.7);
    
    data.push({
      time: time.toLocaleTimeString('en-US', { hour: '2-digit', hour12: false }),
      price: currentPrice
    });
  }
  
  return data;
};

// Sample news data
const sampleNewsItems: NewsItem[] = [
  {
    id: '1',
    title: 'New EU stablecoin regulation: USDT remains a reliable choice for stability',
    summary: 'The European Union has approved new regulations for stablecoins, with Tether (USDT) meeting all requirements.',
    source: 'CryptoNews',
    date: new Date(2024, 4, 8),
    url: '#'
  },
  {
    id: '2',
    title: 'Bitcoin volatility increases as markets react to economic data',
    summary: 'Bitcoin prices saw significant swings this week following the release of inflation data.',
    source: 'CoinDesk',
    date: new Date(2024, 4, 7),
    url: '#'
  },
  {
    id: '3',
    title: 'Stablecoins gain popularity as crypto market uncertainty grows',
    summary: 'Investors are increasingly turning to stablecoins like USDT as a safe haven during market turbulence.',
    source: 'Bloomberg Crypto',
    date: new Date(2024, 4, 6),
    url: '#'
  },
];

const MarketTab = () => {
  const [cryptos, setCryptos] = useState<CryptoPrice[]>(sampleMarketData);
  const [selectedCrypto, setSelectedCrypto] = useState('btc');
  const [newsItems] = useState<NewsItem[]>(sampleNewsItems);
  const [chartTimeframe, setChartTimeframe] = useState<'24h' | '7d' | '30d' | '1y'>('24h');
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());
  
  // Generate historical data for each crypto
  const historicalData = {
    btc: generateHistoricalData(30000, 0.03),
    eth: generateHistoricalData(1800, 0.025),
    usdt: generateHistoricalData(1, 0.0001),
    bnb: generateHistoricalData(220, 0.02),
    usdc: generateHistoricalData(1, 0.0001),
    xrp: generateHistoricalData(0.5, 0.015),
  };
  
  // Simulate real-time price updates
  useEffect(() => {
    const interval = setInterval(() => {
      setCryptos(prev => prev.map(crypto => {
        let change = 0;
        if (crypto.symbol === 'USDT' || crypto.symbol === 'USDC') {
          // Stablecoins barely move
          change = (Math.random() - 0.5) * 0.001;
        } else {
          // Other cryptos are more volatile
          change = (Math.random() - 0.5) * 0.01;
        }
        
        const newPrice = crypto.price * (1 + change);
        return {
          ...crypto,
          currentPrice: parseFloat(newPrice.toFixed(2)),
          change24h: parseFloat((crypto.change24h + change * 100).toFixed(2))
        };
      }));
      
      setLastUpdated(new Date());
    }, 5000);
    
    return () => clearInterval(interval);
  }, []);

  // Get the selected crypto details
  const selectedCryptoData = cryptos.find(c => c.id === selectedCrypto);
  
  // Check if the market is particularly volatile
  const isMarketVolatile = cryptos.some(c => c.symbol !== 'USDT' && c.symbol !== 'USDC' && Math.abs(c.change24h) > 4);

  // Format large numbers
  const formatNumber = (num: number, digits = 0) => {
    if (num >= 1e12) return (num / 1e12).toFixed(digits) + 'T';
    if (num >= 1e9) return (num / 1e9).toFixed(digits) + 'B';
    if (num >= 1e6) return (num / 1e6).toFixed(digits) + 'M';
    if (num >= 1e3) return (num / 1e3).toFixed(digits) + 'K';
    return num.toFixed(digits);
  };
  
  // Handle refresh button click
  const handleRefresh = () => {
    // In a real app, this would fetch fresh data
    setLastUpdated(new Date());
  };
  
  // Format price based on value
  const formatPrice = (price: number) => {
    if (price < 0.01) return price.toFixed(6);
    if (price < 1) return price.toFixed(4);
    if (price < 10) return price.toFixed(2);
    return price.toFixed(0);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold flex items-center gap-2">
          <BitcoinIcon className="h-6 w-6" />
          Crypto Market
        </h2>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <span>Last updated: {lastUpdated.toLocaleTimeString()}</span>
          <Button variant="ghost" size="icon" onClick={handleRefresh}>
            <RefreshCw className="h-4 w-4" />
          </Button>
        </div>
      </div>
      
      {isMarketVolatile && (
        <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg">
          <div className="flex gap-2 items-center">
            <Info className="h-5 w-5 text-yellow-500" />
            <h3 className="font-medium">Volatile market today!</h3>
          </div>
          <p className="mt-1 text-sm">
            BTC {cryptos.find(c => c.symbol === 'BTC')?.change24h}%. USDT is stable: consider moving part of your portfolio for safety.
          </p>
        </div>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {cryptos.map((crypto) => (
          <Card 
            key={crypto.id} 
            className={`cursor-pointer transition-all ${selectedCrypto === crypto.id ? 'border-2 border-primary' : ''}`}
            onClick={() => setSelectedCrypto(crypto.id)}
          >
            <CardContent className="pt-6">
              <div className="flex justify-between items-center mb-2">
                <div className="font-bold">{crypto.symbol}</div>
                <div className={`text-xs px-1.5 py-0.5 rounded-full flex items-center ${
                  crypto.change24h > 0 ? 'text-green-700 bg-green-100' : 
                  crypto.change24h < 0 ? 'text-red-700 bg-red-100' : 
                  'text-gray-700 bg-gray-100'
                }`}>
                  {crypto.change24h > 0 ? (
                    <ArrowUpRight className="h-3 w-3 mr-0.5" />
                  ) : crypto.change24h < 0 ? (
                    <ArrowDownRight className="h-3 w-3 mr-0.5" />
                  ) : null}
                  {Math.abs(crypto.change24h)}%
                </div>
              </div>
              <div className="text-2xl font-bold">
                €{formatPrice(crypto.currentPrice || crypto.price)}
              </div>
              <div className="text-xs text-muted-foreground mt-1">{crypto.name}</div>
            </CardContent>
          </Card>
        ))}
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="col-span-2">
          <CardHeader>
            <div className="flex justify-between">
              <div>
                <CardTitle>
                  {selectedCryptoData?.name} ({selectedCryptoData?.symbol}) Price Chart
                </CardTitle>
                <CardDescription>
                  Real-time price data for the last {chartTimeframe}
                </CardDescription>
              </div>
              <div>
                <Tabs value={chartTimeframe} onValueChange={(v) => setChartTimeframe(v as any)}>
                  <TabsList className="grid w-full grid-cols-4">
                    <TabsTrigger value="24h">24H</TabsTrigger>
                    <TabsTrigger value="7d">7D</TabsTrigger>
                    <TabsTrigger value="30d">30D</TabsTrigger>
                    <TabsTrigger value="1y">1Y</TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>
            </div>
          </CardHeader>
          <CardContent className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart 
                data={historicalData[selectedCrypto as keyof typeof historicalData]}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <defs>
                  <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#8884d8" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="time" />
                <YAxis
                  domain={selectedCryptoData?.symbol === 'USDT' || selectedCryptoData?.symbol === 'USDC' 
                    ? [0.99, 1.01] 
                    : ['auto', 'auto']}
                />
                <RechartsTooltip />
                <Area 
                  type="monotone" 
                  dataKey="price" 
                  stroke="#8884d8" 
                  fillOpacity={1} 
                  fill="url(#colorPrice)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
          <CardFooter>
            {selectedCryptoData?.symbol === 'USDT' ? (
              <div className="text-sm">
                <span className="font-medium">USDT</span> remains stable at €1.00 while other cryptocurrencies fluctuate. 
                This stability makes it ideal for preserving value during market volatility.
              </div>
            ) : (
              <div className="text-sm">
                <span className="font-medium">{selectedCryptoData?.name}</span> has shown 
                {selectedCryptoData?.change24h && selectedCryptoData?.change24h > 0 ? ' positive' : ' negative'} 
                movement today. {selectedCryptoData?.change24h && Math.abs(selectedCryptoData?.change24h) > 3 
                  ? 'Consider using USDT as a safe haven during this volatility.' 
                  : ''}
              </div>
            )}
          </CardFooter>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Market News</CardTitle>
            <CardDescription>Latest updates affecting the crypto market</CardHeader>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {newsItems.map((item) => (
                <div key={item.id} className="border-b border-gray-200 last:border-b-0 pb-4 last:pb-0">
                  <h3 className="font-medium hover:text-primary">
                    <a href={item.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1">
                      {item.title}
                      <ExternalLink className="h-3 w-3" />
                    </a>
                  </h3>
                  <p className="text-sm text-muted-foreground mt-1">{item.summary}</p>
                  <div className="flex justify-between mt-2 text-xs text-muted-foreground">
                    <span>{item.source}</span>
                    <span>{item.date.toLocaleDateString()}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full">
              View All News
            </Button>
          </CardFooter>
        </Card>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Quick Market Suggestions</CardTitle>
          <CardDescription>Personalized recommendations based on current market conditions</CardHeader>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="bg-muted/50 p-4 rounded-lg">
              <h3 className="font-medium mb-2">Safe Haven Strategy</h3>
              <p className="text-sm">Market volatility is {isMarketVolatile ? 'high' : 'moderate'} today. Consider allocating 30% of your portfolio to USDT to protect against downside risk.</p>
              <Button variant="outline" size="sm" className="mt-3">Apply Strategy</Button>
            </div>
            
            <div className="bg-muted/50 p-4 rounded-lg">
              <h3 className="font-medium mb-2">DCA Opportunity</h3>
              <p className="text-sm">BTC is {cryptos.find(c => c.symbol === 'BTC')?.change24h}% today. This might be a good opportunity to continue your dollar-cost averaging strategy.</p>
              <Button variant="outline" size="sm" className="mt-3">Set up DCA</Button>
            </div>
            
            <div className="bg-muted/50 p-4 rounded-lg">
              <h3 className="font-medium mb-2">Staking Returns</h3>
              <p className="text-sm">Did you know? Your idle USDT can earn up to 5% APY through staking platforms like Crypto.com.</p>
              <Button variant="outline" size="sm" className="mt-3">Start Staking</Button>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Market Overview</CardTitle>
          <CardDescription>Detailed crypto asset information</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4 font-medium">Name</th>
                  <th className="text-right py-3 px-4 font-medium">Price</th>
                  <th className="text-right py-3 px-4 font-medium">24h Change</th>
                  <th className="text-right py-3 px-4 font-medium">Market Cap</th>
                  <th className="text-right py-3 px-4 font-medium">Volume (24h)</th>
                </tr>
              </thead>
              <tbody>
                {cryptos.map((crypto) => (
                  <tr 
                    key={crypto.id} 
                    className="border-b hover:bg-muted/50 cursor-pointer"
                    onClick={() => setSelectedCrypto(crypto.id)}
                  >
                    <td className="py-3 px-4">
                      <div className="font-medium">{crypto.name}</div>
                      <div className="text-xs text-muted-foreground">{crypto.symbol}</div>
                    </td>
                    <td className="text-right py-3 px-4 font-medium">
                      €{formatPrice(crypto.currentPrice || crypto.price)}
                    </td>
                    <td className={`text-right py-3 px-4 ${
                      crypto.change24h > 0 ? 'text-green-600' : 
                      crypto.change24h < 0 ? 'text-red-600' : ''
                    }`}>
                      <div className="flex items-center justify-end gap-1">
                        {crypto.change24h > 0 ? (
                          <ArrowUpRight className="h-3 w-3" />
                        ) : crypto.change24h < 0 ? (
                          <ArrowDownRight className="h-3 w-3" />
                        ) : null}
                        {crypto.change24h > 0 && '+'}
                        {crypto.change24h}%
                      </div>
                    </td>
                    <td className="text-right py-3 px-4">€{formatNumber(crypto.marketCap, 2)}</td>
                    <td className="text-right py-3 px-4">€{formatNumber(crypto.volume24h, 2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MarketTab;
