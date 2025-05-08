
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { CircleDollarSign, Wallet, TrendingUp, ExternalLink, AlertCircle } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer } from 'recharts';

interface StakingPlatform {
  name: string;
  apy: number;
  minStake: number;
  lockupPeriod: string;
  url: string;
}

interface StakingPosition {
  platform: string;
  amount: number;
  apy: number;
  startDate: Date;
  nextPayout: Date;
  totalEarned: number;
}

const UsdtWalletTab = () => {
  const [usdtBalance] = useState(3000);
  const [idleUsdt] = useState(1000);
  
  const [stakingPositions] = useState<StakingPosition[]>([
    {
      platform: 'Crypto.com',
      amount: 2000,
      apy: 5,
      startDate: new Date(2024, 0, 15),
      nextPayout: new Date(2025, 4, 15),
      totalEarned: 100
    }
  ]);
  
  const [stakingPlatforms] = useState<StakingPlatform[]>([
    {
      name: 'Crypto.com',
      apy: 5,
      minStake: 500,
      lockupPeriod: '3 mesi',
      url: 'https://crypto.com'
    },
    {
      name: 'Binance',
      apy: 4.5,
      minStake: 100,
      lockupPeriod: '30 giorni',
      url: 'https://binance.com'
    },
    {
      name: 'Coinbase',
      apy: 6,
      minStake: 1000,
      lockupPeriod: '6 mesi',
      url: 'https://coinbase.com'
    }
  ]);

  const monthlyEarningsData = [
    { month: 'Gen', earnings: 8.33 },
    { month: 'Feb', earnings: 8.33 },
    { month: 'Mar', earnings: 8.33 },
    { month: 'Apr', earnings: 8.33 },
    { month: 'Mag', earnings: 8.33 },
    { month: 'Giu', earnings: 8.33 },
    { month: 'Lug', earnings: 8.33 },
    { month: 'Ago', earnings: 8.33 },
    { month: 'Set', earnings: 8.33 },
    { month: 'Ott', earnings: 8.33 },
    { month: 'Nov', earnings: 8.33 },
    { month: 'Dic', earnings: 8.33 },
  ];

  const totalStaked = stakingPositions.reduce((sum, pos) => sum + pos.amount, 0);
  const totalMonthlyEarnings = stakingPositions.reduce((sum, pos) => sum + (pos.amount * (pos.apy / 100) / 12), 0);
  const totalAnnualEarnings = totalMonthlyEarnings * 12;
  
  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold flex items-center gap-2">
        <CircleDollarSign className="h-6 w-6" />
        Portafoglio USDT & Staking
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Saldo totale USDT</CardTitle>
            <CardDescription>Tutti gli USDT nel tuo wallet</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{usdtBalance.toLocaleString()}€</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Totale in staking</CardTitle>
            <CardDescription>Posizioni di USDT in staking</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{totalStaked.toLocaleString()}€</div>
            <Progress 
              value={(totalStaked / usdtBalance) * 100} 
              className="h-2 mt-2" 
            />
            <p className="text-sm text-muted-foreground mt-2">
              {((totalStaked / usdtBalance) * 100).toFixed(0)}% dei tuoi USDT sono in staking
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Guadagni annuali</CardTitle>
            <CardDescription>Interesse annuo previsto</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-500">{totalAnnualEarnings.toFixed(2)}€</div>
            <p className="text-sm text-muted-foreground mt-2">
              {(totalAnnualEarnings / totalStaked * 100).toFixed(2)}% media APY
            </p>
          </CardContent>
        </Card>
      </div>

      {idleUsdt > 0 && (
        <Alert className="bg-yellow-50 text-yellow-800 border-yellow-300">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>USDT rilevati inattivi</AlertTitle>
          <AlertDescription>
            Hai {idleUsdt}€ inattivi in USDT. Mettili in staking su Binance per guadagnare fino al 4,5% all'anno!
            <Button variant="outline" size="sm" className="ml-2 mt-2 bg-white">
              Inizia lo Staking
            </Button>
          </AlertDescription>
        </Alert>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Posizioni di staking</CardTitle>
          <CardDescription>Le tue posizioni di staking USDT attive</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {stakingPositions.map((position, index) => (
              <Card key={index} className="bg-muted/50">
                <CardHeader className="pb-2">
                  <div className="flex justify-between">
                    <CardTitle>{position.platform}</CardTitle>
                    <Badge variant="default">{position.apy}% APY</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-between mb-2">
                    <span className="text-muted-foreground">Quantità in staking:</span>
                    <span className="font-medium">{position.amount.toLocaleString()}€</span>
                  </div>
                  <div className="flex justify-between mb-2">
                    <span className="text-muted-foreground">Totale guadagnato:</span>
                    <span className="font-medium text-green-500">{position.totalEarned.toLocaleString()}€</span>
                  </div>
                  <div className="flex justify-between mb-2">
                    <span className="text-muted-foreground">Data di inizio:</span>
                    <span className="font-medium">{position.startDate.toLocaleDateString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Prossimo payout:</span>
                    <span className="font-medium">{position.nextPayout.toLocaleDateString()}</span>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-end gap-2">
                  <Button variant="outline" size="sm">Preleva</Button>
                  <Button variant="outline" size="sm">Aggiungi fondi</Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Guadagni mensili</CardTitle>
            <CardDescription>Il tuo interesse da staking USDT nel tempo</CardDescription>
          </CardHeader>
          <CardContent className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={monthlyEarningsData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <RechartsTooltip />
                <Line 
                  type="monotone" 
                  dataKey="earnings" 
                  stroke="#10B981" 
                  strokeWidth={2}
                  name="Interest (€)" 
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Confronto delle piattaforme di staking</CardTitle>
            <CardDescription>Confronta i tassi APY tra le piattaforme</CardDescription>
          </CardHeader>
          <CardContent className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={stakingPlatforms.map(p => ({ name: p.name, apy: p.apy }))}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <RechartsTooltip />
                <Bar 
                  dataKey="apy" 
                  fill="#8884d8" 
                  name="APY (%)" 
                />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
          <CardFooter>
            <div className="space-y-4 w-full">
              <h4 className="text-sm font-medium">Dettaglio piattaforma</h4>
              <div className="grid grid-cols-1 gap-4">
                {stakingPlatforms.map((platform, index) => (
                  <div key={index} className="flex justify-between items-center">
                    <div>
                      <div className="font-medium">{platform.name}</div>
                      <div className="text-sm text-muted-foreground">
                        Min: {platform.minStake}€ | Lock: {platform.lockupPeriod}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="text-lg font-medium">{platform.apy}%</div>
                      <Button variant="ghost" size="sm" asChild>
                        <a href={platform.url} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="h-4 w-4" />
                        </a>
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default UsdtWalletTab;
