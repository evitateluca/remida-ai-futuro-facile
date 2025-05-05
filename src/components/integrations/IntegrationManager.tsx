
import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CoinbaseConnect from "./CoinbaseConnect";
import WalletConnect from "./WalletConnect";
import CsvImport from "./CsvImport";
import { Button } from "@/components/ui/button";

type IntegrationManagerProps = {
  userId: string;
  onClose: () => void;
  onDataImported: () => void;
};

const IntegrationManager = ({ userId, onClose, onDataImported }: IntegrationManagerProps) => {
  const [activeTab, setActiveTab] = useState("coinbase");
  
  const handleDataImported = () => {
    onDataImported();
  };
  
  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Gestione Integrazioni</h2>
        <Button variant="outline" onClick={onClose}>Chiudi</Button>
      </div>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-3 mb-4">
          <TabsTrigger value="coinbase">Coinbase</TabsTrigger>
          <TabsTrigger value="wallet">Wallet</TabsTrigger>
          <TabsTrigger value="csv">Import CSV</TabsTrigger>
        </TabsList>
        
        <TabsContent value="coinbase">
          <CoinbaseConnect userId={userId} onDataImported={handleDataImported} />
        </TabsContent>
        
        <TabsContent value="wallet">
          <WalletConnect userId={userId} onDataImported={handleDataImported} />
        </TabsContent>
        
        <TabsContent value="csv">
          <CsvImport userId={userId} onDataImported={handleDataImported} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default IntegrationManager;
