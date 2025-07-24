import { useState, useEffect } from 'react';

// Simple translations for the app
const translations = {
  en: {
    home: 'Home',
    addItem: 'Add Item',
    settings: 'Settings',
    appTitle: 'Food Tracker',
    saveError: 'Save Error',
    notifications: 'Notifications',
    expiryReminder: 'Expiry Reminder',
    foodDetails: 'Food Details',
    foodList: 'Food List',
    onboarding: 'Onboarding',
    privacyPolicy: 'Privacy Policy',
    subscription: 'Subscription',
    emptyState: 'No items found',
    statsCard: 'Statistics',
    voiceSettings: 'Voice Settings',
    heroSlideshow: 'Featured Items',
    foodCard: 'Food Item',
  },
  zh: {
    home: '首页',
    addItem: '添加项目',
    settings: '设置',
    appTitle: '食物追踪器',
    saveError: '保存错误',
    notifications: '通知',
    expiryReminder: '过期提醒',
    foodDetails: '食物详情',
    foodList: '食物列表',
    onboarding: '引导页面',
    privacyPolicy: '隐私政策',
    subscription: '订阅',
    emptyState: '未找到项目',
    statsCard: '统计',
    voiceSettings: '语音设置',
    heroSlideshow: '精选项目',
    foodCard: '食物项目',
  },
};

type Language = keyof typeof translations;
type TranslationKey = keyof typeof translations.en;

export function useLanguage() {
  const [language, setLanguage] = useState<Language>('en');

  const t = (key: TranslationKey): string => {
    return translations[language][key] || key;
  };

  return {
    language,
    setLanguage,
    t,
  };
}