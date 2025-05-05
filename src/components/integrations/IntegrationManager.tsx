
import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CoinbaseConnect from "./CoinbaseConnect";
import WalletConnect from "./WalletConnect";
import CsvImport from "./CsvImport";
import { Button } from "@/components/ui/button";
import { Check, AlertCircle } from 'lucide-react';
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";

type IntegrationManagerProps = {
  userId: string;
  onClose: () => void;
  onDataImported: () => void;
};

const IntegrationManager = ({ userId, onClose, onDataImported }: IntegrationManagerProps) => {
  const [activeTab, setActiveTab] = useState("coinbase");
  const [importStatus, setImportStatus] = useState<{ success: boolean; message: string } | null>(null);
  
  const handleDataImported = () => {
    setImportStatus({ 
      success: true, 
      message: "Dati importati con successo! Il tuo portafoglio è stato aggiornato." 
    });
    onDataImported();
  };

  const handleImportError = (message: string) => {
    setImportStatus({
      success: false,
      message: `Errore durante l'importazione: ${message}`
    });
  };
  
  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Gestione Integrazioni</h2>
        <Button variant="outline" onClick={onClose}>Chiudi</Button>
      </div>

      {importStatus && (
        <Alert 
          className={`mb-4 ${importStatus.success ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'}`}
          variant={importStatus.success ? "default" : "destructive"}
        >
          {importStatus.success ? 
            <Check className="h-4 w-4 text-green-600" /> : 
            <AlertCircle className="h-4 w-4" />
          }
          <AlertTitle>{importStatus.success ? "Successo" : "Errore"}</AlertTitle>
          <AlertDescription>{importStatus.message}</AlertDescription>
        </Alert>
      )}
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-3 mb-4">
          <TabsTrigger value="coinbase">Coinbase</TabsTrigger>
          <TabsTrigger value="wallet">Wallet</TabsTrigger>
          <TabsTrigger value="csv">Import CSV</TabsTrigger>
        </TabsList>
        
        <TabsContent value="coinbase">
          <CoinbaseConnect 
            userId={userId} 
            onDataImported={handleDataImported} 
            onError={handleImportError}
          />
        </TabsContent>
        
        <TabsContent value="wallet">
          <WalletConnect 
            userId={userId} 
            onDataImported={handleDataImported}
            onError={handleImportError}
          />
        </TabsContent>
        
        <TabsContent value="csv">
          <CsvImport 
            userId={userId} 
            onDataImported={handleDataImported}
            onError={handleImportError}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default IntegrationManager;
