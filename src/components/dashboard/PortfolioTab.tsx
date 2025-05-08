
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import PortfolioSummary from '@/components/portfolio/PortfolioSummary';
import Shield from '@/components/icons/Shield';
import { TrendingUp, BitcoinIcon } from 'lucide-react';

interface PortfolioTabProps {
  userId: string;
  refreshTrigger: number;
  moneyDials: any[];
}

const PortfolioTab = ({ userId, refreshTrigger, moneyDials }: PortfolioTabProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="md:col-span-1">
        <PortfolioSummary userId={userId} refreshTrigger={refreshTrigger} />
      </div>
      
      <div className="md:col-span-2">
        <Card>
          <CardHeader>
            <CardTitle>Suggerimenti di Allocazione</CardTitle>
            <CardDescription>Come ottimizzare il tuo portafoglio</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="p-4 border border-green-100 bg-green-50 rounded-lg">
                <h3 className="font-medium text-lg flex items-center mb-2">
                  <Shield className="mr-2 h-5 w-5 text-green-600" />
                  <span>Fondo di Emergenza con Stablecoin</span>
                </h3>
                <p className="mb-3 text-gray-700">Considera di allocare il 15-20% del tuo patrimonio in stablecoin come USDT o USDC. Potrai guadagnare interessi attraverso lo staking (4-6% annuo) mentre mantieni liquidità per le emergenze.</p>
                <div className="flex justify-end">
                  <Button variant="outline" size="sm">Impara di più</Button>
                </div>
              </div>
              
              <div className="p-4 border border-blue-100 bg-blue-50 rounded-lg">
                <h3 className="font-medium text-lg flex items-center mb-2">
                  <TrendingUp className="mr-2 h-5 w-5 text-blue-600" />
                  <span>Investimenti a Lungo Termine</span>
                </h3>
                <p className="mb-3 text-gray-700">Basato sul tuo profilo, una strategia di DCA (Dollar-Cost Averaging) su Bitcoin ed Ethereum potrebbe essere adatta per il 20-30% del tuo portafoglio.</p>
                <div className="flex justify-end">
                  <Button variant="outline" size="sm">Impara di più</Button>
                </div>
              </div>
              
              <div className="p-4 border border-orange-100 bg-orange-50 rounded-lg">
                <h3 className="font-medium text-lg flex items-center mb-2">
                  <BitcoinIcon className="mr-2 h-5 w-5 text-orange-600" />
                  <span>Diversificazione nel mondo Crypto</span>
                </h3>
                <p className="mb-3 text-gray-700">Per esplorare opportunità di crescita più elevate, considera di dedicare il 5-10% del portafoglio a progetti crypto innovativi dopo un'attenta ricerca.</p>
                <div className="flex justify-end">
                  <Button variant="outline" size="sm">Impara di più</Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Money Dials</CardTitle>
            <CardDescription>Su cosa spendi i tuoi soldi</CardDescription>
          </CardHeader>
          <CardContent>
            {moneyDials.map((category, index) => (
              <div key={index} className="mb-4">
                <div className="flex justify-between items-center mb-2">
                  <div>
                    <span className="font-medium">{category.category}</span>
                    <p className="text-sm text-gray-500">€{category.amount}/mese</p>
                  </div>
                  <div className="text-right">
                    <span className="text-sm">Importanza: {category.importance}/10</span>
                  </div>
                </div>
                <Slider
                  defaultValue={[category.importance * 10]}
                  max={100}
                  step={10}
                  disabled
                />
              </div>
            ))}
            
            <div className="mt-4 text-sm text-center text-gray-500">
              <p>I "Money Dials" ti mostrano dove dirigi i tuoi soldi in base alle tue priorità. Aumenta la spesa in ciò che ti dà più felicità e riduci il resto.</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PortfolioTab;
