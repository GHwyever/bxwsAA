import { useState, useEffect } from 'react';
import { foodStorage } from '@/utils/storage';

export function useSubscription() {
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [subscriptionType, setSubscriptionType] = useState<'free' | 'monthly' | 'yearly' | 'lifetime'>('free');
  const [expiresAt, setExpiresAt] = useState<Date | undefined>();

  useEffect(() => {
    loadSubscription();
  }, []);

  const loadSubscription = async () => {
    try {
      const subscription = await foodStorage.getSubscription();
      setIsSubscribed(subscription.isSubscribed);
      setSubscriptionType(subscription.type as any);
      setExpiresAt(subscription.expiresAt);
    } catch (error) {
      console.error('Failed to load subscription:', error);
    }
  };

  const checkSubscription = async () => {
    await loadSubscription();
  };

  const subscribe = async (type: 'monthly' | 'yearly' | 'lifetime') => {
    try {
      // In a real app, this would integrate with RevenueCat or similar
      // For now, we'll simulate the subscription
      
      let expiresAt: Date | undefined;
      if (type === 'monthly') {
        expiresAt = new Date();
        expiresAt.setMonth(expiresAt.getMonth() + 1);
      } else if (type === 'yearly') {
        expiresAt = new Date();
        expiresAt.setFullYear(expiresAt.getFullYear() + 1);
      }
      // lifetime doesn't need expiry date

      await foodStorage.setSubscription({
        isSubscribed: true,
        type,
        expiresAt,
      });

      setIsSubscribed(true);
      setSubscriptionType(type);
      setExpiresAt(expiresAt);
    } catch (error) {
      console.error('Failed to subscribe:', error);
      throw error;
    }
  };

  const cancelSubscription = async () => {
    try {
      await foodStorage.setSubscription({
        isSubscribed: false,
        type: 'free',
      });

      setIsSubscribed(false);
      setSubscriptionType('free');
      setExpiresAt(undefined);
    } catch (error) {
      console.error('Failed to cancel subscription:', error);
      throw error;
    }
  };

  return {
    isSubscribed,
    subscriptionType,
    expiresAt,
    subscribe,
    cancelSubscription,
    checkSubscription,
  };
}
