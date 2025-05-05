
import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { AssetData, getUserAssets } from '@/integrations/dataImport/ImportService';
import { Progress } from '@/components/ui/progress';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

type PortfolioSummaryProps = {
  userId: string;
  refreshTrigger: number;
};

const PortfolioSummary = ({ userId, refreshTrigger }: PortfolioSummaryProps) => {
  const [assets, setAssets] = useState<AssetData[]>([]);
  const [loading, setLoading] = useState(true);
  const [totalValue, setTotalValue] = useState(0);
  const [assetsByType, setAssetsByType] = useState<{ name: string; value: number; color: string }[]>([]);
  
  const typeColors = {
    crypto: '#FF9500',
    fiat: '#00C389',
    stock: '#3B82F6',
    other: '#8884D8'
  };
  
  useEffect(() => {
    const fetchAssets = async () => {
      setLoading(true);
      try {
        const userAssets = await getUserAssets(userId);
        setAssets(userAssets);
        
        // Calculate total portfolio value
        const total = userAssets.reduce((sum, asset) => sum + asset.value, 0);
        setTotalValue(total);
        
        // Group assets by type for chart
        const assetGroups: Record<string, number> = {};
        userAssets.forEach(asset => {
          if (!assetGroups[asset.type]) {
            assetGroups[asset.type] = 0;
          }
          assetGroups[asset.type] += asset.value;
        });
        
        const chartData = Object.entries(assetGroups).map(([type, value]) => ({
          name: type.charAt(0).toUpperCase() + type.slice(1),
          value,
          color: typeColors[type as keyof typeof typeColors] || '#CCCCCC'
        }));
        
        setAssetsByType(chartData);
      } catch (error) {
        console.error('Error fetching portfolio data:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchAssets();
  }, [userId, refreshTrigger]);

  if (loading) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="animate-pulse space-y-4">
            <div className="h-8 bg-gray-200 rounded w-1/3"></div>
            <div className="h-64 bg-gray-200 rounded"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  // Sort assets by value, descending
  const sortedAssets = [...assets].sort((a, b) => b.value - a.value);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Il Tuo Portafoglio</CardTitle>
        <CardDescription>Patrimonio totale: €{totalValue.toLocaleString()}</CardDescription>
      </CardHeader>
      <CardContent>
        {/* Portfolio Chart */}
        {assetsByType.length > 0 ? (
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={assetsByType}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {assetsByType.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => `€${value}`} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        ) : (
          <div className="h-64 flex items-center justify-center text-gray-500">
            <p>Nessun dato disponibile. Collega una fonte di dati.</p>
          </div>
        )}

        {/* Assets List */}
        <div className="mt-6 space-y-4">
          <h3 className="font-medium text-lg">I tuoi asset</h3>
          {sortedAssets.length > 0 ? (
            <div className="space-y-4">
              {sortedAssets.map((asset, index) => {
                const percentage = (asset.value / totalValue) * 100;
                return (
                  <div key={index}>
                    <div className="flex justify-between mb-1">
                      <div>
                        <span className="font-medium">{asset.name}</span>
                        {asset.symbol && <span className="text-gray-500 ml-1">({asset.symbol})</span>}
                      </div>
                      <span className="text-right font-medium">€{asset.value.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Progress value={percentage} className="h-2" />
                      <span className="text-xs text-gray-500">{percentage.toFixed(1)}%</span>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <p className="text-gray-500">Nessun asset disponibile. Importa i tuoi dati.</p>
          )}
        </div>
      </CardContent>
      <CardFooter>
        <p className="text-xs text-gray-500 w-full text-center">
          Ultimo aggiornamento: {new Date().toLocaleDateString()} {new Date().toLocaleTimeString()}
        </p>
      </CardFooter>
    </Card>
  );
};

export default PortfolioSummary;
