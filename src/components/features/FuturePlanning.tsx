
import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend
} from 'recharts';

const FuturePlanning = () => {
  const [monthlySavings, setMonthlySavings] = useState<number>(50);
  const [years, setYears] = useState<number>(10);
  const [interestRate, setInterestRate] = useState<number>(2);
  const [results, setResults] = useState<any>(null);

  const calculateFuture = () => {
    const monthlyRate = interestRate / 100 / 12;
    const months = years * 12;
    
    let futureValue = 0;
    let simpleTotal = monthlySavings * months;
    let chartData = [];
    
    for (let i = 1; i <= months; i++) {
      futureValue = (futureValue + monthlySavings) * (1 + monthlyRate);
      
      if (i % 12 === 0) {
        chartData.push({
          year: i / 12,
          compound: Math.round(futureValue),
          simple: monthlySavings * i
        });
      }
    }
    
    setResults({
      futureValue: Math.round(futureValue),
      simpleTotal,
      interestEarned: Math.round(futureValue - simpleTotal),
      chartData
    });
  };

  const formatEuro = (value: number) => `€${value.toLocaleString('it-IT')}`;

  return (
    <div className="feature-card h-full flex flex-col">
      <h3 className="text-xl font-semibold mb-4 text-remida-teal">Pianificazione Futura</h3>
      
      <div className="grid grid-cols-1 gap-6">
        <div className="space-y-6">
          <div>
            <div className="flex justify-between mb-2">
              <Label htmlFor="monthlySavings">Risparmio Mensile</Label>
              <span className="font-semibold">€{monthlySavings}</span>
            </div>
            <Slider
              id="monthlySavings"
              min={10}
              max={500}
              step={10}
              value={[monthlySavings]}
              onValueChange={(value) => setMonthlySavings(value[0])}
              className="my-4"
            />
          </div>
          
          <div>
            <div className="flex justify-between mb-2">
              <Label htmlFor="years">Periodo (anni)</Label>
              <span className="font-semibold">{years} anni</span>
            </div>
            <Slider
              id="years"
              min={1}
              max={30}
              step={1}
              value={[years]}
              onValueChange={(value) => setYears(value[0])}
              className="my-4"
            />
          </div>
          
          <div>
            <div className="flex justify-between mb-2">
              <Label htmlFor="interestRate">Tasso d'interesse (%)</Label>
              <span className="font-semibold">{interestRate}%</span>
            </div>
            <Slider
              id="interestRate"
              min={0}
              max={10}
              step={0.1}
              value={[interestRate]}
              onValueChange={(value) => setInterestRate(value[0])}
              className="my-4"
            />
          </div>
          
          <Button 
            onClick={calculateFuture}
            className="w-full bg-remida-teal hover:bg-remida-teal/90"
          >
            Calcola Piano di Risparmio
          </Button>
        </div>
        
        {results && (
          <div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="bg-gray-100 p-4 rounded-lg text-center">
                <p className="text-sm text-gray-500">Risparmi Totali</p>
                <p className="text-xl font-bold">{formatEuro(results.futureValue)}</p>
              </div>
              <div className="bg-gray-100 p-4 rounded-lg text-center">
                <p className="text-sm text-gray-500">Capitale Investito</p>
                <p className="text-xl font-bold">{formatEuro(results.simpleTotal)}</p>
              </div>
              <div className="bg-gray-100 p-4 rounded-lg text-center">
                <p className="text-sm text-gray-500">Interessi Guadagnati</p>
                <p className="text-xl font-bold">{formatEuro(results.interestEarned)}</p>
              </div>
            </div>
            
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={results.chartData}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis 
                    dataKey="year" 
                    label={{ value: 'Anni', position: 'insideBottom', offset: -5 }} 
                  />
                  <YAxis 
                    tickFormatter={formatEuro} 
                    label={{ value: 'Valore (€)', angle: -90, position: 'insideLeft' }} 
                  />
                  <Tooltip formatter={(value) => formatEuro(Number(value))} />
                  <Legend />
                  <Line 
                    type="monotone" 
                    dataKey="compound" 
                    name="Con Interessi" 
                    stroke="#008080" 
                    strokeWidth={2} 
                    dot={{ r: 3 }} 
                  />
                  <Line 
                    type="monotone" 
                    dataKey="simple" 
                    name="Senza Interessi" 
                    stroke="#999999" 
                    strokeWidth={2}
                    strokeDasharray="5 5" 
                    dot={{ r: 3 }} 
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FuturePlanning;
