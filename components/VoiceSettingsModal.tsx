import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  Switch,
} from 'react-native';
import Slider from '@react-native-community/slider';
import { X, Volume2, VolumeX, Play, Square } from 'lucide-react-native';
import { voiceManager, VoiceSettings } from '@/utils/voiceNotifications';
import { useLanguage } from '@/hooks/useLanguage';

interface VoiceSettingsModalProps {
  visible: boolean;
  onClose: () => void;
}

export function VoiceSettingsModal({ visible, onClose }: VoiceSettingsModalProps) {
  const { t } = useLanguage();
  const [settings, setSettings] = useState<VoiceSettings>({
    enabled: true,
    language: 'en',
    rate: 0.8,
    pitch: 1.0,
    volume: 0.8,
  });
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    if (visible) {
      loadSettings();
    }
  }, [visible]);

  const loadSettings = () => {
    const currentSettings = voiceManager.getSettings();
    setSettings(currentSettings);
  };

  const updateSetting = async (key: keyof VoiceSettings, value: any) => {
    const newSettings = { ...settings, [key]: value };
    setSettings(newSettings);
    await voiceManager.updateSettings(newSettings);
  };

  const testVoice = async () => {
    if (isPlaying) {
      await voiceManager.stopSpeaking();
      setIsPlaying(false);
      return;
    }

    setIsPlaying(true);
    const testText = t('voiceExpiringSoon', { days: 3 });
    
    try {
      await voiceManager.speak(testText);
    } finally {
      setIsPlaying(false);
    }
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="pageSheet"
      onRequestClose={onClose}
    >
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>{t('voiceSettings')}</Text>
          <TouchableOpacity onPress={onClose}>
            <X size={24} color="#1F2937" />
          </TouchableOpacity>
        </View>

        <View style={styles.content}>
          <View style={styles.settingItem}>
            <View style={styles.settingInfo}>
              <Text style={styles.settingTitle}>{t('enableVoiceReminders')}</Text>
              <Text style={styles.settingDescription}>
                {t('voiceRemindersDescription')}
              </Text>
            </View>
            <Switch
              value={settings.enabled}
              onValueChange={(value) => updateSetting('enabled', value)}
              trackColor={{ false: '#E5E7EB', true: '#6366F1' }}
              thumbColor="#FFFFFF"
            />
          </View>

          {settings.enabled && (
            <>
              <View style={styles.settingItem}>
                <Text style={styles.settingTitle}>{t('speechRate')}</Text>
                <Text style={styles.sliderValue}>{Math.round(settings.rate * 100)}%</Text>
                <Slider
                  style={styles.slider}
                  minimumValue={0.3}
                  maximumValue={2.0}
                  value={settings.rate}
                  onValueChange={(value) => updateSetting('rate', value)}
                  minimumTrackTintColor="#6366F1"
                  maximumTrackTintColor="#E5E7EB"
                  thumbStyle={styles.sliderThumb}
                />
              </View>

              <View style={styles.settingItem}>
                <Text style={styles.settingTitle}>{t('speechPitch')}</Text>
                <Text style={styles.sliderValue}>{Math.round(settings.pitch * 100)}%</Text>
                <Slider
                  style={styles.slider}
                  minimumValue={0.5}
                  maximumValue={2.0}
                  value={settings.pitch}
                  onValueChange={(value) => updateSetting('pitch', value)}
                  minimumTrackTintColor="#6366F1"
                  maximumTrackTintColor="#E5E7EB"
                  thumbStyle={styles.sliderThumb}
                />
              </View>

              <View style={styles.settingItem}>
                <Text style={styles.settingTitle}>{t('speechVolume')}</Text>
                <Text style={styles.sliderValue}>{Math.round(settings.volume * 100)}%</Text>
                <Slider
                  style={styles.slider}
                  minimumValue={0.1}
                  maximumValue={1.0}
                  value={settings.volume}
                  onValueChange={(value) => updateSetting('volume', value)}
                  minimumTrackTintColor="#6366F1"
                  maximumTrackTintColor="#E5E7EB"
                  thumbStyle={styles.sliderThumb}
                />
              </View>

              <TouchableOpacity style={styles.testButton} onPress={testVoice}>
                {isPlaying ? (
                  <Square size={20} color="#FFFFFF" />
                ) : (
                  <Play size={20} color="#FFFFFF" />
                )}
                <Text style={styles.testButtonText}>
                  {isPlaying ? t('stopTest') : t('testVoice')}
                </Text>
              </TouchableOpacity>
            </>
          )}
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  title: {
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
    color: '#1F2937',
  },
  content: {
    flex: 1,
    padding: 20,
  },
  settingItem: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  settingInfo: {
    flex: 1,
    marginBottom: 8,
  },
  settingTitle: {
    fontSize: 16,
    fontFamily: 'Inter-Medium',
    color: '#1F2937',
    marginBottom: 4,
  },
  settingDescription: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
  },
  slider: {
    width: '100%',
    height: 40,
    marginTop: 8,
  },
  sliderThumb: {
    backgroundColor: '#6366F1',
    width: 20,
    height: 20,
  },
  sliderValue: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#6366F1',
    textAlign: 'right',
  },
  testButton: {
    backgroundColor: '#6366F1',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 16,
    borderRadius: 12,
    marginTop: 20,
  },
  testButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    marginLeft: 8,
  },
});
