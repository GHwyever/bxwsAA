import { Platform } from 'react-native';

export interface FoodRecognitionResult {
  name: string;
  confidence: number;
  category: string;
}

// 食物类别映射
const foodCategoryMapping: { [key: string]: string } = {
  // 水果
  'apple': 'fruits',
  'banana': 'fruits',
  'orange': 'fruits',
  'grape': 'fruits',
  'strawberry': 'fruits',
  'watermelon': 'fruits',
  'pineapple': 'fruits',
  'mango': 'fruits',
  'peach': 'fruits',
  'pear': 'fruits',
  'cherry': 'fruits',
  'kiwi': 'fruits',
  'lemon': 'fruits',
  'lime': 'fruits',
  'avocado': 'fruits',
  
  // 蔬菜
  'tomato': 'vegetables',
  'carrot': 'vegetables',
  'broccoli': 'vegetables',
  'lettuce': 'vegetables',
  'spinach': 'vegetables',
  'potato': 'vegetables',
  'onion': 'vegetables',
  'garlic': 'vegetables',
  'cucumber': 'vegetables',
  'pepper': 'vegetables',
  'cabbage': 'vegetables',
  'corn': 'vegetables',
  'mushroom': 'vegetables',
  'celery': 'vegetables',
  'eggplant': 'vegetables',
  
  // 肉类
  'chicken': 'meat',
  'beef': 'meat',
  'pork': 'meat',
  'fish': 'meat',
  'salmon': 'meat',
  'tuna': 'meat',
  'shrimp': 'meat',
  'crab': 'meat',
  'lobster': 'meat',
  'turkey': 'meat',
  'duck': 'meat',
  'lamb': 'meat',
  'bacon': 'meat',
  'sausage': 'meat',
  'ham': 'meat',
  
  // 乳制品
  'milk': 'dairy',
  'cheese': 'dairy',
  'yogurt': 'dairy',
  'butter': 'dairy',
  'cream': 'dairy',
  'ice cream': 'dairy',
  
  // 谷物
  'bread': 'grains',
  'rice': 'grains',
  'pasta': 'grains',
  'noodle': 'grains',
  'cereal': 'grains',
  'oats': 'grains',
  'quinoa': 'grains',
  'wheat': 'grains',
  
  // 零食
  'cookie': 'snacks',
  'chip': 'snacks',
  'chocolate': 'snacks',
  'candy': 'snacks',
  'cake': 'snacks',
  'biscuit': 'snacks',
  'cracker': 'snacks',
  
  // 饮料
  'juice': 'beverages',
  'soda': 'beverages',
  'water': 'beverages',
  'tea': 'beverages',
  'coffee': 'beverages',
  'beer': 'beverages',
  'wine': 'beverages',
};

// 中文食物名称映射
const chineseFoodNames: { [key: string]: string } = {
  'apple': '苹果',
  'banana': '香蕉',
  'orange': '橙子',
  'grape': '葡萄',
  'strawberry': '草莓',
  'watermelon': '西瓜',
  'pineapple': '菠萝',
  'mango': '芒果',
  'peach': '桃子',
  'pear': '梨',
  'cherry': '樱桃',
  'kiwi': '猕猴桃',
  'lemon': '柠檬',
  'lime': '青柠',
  'avocado': '牛油果',
  'tomato': '番茄',
  'carrot': '胡萝卜',
  'broccoli': '西兰花',
  'lettuce': '生菜',
  'spinach': '菠菜',
  'potato': '土豆',
  'onion': '洋葱',
  'garlic': '大蒜',
  'cucumber': '黄瓜',
  'pepper': '辣椒',
  'cabbage': '白菜',
  'corn': '玉米',
  'mushroom': '蘑菇',
  'celery': '芹菜',
  'eggplant': '茄子',
  'chicken': '鸡肉',
  'beef': '牛肉',
  'pork': '猪肉',
  'fish': '鱼',
  'salmon': '三文鱼',
  'tuna': '金枪鱼',
  'shrimp': '虾',
  'crab': '螃蟹',
  'lobster': '龙虾',
  'turkey': '火鸡',
  'duck': '鸭肉',
  'lamb': '羊肉',
  'bacon': '培根',
  'sausage': '香肠',
  'ham': '火腿',
  'milk': '牛奶',
  'cheese': '奶酪',
  'yogurt': '酸奶',
  'butter': '黄油',
  'cream': '奶油',
  'ice cream': '冰淇淋',
  'bread': '面包',
  'rice': '米饭',
  'pasta': '意大利面',
  'noodle': '面条',
  'cereal': '谷物',
  'oats': '燕麦',
  'quinoa': '藜麦',
  'wheat': '小麦',
  'cookie': '饼干',
  'chip': '薯片',
  'chocolate': '巧克力',
  'candy': '糖果',
  'cake': '蛋糕',
  'biscuit': '饼干',
  'cracker': '苏打饼干',
  'juice': '果汁',
  'soda': '汽水',
  'water': '水',
  'tea': '茶',
  'coffee': '咖啡',
  'beer': '啤酒',
  'wine': '红酒',
};

// 模拟AI识别结果（实际应用中会调用真实的AI服务）
const mockRecognitionResults: { [key: string]: FoodRecognitionResult[] } = {
  'apple': [
    { name: 'apple', confidence: 0.95, category: 'fruits' },
    { name: 'red apple', confidence: 0.88, category: 'fruits' },
  ],
  'banana': [
    { name: 'banana', confidence: 0.92, category: 'fruits' },
  ],
  'bread': [
    { name: 'bread', confidence: 0.89, category: 'grains' },
    { name: 'white bread', confidence: 0.85, category: 'grains' },
  ],
  'chicken': [
    { name: 'chicken', confidence: 0.91, category: 'meat' },
    { name: 'chicken breast', confidence: 0.87, category: 'meat' },
  ],
  'milk': [
    { name: 'milk', confidence: 0.94, category: 'dairy' },
  ],
};

