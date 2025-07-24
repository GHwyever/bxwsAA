import { useState, useEffect } from 'react';

// Simple translations for the app
const translations = {
  en: {
    home: 'Home',
    addItem: 'Add Item',
    settings: 'Settings',
  },
  zh: {
    home: '首页',
    addItem: '添加项目',
    settings: '设置',
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