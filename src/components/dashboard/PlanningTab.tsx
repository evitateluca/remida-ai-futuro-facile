import { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer } from 'recharts';
import { toast } from '@/hooks/use-toast';
import Shield from '@/components/icons/Shield';
import { BitcoinIcon, TrendingUp } from 'lucide-react';

interface PlanningTabProps {
  objectives: any[];
  savingsProjection: any[];
  simulationInputs: any;
  setSimulationInputs: (inputs: any) => void;
  simulationResults: any;
}

const PlanningTab = ({ 
  objectives, 
  savingsProjection, 
  simulationInputs,
  setSimulationInputs,
  simulationResults
}: PlanningTabProps) => {
  const [selectedGoal, setSelectedGoal] = useState(null);

  const handleViewGoalDetails = (goal: any) => {
    setSelectedGoal(goal);
  };

  const handleAddObjective = () => {
    if (!simulationInputs.goalName || !simulationInputs.targetAmount) {
      toast({
        title: "Informazioni mancanti",
        description: "Per favore, inserisci nome e importo obiettivo.",
        variant: "destructive"
      });
      return;
    }

    const newObjective = {
      id: objectives.length + 1,
      name: simulationInputs.goalName,
      current: 0,
      target: simulationInputs.targetAmount,
      percentage: 0,
      timeframe: `${simulationInputs.timeframe} mesi`,
      strategy: simulationInputs.strategy === 'safe' ? 'Stablecoin staking' : 
                simulationInputs.strategy === 'mixed' ? 'Stablecoin + BTC/ETH' : 'Crypto diversificata',
      monthlyContribution: simulationInputs.monthlyContribution
    };
    
    objectives.push(newObjective);
    
    toast({
      title: "Obiettivo creato",
      description: `L'obiettivo "${simulationInputs.goalName}" è stato creato con successo!`,
    });
    
    // Clear the simulation form
    setSimulationInputs({
      goalName: "",
      targetAmount: 5000,
      timeframe: 6,
      monthlyContribution: 500,
      strategy: "mixed",
      expectedReturn: 0.05,
    });
  };
  
  const handleSetStrategy = (strategy: string) => {
    setSimulationInputs(prev => ({
      ...prev,
      strategy
    }));
  };
  
  const handleSetTimeframe = (months: number) => {
    setSimulationInputs(prev => ({
      ...prev,
      timeframe: months
    }));
  };

  return (
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
                      <RechartsTooltip />
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
                  value={simulationInputs.goalName}
                  onChange={e => setSimulationInputs({...simulationInputs, goalName: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Importo Target (€)</label>
                <Input 
                  placeholder="es. 5000" 
                  type="number" 
                  value={simulationInputs.targetAmount}
                  onChange={e => setSimulationInputs({...simulationInputs, targetAmount: parseInt(e.target.value) || 0})}
                />
              </div>
            </div>
            
            <div className="mb-6">
              <label className="block text-sm font-medium mb-2">Timeframe</label>
              <div className="grid grid-cols-3 gap-2">
                <Button 
                  variant={simulationInputs.timeframe === 3 ? "default" : "outline"}
                  onClick={() => handleSetTimeframe(3)}
                >3 mesi</Button>
                <Button 
                  variant={simulationInputs.timeframe === 6 ? "default" : "outline"}
                  onClick={() => handleSetTimeframe(6)}
                >6 mesi</Button>
                <Button 
                  variant={simulationInputs.timeframe === 12 ? "default" : "outline"}
                  onClick={() => handleSetTimeframe(12)}
                >1 anno</Button>
                <Button 
                  variant={simulationInputs.timeframe === 24 ? "default" : "outline"}
                  onClick={() => handleSetTimeframe(24)}
                >2 anni</Button>
                <Button 
                  variant={simulationInputs.timeframe === 60 ? "default" : "outline"}
                  onClick={() => handleSetTimeframe(60)}
                >5 anni</Button>
                <Button 
                  variant={![3,6,12,24,60].includes(simulationInputs.timeframe) ? "default" : "outline"}
                  onClick={() => {
                    const input = window.prompt("Inserisci il numero di mesi:", "12");
                    if (input) {
                      const months = parseInt(input);
                      if (!isNaN(months) && months > 0) {
                        handleSetTimeframe(months);
                      }
                    }
                  }}
                >Personalizzato</Button>
              </div>
            </div>
            
            <div className="mb-6">
              <label className="block text-sm font-medium mb-2">Strategia di Risparmio</label>
              <div className="grid grid-cols-3 gap-3">
                <div 
                  className={`border p-4 rounded-md cursor-pointer hover:bg-gray-50 transition-colors ${
                    simulationInputs.strategy === 'safe' ? 'border-remida-teal bg-remida-teal/5' : ''
                  }`}
                  onClick={() => handleSetStrategy('safe')}
                >
                  <div className="flex items-center mb-2">
                    <Shield className="h-5 w-5 mr-2 text-blue-500" />
                    <h4 className="font-medium">Sicuro</h4>
                  </div>
                  <p className="text-sm text-gray-500">Stablecoin USDT/USDC in staking (3-4%)</p>
                </div>
                
                <div 
                  className={`border p-4 rounded-md cursor-pointer hover:bg-gray-50 transition-colors ${
                    simulationInputs.strategy === 'mixed' ? 'border-remida-teal bg-remida-teal/5' : ''
                  }`}
                  onClick={() => handleSetStrategy('mixed')}
                >
                  <div className="flex items-center mb-2">
                    <BitcoinIcon className="h-5 w-5 mr-2 text-orange-500" />
                    <h4 className="font-medium">Misto</h4>
                  </div>
                  <p className="text-sm text-gray-500">70% USDT staking + 30% BTC/ETH (5-6%)</p>
                </div>
                
                <div 
                  className={`border p-4 rounded-md cursor-pointer hover:bg-gray-50 transition-colors ${
                    simulationInputs.strategy === 'aggressive' ? 'border-remida-teal bg-remida-teal/5' : ''
                  }`}
                  onClick={() => handleSetStrategy('aggressive')}
                >
                  <div className="flex items-center mb-2">
                    <TrendingUp className="h-5 w-5 mr-2 text-green-500" />
                    <h4 className="font-medium">Aggressivo</h4>
                  </div>
                  <p className="text-sm text-gray-500">50% crypto blue chip, 50% altcoin (8%+)</p>
                </div>
              </div>
            </div>
            
            <div className="mb-6 pt-4 border-t">
              <h3 className="text-lg font-medium mb-3">Risultati Simulazione</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div className="p-4 bg-gray-50 rounded-md">
                  <h4 className="text-sm font-medium mb-1">Contributo Mensile</h4>
                  <p className="text-2xl font-bold text-remida-teal">€{simulationResults.monthlyContribution}</p>
                </div>
                <div className="p-4 bg-gray-50 rounded-md">
                  <h4 className="text-sm font-medium mb-1">Rendimento Stimato</h4>
                  <p className="text-2xl font-bold text-green-600">+€{simulationResults.totalReturns}</p>
                </div>
                <div className="p-4 bg-gray-50 rounded-md">
                  <h4 className="text-sm font-medium mb-1">Totale Finale</h4>
                  <p className="text-2xl font-bold">€{simulationResults.finalAmount}</p>
                </div>
              </div>
              
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={[
                      { month: "Contributi", amount: simulationResults.totalContributions },
                      { month: "Rendimenti", amount: simulationResults.totalReturns },
                      { month: "Totale", amount: simulationResults.finalAmount }
                    ]}
                    margin={{ top: 5, right: 20, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <RechartsTooltip formatter={(value) => `€${value}`} />
                    <Bar dataKey="amount" fill="#3b82f6" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col items-stretch">
            <Button 
              className="bg-remida-teal hover:bg-remida-teal/90 w-full"
              onClick={handleAddObjective}
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
  );
};

export default PlanningTab;
