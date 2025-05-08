
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BitcoinIcon, AlertTriangle, TrendingDown, TrendingUp, ExternalLink, BarChart3 } from 'lucide-react';
import { AreaChart, Area, LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer } from 'recharts';

// Define crypto price data
const cryptoData = [
  {
    name: 'Bitcoin',
    symbol: 'BTC',
    price: 29764,
    change: -5.2,
    marketCap: '580B',
    volume: '32B',
    supply: '19.4M',
    chart: [
      { time: '1D', price: 31000 },
      { time: '2D', price: 30500 },
      { time: '3D', price: 30800 },
      { time: '4D', price: 30200 },
      { time: '5D', price: 29500 },
      { time: '6D', price: 29800 },
      { time: '7D', price: 29764 },
    ]
  },
  {
    name: 'Ethereum',
    symbol: 'ETH',
    price: 1845,
    change: -3.8,
    marketCap: '225B',
    volume: '18B',
    supply: '120.5M',
    chart: [
      { time: '1D', price: 1920 },
      { time: '2D', price: 1890 },
      { time: '3D', price: 1870 },
      { time: '4D', price: 1835 },
      { time: '5D', price: 1820 },
      { time: '6D', price: 1855 },
      { time: '7D', price: 1845 },
    ]
  },
  {
    name: 'Tether',
    symbol: 'USDT',
    price: 1.00,
    change: 0.01,
    marketCap: '83B',
    volume: '42B',
    supply: '83B',
    chart: [
      { time: '1D', price: 1.0 },
      { time: '2D', price: 0.999 },
      { time: '3D', price: 1.001 },
      { time: '4D', price: 0.998 },
      { time: '5D', price: 1.002 },
      { time: '6D', price: 0.999 },
      { time: '7D', price: 1.0 },
    ]
  },
  {
    name: 'BNB',
    symbol: 'BNB',
    price: 245,
    change: -2.4,
    marketCap: '38B',
    volume: '1.5B',
    supply: '153M',
    chart: [
      { time: '1D', price: 252 },
      { time: '2D', price: 249 },
      { time: '3D', price: 251 },
      { time: '4D', price: 247 },
      { time: '5D', price: 243 },
      { time: '6D', price: 246 },
      { time: '7D', price: 245 },
    ]
  }
];

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

const volatilityData = [
  { date: 'May 1', BTC: 18, ETH: 12, USDT: 0.5 },
  { date: 'May 2', BTC: 22, ETH: 15, USDT: 0.3 },
  { date: 'May 3', BTC: 16, ETH: 10, USDT: 0.4 },
  { date: 'May 4', BTC: 25, ETH: 18, USDT: 0.2 },
  { date: 'May 5', BTC: 12, ETH: 8, USDT: 0.5 },
  { date: 'May 6', BTC: 20, ETH: 14, USDT: 0.3 },
  { date: 'May 7', BTC: 15, ETH: 10, USDT: 0.4 },
];

const MarketTab = () => {
  const [selectedTimeframe, setSelectedTimeframe] = useState('24h');
  const [selectedTab, setSelectedTab] = useState('prices');

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold flex items-center gap-2">
        <BitcoinIcon className="h-6 w-6" />
        Crypto Market
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">BTC/USD</CardTitle>
            <CardDescription>Bitcoin</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${cryptoData[0].price.toLocaleString()}</div>
            <div className={`flex items-center ${cryptoData[0].change < 0 ? 'text-red-500' : 'text-green-500'}`}>
              {cryptoData[0].change < 0 ? <TrendingDown className="h-4 w-4 mr-1" /> : <TrendingUp className="h-4 w-4 mr-1" />}
              <span>{cryptoData[0].change}%</span>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">ETH/USD</CardTitle>
            <CardDescription>Ethereum</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${cryptoData[1].price.toLocaleString()}</div>
            <div className={`flex items-center ${cryptoData[1].change < 0 ? 'text-red-500' : 'text-green-500'}`}>
              {cryptoData[1].change < 0 ? <TrendingDown className="h-4 w-4 mr-1" /> : <TrendingUp className="h-4 w-4 mr-1" />}
              <span>{cryptoData[1].change}%</span>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">USDT/USD</CardTitle>
            <CardDescription>Tether</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${cryptoData[2].price.toLocaleString()}</div>
            <div className={`flex items-center ${cryptoData[2].change < 0 ? 'text-red-500' : 'text-green-500'}`}>
              {cryptoData[2].change < 0 ? <TrendingDown className="h-4 w-4 mr-1" /> : <TrendingUp className="h-4 w-4 mr-1" />}
              <span>{cryptoData[2].change}%</span>
            </div>
          </CardContent>
        </Card>
        
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
                  {cryptoData.map((crypto, index) => (
                    <div key={index} className="p-4 border rounded-lg">
                      <div className="flex justify-between items-center mb-2">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                            {crypto.symbol.charAt(0)}
                          </div>
                          <div>
                            <div className="font-medium">{crypto.name}</div>
                            <div className="text-sm text-muted-foreground">{crypto.symbol}</div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-bold">${crypto.price.toLocaleString()}</div>
                          <div className={`text-sm ${crypto.change < 0 ? 'text-red-500' : 'text-green-500'}`}>
                            {crypto.change < 0 ? <TrendingDown className="inline h-3 w-3 mr-1" /> : <TrendingUp className="inline h-3 w-3 mr-1" />}
                            {crypto.change}%
                          </div>
                        </div>
                      </div>
                      <div className="h-16">
                        <ResponsiveContainer width="100%" height="100%">
                          <LineChart data={crypto.chart}>
                            <Line 
                              type="monotone" 
                              dataKey="price" 
                              stroke={crypto.change < 0 ? '#ef4444' : '#10b981'} 
                              dot={false} 
                              strokeWidth={2}
                            />
                          </LineChart>
                        </ResponsiveContainer>
                      </div>
                      <div className="grid grid-cols-3 gap-2 mt-2 text-xs text-muted-foreground">
                        <div>Market Cap: ${crypto.marketCap}</div>
                        <div>24h Vol: ${crypto.volume}</div>
                        <div>Supply: {crypto.supply}</div>
                      </div>
                    </div>
                  ))}
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
                        With BTC down 5.2%, consider moving 20% of your BTC to USDT until the market stabilizes.
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
                        With prices down, it's a good time to implement a Dollar-Cost Averaging strategy using small USDT amounts.
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
