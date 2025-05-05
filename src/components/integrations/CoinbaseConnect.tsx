
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { toast } from '@/hooks/use-toast';
import { Loader2, AlertCircle, CheckCircle2 } from 'lucide-react';
import { AssetData, saveAssetData } from '@/integrations/dataImport/ImportService';

type CoinbaseConnectProps = {
  userId: string;
  onDataImported: () => void;
};

const CoinbaseConnect = ({ userId, onDataImported }: CoinbaseConnectProps) => {
  const [apiKey, setApiKey] = useState('');
  const [apiSecret, setApiSecret] = useState('');
  const [isConnecting, setIsConnecting] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleConnect = async () => {
    if (!apiKey || !apiSecret) {
      setError('Please enter both API Key and Secret');
      return;
    }

    setIsConnecting(true);
    setError(null);

    try {
      // In a real implementation, this would securely call your backend to handle the API connection
      // For demo purposes, we'll simulate a successful connection with sample data
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Sample data that would come from Coinbase API
      const sampleAssets: AssetData[] = [
        {
          name: 'Bitcoin',
          symbol: 'BTC',
          amount: 0.5,
          value: 25000,
          type: 'crypto',
          source: 'coinbase',
          userId,
          lastUpdated: new Date()
        },
        {
          name: 'Ethereum',
          symbol: 'ETH',
          amount: 5,
          value: 12500,
          type: 'crypto',
          source: 'coinbase',
          userId,
          lastUpdated: new Date()
        },
        {
          name: 'USD Coin',
          symbol: 'USDC',
          amount: 5000,
          value: 5000,
          type: 'crypto',
          source: 'coinbase',
          userId,
          lastUpdated: new Date()
        },
        {
          name: 'Tether',
          symbol: 'USDT',
          amount: 3000,
          value: 3000,
          type: 'crypto',
          source: 'coinbase',
          userId,
          lastUpdated: new Date()
        }
      ];
      
      // Save the imported data
      const saveResult = await saveAssetData(sampleAssets);
      
      if (saveResult) {
        setIsConnected(true);
        toast({
          title: 'Coinbase Connected',
          description: 'Your Coinbase account has been successfully connected.',
          variant: 'default',
        });
        onDataImported();
      } else {
        throw new Error('Failed to save asset data');
      }
    } catch (err) {
      setError('Failed to connect to Coinbase. Please check your API credentials.');
      toast({
        title: 'Connection Error',
        description: 'Could not connect to Coinbase API.',
        variant: 'destructive',
      });
    } finally {
      setIsConnecting(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Connect Coinbase</CardTitle>
        <CardDescription>
          Import your Coinbase portfolio to automatically track your crypto assets
        </CardDescription>
      </CardHeader>
      <CardContent>
        {isConnected ? (
          <div className="flex items-center space-x-2 text-green-600">
            <CheckCircle2 size={20} />
            <span>Connesso a Coinbase</span>
          </div>
        ) : (
          <div className="space-y-4">
            <div>
              <label htmlFor="apiKey" className="text-sm font-medium block mb-1">
                API Key
              </label>
              <Input
                id="apiKey"
                type="text"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                placeholder="Enter your Coinbase API key"
              />
            </div>
            <div>
              <label htmlFor="apiSecret" className="text-sm font-medium block mb-1">
                API Secret
              </label>
              <Input
                id="apiSecret"
                type="password"
                value={apiSecret}
                onChange={(e) => setApiSecret(e.target.value)}
                placeholder="Enter your Coinbase API secret"
              />
            </div>
            {error && (
              <div className="flex items-center space-x-2 text-red-500 text-sm">
                <AlertCircle size={16} />
                <span>{error}</span>
              </div>
            )}
          </div>
        )}
      </CardContent>
      <CardFooter>
        {isConnected ? (
          <Button
            className="w-full"
            variant="outline"
            onClick={onDataImported}
          >
            Aggiorna dati
          </Button>
        ) : (
          <Button
            className="w-full bg-remida-teal hover:bg-remida-teal/80"
            onClick={handleConnect}
            disabled={isConnecting}
          >
            {isConnecting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {isConnecting ? 'Connecting...' : 'Connect'}
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default CoinbaseConnect;
