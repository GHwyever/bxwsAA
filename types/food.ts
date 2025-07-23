export enum FoodCategory {
  Fruits = 'fruits',
  Vegetables = 'vegetables',
  Meat = 'meat',
  Dairy = 'dairy',
  Grains = 'grains',
  Snacks = 'snacks',
  Beverages = 'beverages',
  Other = 'other',
}

export interface FoodItem {
  id: string;
  name: string;
  category: FoodCategory;
  productionDate: Date;
  expiryDate: Date;
  imageUri?: string;
  productionImageUri?: string;
  expiryImageUri?: string;
  createdAt: Date;
}

export interface NotificationSettings {
  enabled: boolean;
  days: number[];
}
