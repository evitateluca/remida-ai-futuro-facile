
import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { 
  PieChart, 
  Pie, 
  Cell, 
  ResponsiveContainer,
  Legend,
  Tooltip
} from 'recharts';

const BudgetSimulator = () => {
  const [income, setIncome] = useState<number>(2000);
  const [housing, setHousing] = useState<number>(700);
  const [food, setFood] = useState<number>(400);
  const [transport, setTransport] = useState<number>(150);
  const [utilities, setUtilities] = useState<number>(100);
  const [entertainment, setEntertainment] = useState<number>(150);
  const [savings, setSavings] = useState<number>(0);
  const [showResults, setShowResults] = useState(false);
  
  const calculateBudget = () => {
    const totalExpenses = housing + food + transport + utilities + entertainment;
    setSavings(income - totalExpenses);
    setShowResults(true);
  };
  
  const getChartData = () => {
    return [
      { name: 'Alloggio', value: housing, color: '#008080' },
      { name: 'Cibo', value: food, color: '#FF5733' },
      { name: 'Trasporto', value: transport, color: '#33A1FD' },
      { name: 'Utenze', value: utilities, color: '#6A0DAD' },
      { name: 'Intrattenimento', value: entertainment, color: '#FFC300' },
      { name: 'Risparmi', value: savings > 0 ? savings : 0, color: '#4CAF50' }
    ];
  };
  
  const getBudgetAdvice = () => {
    if (savings < 0) {
      return "Le tue spese superano le tue entrate. Considera di ridurre le spese non essenziali.";
    } else if (savings < income * 0.1) {
      return "Il tuo risparmio è inferiore al 10% del tuo reddito. Prova a rivedere le tue spese per aumentare i risparmi.";
    } else if (savings < income * 0.2) {
      return "Stai risparmiando più del 10% del tuo reddito, ottimo! Prova a raggiungere il 20% per una sicurezza finanziaria maggiore.";
    } else {
      return "Eccellente! Stai risparmiando più del 20% del tuo reddito. Considera di investire parte dei tuoi risparmi per farli crescere.";
    }
  };

  return (
    <div className="feature-card h-full flex flex-col">
      <h3 className="text-xl font-semibold mb-4 text-remida-teal">Simulatore di Budget</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <div className="space-y-4">
            <div>
              <Label htmlFor="income">Reddito Mensile (€)</Label>
              <Input
                id="income"
                type="number"
                min="0"
                value={income}
                onChange={(e) => setIncome(Number(e.target.value))}
              />
            </div>
            
            <div>
              <Label htmlFor="housing">Spese per Alloggio (€)</Label>
              <Input
                id="housing"
                type="number"
                min="0"
                value={housing}
                onChange={(e) => setHousing(Number(e.target.value))}
              />
            </div>
            
            <div>
              <Label htmlFor="food">Spese per Cibo (€)</Label>
              <Input
                id="food"
                type="number"
                min="0"
                value={food}
                onChange={(e) => setFood(Number(e.target.value))}
              />
            </div>
            
            <div>
              <Label htmlFor="transport">Spese per Trasporto (€)</Label>
              <Input
                id="transport"
                type="number"
                min="0"
                value={transport}
                onChange={(e) => setTransport(Number(e.target.value))}
              />
            </div>
            
            <div>
              <Label htmlFor="utilities">Utenze (€)</Label>
              <Input
                id="utilities"
                type="number"
                min="0"
                value={utilities}
                onChange={(e) => setUtilities(Number(e.target.value))}
              />
            </div>
            
            <div>
              <Label htmlFor="entertainment">Intrattenimento (€)</Label>
              <Input
                id="entertainment"
                type="number"
                min="0"
                value={entertainment}
                onChange={(e) => setEntertainment(Number(e.target.value))}
              />
            </div>
            
            <Button 
              onClick={calculateBudget}
              className="w-full bg-remida-orange hover:bg-remida-orange/90"
            >
              Calcola Budget
            </Button>
          </div>
        </div>
        
        {showResults && (
          <div className="flex flex-col items-center">
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={getChartData()}
                    cx="50%"
                    cy="50%"
                    innerRadius={30}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(1)}%`}
                    labelLine={false}
                  >
                    {getChartData().map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Legend />
                  <Tooltip formatter={(value) => `€${value}`} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            
            <div className="mt-6 text-center">
              {savings >= 0 ? (
                <p className="text-lg">
                  <span className="font-semibold">Risparmi mensili:</span>{" "}
                  <span className="text-green-600 font-bold">€{savings.toFixed(2)}</span>
                </p>
              ) : (
                <p className="text-lg">
                  <span className="font-semibold">Deficit mensile:</span>{" "}
                  <span className="text-red-600 font-bold">€{Math.abs(savings).toFixed(2)}</span>
                </p>
              )}
              
              <div className="mt-4 p-3 bg-gray-100 rounded-lg border border-gray-200">
                <p>{getBudgetAdvice()}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BudgetSimulator;
