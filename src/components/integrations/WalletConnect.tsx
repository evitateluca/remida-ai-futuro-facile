
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from '@/hooks/use-toast';
import { Loader2, CheckCircle2, Wallet } from 'lucide-react';
import { AssetData, saveAssetData } from '@/integrations/dataImport/ImportService';

type WalletConnectProps = {
  userId: string;
  onDataImported: () => void;
};

const WalletConnect = ({ userId, onDataImported }: WalletConnectProps) => {
  const [isConnecting, setIsConnecting] = useState(false);
  const [connectedWallets, setConnectedWallets] = useState<string[]>([]);
  
  const walletOptions = [
    { id: 'metamask', name: 'MetaMask', icon: '🦊' },
    { id: 'trustwallet', name: 'Trust Wallet', icon: '🔒' },
    { id: 'phantom', name: 'Phantom', icon: '👻' }
  ];

  const handleConnectWallet = async (walletId: string) => {
    if (connectedWallets.includes(walletId)) {
      // Already connected
      return;
    }

    setIsConnecting(true);

    try {
      // In a real implementation, this would connect to the actual wallet
      // For demo purposes, we'll simulate a successful connection with sample data
      
      // Simulate wallet connection delay
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Sample wallet data that would come from actual wallet
      const walletAssets: AssetData[] = [];
      
      if (walletId === 'metamask') {
        walletAssets.push(
          {
            name: 'Ethereum',
            symbol: 'ETH',
            amount: 1.2,
            value: 3000,
            type: 'crypto',
            source: 'wallet',
            userId,
            lastUpdated: new Date()
          },
          {
            name: 'Chainlink',
            symbol: 'LINK',
            amount: 120,
            value: 1800,
            type: 'crypto',
            source: 'wallet',
            userId,
            lastUpdated: new Date()
          }
        );
      } else if (walletId === 'trustwallet') {
        walletAssets.push(
          {
            name: 'Bitcoin',
            symbol: 'BTC',
            amount: 0.12,
            value: 6000,
            type: 'crypto',
            source: 'wallet',
            userId,
            lastUpdated: new Date()
          },
          {
            name: 'Tether',
            symbol: 'USDT',
            amount: 500,
            value: 500,
            type: 'crypto',
            source: 'wallet',
            userId,
            lastUpdated: new Date()
          }
        );
      } else if (walletId === 'phantom') {
        walletAssets.push(
          {
            name: 'Solana',
            symbol: 'SOL',
            amount: 25,
            value: 2000,
            type: 'crypto',
            source: 'wallet',
            userId,
            lastUpdated: new Date()
          }
        );
      }
      
      // Save the imported wallet data
      const saveResult = await saveAssetData(walletAssets);
      
      if (saveResult) {
        setConnectedWallets(prev => [...prev, walletId]);
        toast({
          title: 'Wallet Connected',
          description: `Your ${walletOptions.find(w => w.id === walletId)?.name} wallet has been connected successfully.`,
        });
        onDataImported();
      } else {
        throw new Error('Failed to save wallet data');
      }
    } catch (err) {
      toast({
        title: 'Connection Error',
        description: 'Could not connect wallet. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsConnecting(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Connect Wallet</CardTitle>
        <CardDescription>
          Connect your crypto wallets to track your assets across different blockchains
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {walletOptions.map((wallet) => (
          <div 
            key={wallet.id}
            className="flex items-center justify-between p-3 border rounded-md hover:bg-gray-50 cursor-pointer"
            onClick={() => handleConnectWallet(wallet.id)}
          >
            <div className="flex items-center space-x-3">
              <span className="text-2xl">{wallet.icon}</span>
              <span>{wallet.name}</span>
            </div>
            <div>
              {connectedWallets.includes(wallet.id) ? (
                <div className="flex items-center text-green-600">
                  <CheckCircle2 size={18} />
                  <span className="ml-2">Connected</span>
                </div>
              ) : (
                <Button 
                  size="sm" 
                  disabled={isConnecting}
                >
                  {isConnecting ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    'Connect'
                  )}
                </Button>
              )}
            </div>
          </div>
        ))}
      </CardContent>
      <CardFooter>
        <p className="text-xs text-gray-500 w-full text-center">
          We support Ethereum, Bitcoin, and Solana blockchains.
        </p>
      </CardFooter>
    </Card>
  );
};

export default WalletConnect;
