
import { useState } from 'react';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';
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

const CryptoOption = () => {
  const [monthlySavings, setMonthlySavings] = useState<number>(50);
  const [years, setYears] = useState<number>(5);
  const [showComparison, setShowComparison] = useState<boolean>(false);
  const [results, setResults] = useState<any>(null);
  
  const calculateComparison = () => {
    // Simplified model for demonstration purposes
    // Euro savings with 2% interest
    const euroMonthlyRate = 0.02 / 12;
    // Crypto with highly volatile but overall higher returns (simplified)
    // This is a very simplified model just for demonstration
    const cryptoYearlyReturns = [
      0.8, 1.5, -0.3, 2.1, 0.4, 
      1.2, -0.5, 0.6, 1.8, 0.3
    ];
    
    const months = years * 12;
    let euroValue = 0;
    let cryptoValue = 0;
    let chartData = [];
    
    for (let i = 1; i <= months; i++) {
      // Euro calculation with compound interest
      euroValue = (euroValue + monthlySavings) * (1 + euroMonthlyRate);
      
      // Crypto calculation (simplified with month-to-month volatility)
      const monthIndex = (i - 1) % cryptoYearlyReturns.length;
      const yearlyReturn = cryptoYearlyReturns[monthIndex];
      const monthlyReturn = Math.pow(1 + yearlyReturn, 1/12) - 1;
      cryptoValue = (cryptoValue + monthlySavings) * (1 + monthlyReturn);
      
      if (i % 12 === 0) {
        chartData.push({
          year: i / 12,
          euro: Math.round(euroValue),
          crypto: Math.round(cryptoValue)
        });
      }
    }
    
    setResults({
      euroFinalValue: Math.round(euroValue),
      cryptoFinalValue: Math.round(cryptoValue),
      euroInterest: Math.round(euroValue - (monthlySavings * months)),
      cryptoGain: Math.round(cryptoValue - (monthlySavings * months)),
      chartData
    });
  };
  
  const formatEuro = (value: number) => `€${value.toLocaleString('it-IT')}`;

  return (
    <div className="feature-card h-full flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-semibold text-remida-teal">Opzione Crypto</h3>
        <div className="flex items-center space-x-2">
          <Switch
            id="crypto-toggle"
            checked={showComparison}
            onCheckedChange={setShowComparison}
          />
          <Label htmlFor="crypto-toggle">
            {showComparison ? 'Esplora opzione crypto' : 'Attiva crypto'}
          </Label>
        </div>
      </div>
      
      {showComparison && (
        <div className="space-y-6">
          <p className="text-gray-600">
            Confronta come sarebbero i tuoi risparmi investendo in Euro tradizionali vs Crypto. 
            <strong className="text-remida-teal"> Attenzione</strong>: Questo è solo un esempio semplificato.
            Le criptovalute sono altamente volatili e comportano rischi maggiori.
          </p>
          
          <div>
            <div className="flex justify-between mb-2">
              <Label htmlFor="crypto-monthly">Investimento Mensile</Label>
              <span className="font-semibold">€{monthlySavings}</span>
            </div>
            <Slider
              id="crypto-monthly"
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
              <Label htmlFor="crypto-years">Periodo (anni)</Label>
              <span className="font-semibold">{years} anni</span>
            </div>
            <Slider
              id="crypto-years"
              min={1}
              max={10}
              step={1}
              value={[years]}
              onValueChange={(value) => setYears(value[0])}
              className="my-4"
            />
          </div>
          
          <Button 
            onClick={calculateComparison}
            className="w-full bg-remida-orange hover:bg-remida-orange/90"
          >
            Confronta Investimenti
          </Button>
          
          {results && (
            <div className="mt-6">
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="p-4 rounded-lg text-center border border-gray-200">
                  <p className="text-sm text-gray-500">Euro (2% interesse)</p>
                  <p className="text-xl font-bold">{formatEuro(results.euroFinalValue)}</p>
                  <p className="text-sm text-gray-500">
                    Guadagno: <span className="text-green-600">{formatEuro(results.euroInterest)}</span>
                  </p>
                </div>
                <div className="p-4 rounded-lg text-center border border-gray-200">
                  <p className="text-sm text-gray-500">Crypto (simulazione)</p>
                  <p className="text-xl font-bold">{formatEuro(results.cryptoFinalValue)}</p>
                  <p className="text-sm text-gray-500">
                    Guadagno: <span className={results.cryptoGain >= 0 ? 'text-green-600' : 'text-red-600'}>
                      {formatEuro(results.cryptoGain)}
                    </span>
                  </p>
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
                      dataKey="euro" 
                      name="Euro" 
                      stroke="#008080" 
                      strokeWidth={2} 
                      dot={{ r: 3 }} 
                    />
                    <Line 
                      type="monotone" 
                      dataKey="crypto" 
                      name="Crypto" 
                      stroke="#FF5733" 
                      strokeWidth={2} 
                      dot={{ r: 3 }} 
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
              
              <p className="text-sm text-gray-500 mt-4">
                Nota: Questo è solo un esempio illustrativo. I rendimenti effettivi delle criptovalute sono molto variabili e possono
                comportare perdite significative.
              </p>
            </div>
          )}
        </div>
      )}
      
      {!showComparison && (
        <div className="text-center p-8 border-2 border-dashed border-gray-300 rounded-lg">
          <p className="text-gray-500">
            Attiva l'opzione crypto per esplorare una simulazione di investimento in criptovalute vs euro tradizionali.
          </p>
        </div>
      )}
    </div>
  );
};

export default CryptoOption;
