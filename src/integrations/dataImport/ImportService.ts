
// Data import service for handling different import types
import { supabase } from '@/integrations/supabase/client';

export type AssetData = {
  id?: string;
  name: string;
  symbol?: string;
  amount: number;
  value: number;
  type: 'crypto' | 'fiat' | 'stock' | 'other';
  source: 'coinbase' | 'wallet' | 'csv' | 'manual';
  userId: string;
  lastUpdated: Date;
};

export type TransactionData = {
  id?: string;
  type: 'buy' | 'sell' | 'transfer' | 'income' | 'expense';
  asset: string;
  amount: number;
  price: number;
  date: Date;
  userId: string;
  source: 'coinbase' | 'wallet' | 'csv' | 'manual';
};

// Save imported assets to the database
export const saveAssetData = async (assets: AssetData[]) => {
  try {
    const { error } = await supabase
      .from('user_assets')
      .upsert(assets.map(asset => ({
        name: asset.name,
        symbol: asset.symbol || '',
        amount: asset.amount,
        value: asset.value,
        type: asset.type,
        source: asset.source,
        user_id: asset.userId,
        last_updated: new Date().toISOString()
      })), { onConflict: 'name,user_id' });

    if (error) throw error;
    return true;
  } catch (error) {
    console.error('Error saving asset data:', error);
    return false;
  }
};

// Save transaction history to the database
export const saveTransactionData = async (transactions: TransactionData[]) => {
  try {
    const { error } = await supabase
      .from('transactions')
      .insert(transactions.map(tx => ({
        type: tx.type,
        asset: tx.asset,
        amount: tx.amount,
        price: tx.price,
        date: tx.date.toISOString(),
        user_id: tx.userId,
        source: tx.source,
      })));

    if (error) throw error;
    return true;
  } catch (error) {
    console.error('Error saving transaction data:', error);
    return false;
  }
};

// Fetch user assets from the database
export const getUserAssets = async (userId: string): Promise<AssetData[]> => {
  try {
    const { data, error } = await supabase
      .from('user_assets')
      .select('*')
      .eq('user_id', userId);

    if (error) throw error;
    
    return data.map(item => ({
      id: item.id,
      name: item.name,
      symbol: item.symbol,
      amount: item.amount,
      value: item.value,
      type: item.type,
      source: item.source,
      userId: item.user_id,
      lastUpdated: new Date(item.last_updated)
    }));
  } catch (error) {
    console.error('Error fetching user assets:', error);
    return [];
  }
};

// Fetch user transactions from the database
export const getUserTransactions = async (userId: string): Promise<TransactionData[]> => {
  try {
    const { data, error } = await supabase
      .from('transactions')
      .select('*')
      .eq('user_id', userId)
      .order('date', { ascending: false });

    if (error) throw error;
    
    return data.map(item => ({
      id: item.id,
      type: item.type,
      asset: item.asset,
      amount: item.amount,
      price: item.price,
      date: new Date(item.date),
      userId: item.user_id,
      source: item.source,
    }));
  } catch (error) {
    console.error('Error fetching user transactions:', error);
    return [];
  }
};
