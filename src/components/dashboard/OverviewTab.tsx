
import { useState } from 'react';
import { ArrowUpRight, BarChart3, CircleDollarSign, Wallet, ArrowRight, Target } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer } from 'recharts';

interface OverviewTabProps {
  totalPortfolioValue: number;
  portfolioData: any[];
  objectives: any[];
  monthlyData: any[];
  moneyDials: any[];
  onShowIntegrationManager: () => void;
}

const OverviewTab = ({ 
  totalPortfolioValue, 
  portfolioData, 
  objectives,
  monthlyData,
  moneyDials,
  onShowIntegrationManager
}: OverviewTabProps) => {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {/* Total Portfolio */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-semibold flex items-center">
              <Wallet className="mr-2 h-5 w-5 text-remida-teal" /> Patrimonio Totale
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-remida-teal">
              €{totalPortfolioValue > 0 ? totalPortfolioValue.toLocaleString() : "0"}
            </div>
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
              <Wallet className="mr-2 h-5 w-5 text-remida-teal" /> Portafoglio Crypto
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-remida-teal">
              €{portfolioData.filter(a => a.name.includes('Bitcoin') || a.name.includes('Ethereum') || 
                a.name.includes('USDT') || a.name.includes('USDC'))
                .reduce((sum, asset) => sum + asset.value, 0).toLocaleString()}
            </div>
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
              onClick={onShowIntegrationManager}
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
            <div className="text-2xl font-bold text-remida-orange">{objectives.length} Attivi</div>
            <p className="text-sm text-gray-600">50% completati in media</p>
            <Progress value={50} className="h-2 mt-2" />
          </CardContent>
          <CardFooter className="pt-0">
            <Button 
              variant="outline" 
              size="sm" 
              className="text-remida-orange"
              onClick={() => {
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
                  <RechartsTooltip />
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
                  <RechartsTooltip formatter={(value) => `€${value}`} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default OverviewTab;
