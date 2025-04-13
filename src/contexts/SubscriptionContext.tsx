
import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './AuthContext';
import { toast } from '@/hooks/use-toast';

export interface Subscription {
  id: string;
  user_id: string;
  tier: 'free' | 'standard' | 'premium';
  billing_cycle: 'monthly' | 'yearly';
  created_at: string;
  expires_at: string | null;
  updated_at: string;
}

interface SubscriptionContextType {
  subscription: Subscription | null;
  isLoading: boolean;
  updateSubscription: (tier: 'free' | 'standard' | 'premium', billingCycle: 'monthly' | 'yearly') => Promise<void>;
  refetchSubscription: () => Promise<void>;
}

const SubscriptionContext = createContext<SubscriptionType | undefined>(undefined);

export function SubscriptionProvider({ children }: { children: React.ReactNode }) {
  const [subscription, setSubscription] = useState<Subscription | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useAuth();

  const fetchSubscription = async () => {
    if (!user) {
      setSubscription(null);
      setIsLoading(false);
      return;
    }

    try {
      const { data, error } = await supabase
        .from('subscriptions')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
        .limit(1)
        .maybeSingle();

      if (error) {
        throw error;
      }

      if (data) {
        // Type assertion to ensure the data matches our Subscription interface
        setSubscription(data as Subscription);
      } else {
        setSubscription(null);
      }
    } catch (error) {
      console.error('Error fetching subscription:', error);
      toast({
        title: 'Errore',
        description: 'Impossibile recuperare i dati dell\'abbonamento',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const updateSubscription = async (tier: 'free' | 'standard' | 'premium', billingCycle: 'monthly' | 'yearly') => {
    if (!user) {
      throw new Error('User not authenticated');
    }

    // In a real app, you would process payment here
    // Mock successful payment processing

    try {
      // Create or update subscription
      const { data, error } = await supabase
        .from('subscriptions')
        .insert([
          {
            user_id: user.id,
            tier,
            billing_cycle: billingCycle,
          }
        ])
        .select()
        .single();

      if (error) {
        throw error;
      }

      // Type assertion to ensure the data matches our Subscription interface
      setSubscription(data as Subscription);
    } catch (error) {
      console.error('Error updating subscription:', error);
      throw error;
    }
  };

  const refetchSubscription = async () => {
    setIsLoading(true);
    await fetchSubscription();
  };

  useEffect(() => {
    fetchSubscription();
  }, [user]);

  return (
    <SubscriptionContext.Provider
      value={{
        subscription,
        isLoading,
        updateSubscription,
        refetchSubscription,
      }}
    >
      {children}
    </SubscriptionContext.Provider>
  );
}

export function useSubscription() {
  const context = useContext(SubscriptionContext);
  if (context === undefined) {
    throw new Error('useSubscription must be used within a SubscriptionProvider');
  }
  return context;
}
