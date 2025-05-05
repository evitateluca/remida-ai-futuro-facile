
import { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { toast } from '@/hooks/use-toast';
import { Upload, FileSpreadsheet, CheckCircle2, XCircle, Loader2 } from 'lucide-react';
import { AssetData, saveAssetData, TransactionData, saveTransactionData } from '@/integrations/dataImport/ImportService';

type CsvImportProps = {
  userId: string;
  onDataImported: () => void;
};

const CsvImport = ({ userId, onDataImported }: CsvImportProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isImporting, setIsImporting] = useState(false);
  const [importError, setImportError] = useState<string | null>(null);
  const [importSuccess, setImportSuccess] = useState(false);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && (file.type === 'text/csv' || file.name.endsWith('.csv'))) {
      setSelectedFile(file);
      setImportError(null);
    } else {
      setSelectedFile(null);
      setImportError('Please select a valid CSV file');
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const parseCSV = async (file: File): Promise<{ assets: AssetData[], transactions: TransactionData[] }> => {
    return new Promise((resolve, reject) => {
      // In a real implementation, we would actually parse the CSV
      // For demo purposes, we'll simulate parsing with sample data
      setTimeout(() => {
        const assets: AssetData[] = [
          {
            name: 'EUR Bank Account',
            amount: 12500,
            value: 12500,
            type: 'fiat',
            source: 'csv',
            userId,
            lastUpdated: new Date()
          },
          {
            name: 'US Government Bonds',
            amount: 1,
            value: 10000,
            type: 'other',
            source: 'csv',
            userId,
            lastUpdated: new Date()
          },
          {
            name: 'Apple Stock',
            symbol: 'AAPL',
            amount: 10,
            value: 2000,
            type: 'stock',
            source: 'csv',
            userId,
            lastUpdated: new Date()
          },
          {
            name: 'Amazon Stock',
            symbol: 'AMZN',
            amount: 5,
            value: 1750,
            type: 'stock',
            source: 'csv',
            userId,
            lastUpdated: new Date()
          }
        ];

        const transactions: TransactionData[] = [
          {
            type: 'buy',
            asset: 'Apple Stock',
            amount: 10,
            price: 180,
            date: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000), // 30 days ago
            userId,
            source: 'csv'
          },
          {
            type: 'buy',
            asset: 'Amazon Stock',
            amount: 5,
            price: 330,
            date: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000), // 60 days ago
            userId,
            source: 'csv'
          },
          {
            type: 'buy',
            asset: 'US Government Bonds',
            amount: 1,
            price: 10000,
            date: new Date(Date.now() - 90 * 24 * 60 * 60 * 1000), // 90 days ago
            userId,
            source: 'csv'
          }
        ];

        resolve({ assets, transactions });
      }, 1500); 
    });
  };

  const handleImport = async () => {
    if (!selectedFile) {
      setImportError('Please select a file first');
      return;
    }

    setIsImporting(true);
    setImportError(null);
    setImportSuccess(false);

    try {
      // Parse the CSV file (in real application this would actually parse the file)
      const { assets, transactions } = await parseCSV(selectedFile);
      
      // Save the assets and transactions
      const assetsSaved = await saveAssetData(assets);
      const transactionsSaved = await saveTransactionData(transactions);
      
      if (assetsSaved && transactionsSaved) {
        setImportSuccess(true);
        toast({
          title: 'Import Successful',
          description: `Imported ${assets.length} assets and ${transactions.length} transactions from ${selectedFile.name}`,
        });
        onDataImported();
      } else {
        throw new Error('Failed to save imported data');
      }
    } catch (err) {
      setImportError('Failed to import CSV data. Please check the file format.');
      toast({
        title: 'Import Failed',
        description: 'There was a problem importing your data.',
        variant: 'destructive',
      });
    } finally {
      setIsImporting(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Import CSV</CardTitle>
        <CardDescription>
          Import your financial data from a spreadsheet file (.csv format)
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Input
          ref={fileInputRef}
          type="file"
          accept=".csv"
          onChange={handleFileSelect}
          className="hidden"
        />
        
        <div className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer 
          ${importSuccess ? 'border-green-300 bg-green-50' : 'border-gray-300 hover:border-gray-400'}`}
          onClick={triggerFileInput}
        >
          {selectedFile ? (
            <div className="space-y-2">
              <FileSpreadsheet className="h-8 w-8 mx-auto text-blue-500" />
              <p>{selectedFile.name}</p>
              <p className="text-sm text-gray-500">{(selectedFile.size / 1024).toFixed(1)} KB</p>
            </div>
          ) : importSuccess ? (
            <div className="space-y-2">
              <CheckCircle2 className="h-8 w-8 mx-auto text-green-500" />
              <p className="font-medium text-green-700">Import successful!</p>
            </div>
          ) : (
            <div className="space-y-2">
              <Upload className="h-8 w-8 mx-auto text-gray-400" />
              <p className="font-medium">Click to select a CSV file</p>
              <p className="text-sm text-gray-500">or drag and drop it here</p>
            </div>
          )}
        </div>
        
        {importError && (
          <div className="flex items-center space-x-2 text-red-500 text-sm">
            <XCircle size={16} />
            <span>{importError}</span>
          </div>
        )}
        
        <div>
          <p className="text-sm text-gray-500 mb-2">Format required:</p>
          <div className="text-xs bg-gray-50 p-2 rounded font-mono">
            name,type,amount,value,currency<br />
            "Bank Account","fiat",5000,5000,EUR<br />
            "Bitcoin","crypto",0.5,25000,USD<br />
            "Apple Stock","stock",10,2000,USD
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button
          className="w-full bg-remida-teal hover:bg-remida-teal/80"
          onClick={handleImport}
          disabled={!selectedFile || isImporting || importSuccess}
        >
          {isImporting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          {isImporting ? 'Importing...' : 'Import Data'}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default CsvImport;
