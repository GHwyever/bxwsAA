import * as Speech from 'expo-speech';
import { Platform } from 'react-native';
import { FoodItem } from '@/types/food';

export interface VoiceSettings {
  enabled: boolean;
  language: string;
  rate: number; // 0.1 - 2.0
  pitch: number; // 0.5 - 2.0
  volume: number; // 0.0 - 1.0
}

const defaultVoiceSettings: VoiceSettings = {
  enabled: true,
  language: 'auto',
  rate: 0.8,
  pitch: 1.0,
  volume: 0.8,
};

export class VoiceNotificationManager {
  private static instance: VoiceNotificationManager;
  private settings: VoiceSettings = defaultVoiceSettings;
  private currentLanguage: string = 'en';
  private translateFunction: ((key: string, params?: any) => string) | null = null;

  static getInstance(): VoiceNotificationManager {
    if (!VoiceNotificationManager.instance) {
      VoiceNotificationManager.instance = new VoiceNotificationManager();
    }
    return VoiceNotificationManager.instance;
  }

  async updateSettings(newSettings: Partial<VoiceSettings>) {
    this.settings = { ...this.settings, ...newSettings };
  }

  setCurrentLanguage(language: string) {
    this.currentLanguage = language;
  }

  setTranslateFunction(t: (key: string, params?: any) => string) {
    this.translateFunction = t;
  }

  getSettings(): VoiceSettings {
    return this.settings;
  }

  async speak(text: string, options?: Partial<VoiceSettings>, forceLanguage?: string) {
    if (!this.settings.enabled) return;

    const voiceLanguage = forceLanguage || this.getVoiceLanguageCode();

    // Web平台检查
    if (Platform.OS === 'web') {
      // 使用Web Speech API作为备选
      if ('speechSynthesis' in window) {
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = voiceLanguage;
        utterance.rate = options?.rate || this.settings.rate;
        utterance.pitch = options?.pitch || this.settings.pitch;
        utterance.volume = options?.volume || this.settings.volume;
        window.speechSynthesis.speak(utterance);
      }
      return;
    }

    // 移动端使用expo-speech
    try {
      const speechOptions = {
        language: voiceLanguage,
        rate: options?.rate || this.settings.rate,
        pitch: options?.pitch || this.settings.pitch,
        volume: options?.volume || this.settings.volume,
      };

      await Speech.speak(text, speechOptions);
    } catch (error) {
      console.error('语音播报失败:', error);
    }
  }

  private getVoiceLanguageCode(): string {
    const voiceLanguageMap: { [key: string]: string } = {
      'en': 'en-US',
      'zh': 'zh-CN',
      'ja': 'ja-JP',
      'ko': 'ko-KR',
      'es': 'es-ES',
      'fr': 'fr-FR',
    };
    return voiceLanguageMap[this.currentLanguage] || 'en-US';
  }

  async speakFoodExpiry(food: FoodItem, daysUntilExpiry: number) {
    if (!this.translateFunction) {
      console.warn('Translation function not set for voice notifications');
      return;
    }

    const t = this.translateFunction;
    let messageKey = '';

    if (daysUntilExpiry < 0) {
      messageKey = 'voiceExpired';
    } else if (daysUntilExpiry === 0) {
      messageKey = 'voiceExpiringToday';
    } else if (daysUntilExpiry === 1) {
      messageKey = 'voiceExpiringTomorrow';
    } else if (daysUntilExpiry <= 3) {
      messageKey = 'voiceExpiringSoon';
    }

    if (messageKey) {
      const message = t(messageKey, { days: daysUntilExpiry });
      await this.speak(message);
    }
  }

  async stopSpeaking() {
    if (Platform.OS === 'web') {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    } else {
      await Speech.stop();
    }
  }

  async isSpeaking(): Promise<boolean> {
    if (Platform.OS === 'web') {
      return 'speechSynthesis' in window && window.speechSynthesis.speaking;
    } else {
      return await Speech.isSpeakingAsync();
    }
  }
}

export const voiceManager = VoiceNotificationManager.getInstance();