export class FoodRecognitionService {
  private static instance: FoodRecognitionService;

  static getInstance(): FoodRecognitionService {
    if (!FoodRecognitionService.instance) {
      FoodRecognitionService.instance = new FoodRecognitionService();
    }
    return FoodRecognitionService.instance;
  }

  async recognizeFood(imageUri: string, language: 'en' | 'zh' = 'en'): Promise<FoodRecognitionResult | null> {
    try {
      // 在实际应用中，这里会调用真实的AI服务
      // 例如 Google Vision API, Azure Computer Vision, 或自定义的机器学习模型
      
      if (Platform.OS === 'web') {
        return await this.recognizeFoodWeb(imageUri, language);
      } else {
        return await this.recognizeFoodMobile(imageUri, language);
      }
    } catch (error) {
      console.error('食物识别失败:', error);
      return null;
    }
  }

  private async recognizeFoodWeb(imageUri: string, language: 'en' | 'zh'): Promise<FoodRecognitionResult | null> {
    // Web平台使用模拟识别
    return this.simulateRecognition(language);
  }

  private async recognizeFoodMobile(imageUri: string, language: 'en' | 'zh'): Promise<FoodRecognitionResult | null> {
    // 移动端可以集成真实的AI服务
    // 这里先使用模拟识别
    return this.simulateRecognition(language);
  }

  private async simulateRecognition(language: 'en' | 'zh'): Promise<FoodRecognitionResult | null> {
    // 模拟网络延迟
    await new Promise(resolve => setTimeout(resolve, 1500));

    // 随机选择一个食物进行模拟识别
    const foodKeys = Object.keys(mockRecognitionResults);
    const randomFood = foodKeys[Math.floor(Math.random() * foodKeys.length)];
    const results = mockRecognitionResults[randomFood];
    
    if (results && results.length > 0) {
      const bestResult = results[0];
      
      // 根据语言返回对应的名称
      const localizedName = language === 'zh' 
        ? chineseFoodNames[bestResult.name] || bestResult.name
        : bestResult.name;

      return {
        ...bestResult,
        name: localizedName,
      };
    }

    return null;
  }

  // 获取食物的默认保质期（天数）
  getDefaultShelfLife(foodName: string, category: string): number {
    const shelfLifeMap: { [key: string]: number } = {
      // 水果
      'fruits': 7,
      'apple': 14,
      'banana': 5,
      'orange': 10,
      'grape': 7,
      'strawberry': 3,
      'watermelon': 7,
      'pineapple': 5,
      'mango': 5,
      'peach': 5,
      'pear': 7,
      'cherry': 3,
      'kiwi': 7,
      'lemon': 21,
      'lime': 14,
      'avocado': 5,
      
      // 蔬菜
      'vegetables': 5,
      'tomato': 7,
      'carrot': 14,
      'broccoli': 5,
      'lettuce': 7,
      'spinach': 5,
      'potato': 30,
      'onion': 21,
      'garlic': 30,
      'cucumber': 7,
      'pepper': 7,
      'cabbage': 14,
      'corn': 3,
      'mushroom': 5,
      'celery': 7,
      'eggplant': 7,
      
      // 肉类
      'meat': 3,
      'chicken': 2,
      'beef': 3,
      'pork': 3,
      'fish': 2,
      'salmon': 2,
      'tuna': 2,
      'shrimp': 2,
      'crab': 2,
      'lobster': 2,
      'turkey': 3,
      'duck': 3,
      'lamb': 3,
      'bacon': 7,
      'sausage': 7,
      'ham': 7,
      
      // 乳制品
      'dairy': 7,
      'milk': 7,
      'cheese': 14,
      'yogurt': 7,
      'butter': 14,
      'cream': 5,
      'ice cream': 30,
      
      // 谷物
      'grains': 30,
      'bread': 5,
      'rice': 365,
      'pasta': 365,
      'noodle': 365,
      'cereal': 365,
      'oats': 365,
      'quinoa': 365,
      'wheat': 365,
      
      // 零食
      'snacks': 30,
      'cookie': 30,
      'chip': 30,
      'chocolate': 60,
      'candy': 90,
      'cake': 3,
      'biscuit': 30,
      'cracker': 60,
      
      // 饮料
      'beverages': 30,
      'juice': 7,
      'soda': 90,
      'water': 365,
      'tea': 365,
      'coffee': 365,
      'beer': 90,
      'wine': 365,
    };

    // 首先尝试根据具体食物名称查找
    const normalizedName = foodName.toLowerCase();
    if (shelfLifeMap[normalizedName]) {
      return shelfLifeMap[normalizedName];
    }

    // 然后根据类别查找
    if (shelfLifeMap[category]) {
      return shelfLifeMap[category];
    }

    // 默认返回7天
    return 7;
  }

  // 根据食物名称推断类别
  inferCategory(foodName: string): string {
    const normalizedName = foodName.toLowerCase();
    
    for (const [food, category] of Object.entries(foodCategoryMapping)) {
      if (normalizedName.includes(food) || food.includes(normalizedName)) {
        return category;
      }
    }
    
    return 'other';
  }
}

export const foodRecognitionService = FoodRecognitionService.getInstance();
