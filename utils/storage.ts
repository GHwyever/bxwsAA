import AsyncStorage from '@react-native-async-storage/async-storage';
import { FoodItem } from '@/types/food';

const STORAGE_KEYS = {
  FOODS: 'foods',
  SETTINGS: 'settings',
  SUBSCRIPTION: 'subscription',
  LANGUAGE: 'language',
  NOTIFICATIONS: 'notifications',
};

class FoodStorage {
  async getAllFoods(): Promise<FoodItem[]> {
    try {
      const data = await AsyncStorage.getItem(STORAGE_KEYS.FOODS);
      if (data) {
        const foods = JSON.parse(data);
        return foods.map((food: any) => ({
          ...food,
          productionDate: new Date(food.productionDate),
          expiryDate: new Date(food.expiryDate),
          createdAt: new Date(food.createdAt),
        }));
      }
      return [];
    } catch (error) {
      console.error('Failed to load foods:', error);
      return [];
    }
  }

  async getFood(id: string): Promise<FoodItem | null> {
    try {
      const foods = await this.getAllFoods();
      return foods.find(food => food.id === id) || null;
    } catch (error) {
      console.error('Failed to get food:', error);
      return null;
    }
  }

  async addFood(food: FoodItem): Promise<void> {
    try {
      const foods = await this.getAllFoods();
      foods.push(food);
      await AsyncStorage.setItem(STORAGE_KEYS.FOODS, JSON.stringify(foods));
    } catch (error) {
      console.error('Failed to add food:', error);
      throw error;
    }
  }

  async updateFood(updatedFood: FoodItem): Promise<void> {
    try {
      const foods = await this.getAllFoods();
      const index = foods.findIndex(food => food.id === updatedFood.id);
      if (index !== -1) {
        foods[index] = updatedFood;
        await AsyncStorage.setItem(STORAGE_KEYS.FOODS, JSON.stringify(foods));
      }
    } catch (error) {
      console.error('Failed to update food:', error);
      throw error;
    }
  }

  async deleteFood(id: string): Promise<void> {
    try {
      const foods = await this.getAllFoods();
      const filteredFoods = foods.filter(food => food.id !== id);
      await AsyncStorage.setItem(STORAGE_KEYS.FOODS, JSON.stringify(filteredFoods));
    } catch (error) {
      console.error('Failed to delete food:', error);
      throw error;
    }
  }

  async clearAll(): Promise<void> {
    try {
      await AsyncStorage.removeItem(STORAGE_KEYS.FOODS);
    } catch (error) {
      console.error('Failed to clear all foods:', error);
      throw error;
    }
  }

  async getLanguage(): Promise<string> {
    try {
      const language = await AsyncStorage.getItem(STORAGE_KEYS.LANGUAGE);
      return language || 'en';
    } catch (error) {
      console.error('Failed to get language:', error);
      return 'en';
    }
  }

  async setLanguage(language: string): Promise<void> {
    try {
      await AsyncStorage.setItem(STORAGE_KEYS.LANGUAGE, language);
    } catch (error) {
      console.error('Failed to set language:', error);
      throw error;
    }
  }

  async getSubscription(): Promise<{
    isSubscribed: boolean;
    type: string;
    expiresAt?: Date;
  }> {
    try {
      const data = await AsyncStorage.getItem(STORAGE_KEYS.SUBSCRIPTION);
      if (data) {
        const subscription = JSON.parse(data);
        return {
          ...subscription,
          expiresAt: subscription.expiresAt ? new Date(subscription.expiresAt) : undefined,
        };
      }
      return { isSubscribed: false, type: 'free' };
    } catch (error) {
      console.error('Failed to get subscription:', error);
      return { isSubscribed: false, type: 'free' };
    }
  }

  async setSubscription(subscription: {
    isSubscribed: boolean;
    type: string;
    expiresAt?: Date;
  }): Promise<void> {
    try {
      await AsyncStorage.setItem(STORAGE_KEYS.SUBSCRIPTION, JSON.stringify(subscription));
    } catch (error) {
      console.error('Failed to set subscription:', error);
      throw error;
    }
  }

  async getNotificationSettings(): Promise<{ enabled: boolean }> {
    try {
      const data = await AsyncStorage.getItem(STORAGE_KEYS.NOTIFICATIONS);
      if (data) {
        return JSON.parse(data);
      }
      return { enabled: true };
    } catch (error) {
      console.error('Failed to get notification settings:', error);
      return { enabled: true };
    }
  }

  async setNotificationSettings(settings: { enabled: boolean }): Promise<void> {
    try {
      await AsyncStorage.setItem(STORAGE_KEYS.NOTIFICATIONS, JSON.stringify(settings));
    } catch (error) {
      console.error('Failed to set notification settings:', error);
      throw error;
    }
  }
}

export const foodStorage = new FoodStorage();
