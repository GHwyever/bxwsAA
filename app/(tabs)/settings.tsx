import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  Switch,
  Modal,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { 
  Bell, 
  Crown, 
  Shield, 
  CircleHelp as HelpCircle, 
  Star, 
  MessageCircle,
  ChevronRight, 
  Trash2, 
  Volume2,
  User,
  Leaf,
  Sparkles,
  Settings as SettingsIcon,
  Globe,
  Check,
  X
} from 'lucide-react-native';
import { useRouter } from 'expo-router';
import { useLanguage } from '@/hooks/useLanguage';
import { useSubscription } from '@/hooks/useSubscription';
import { useNotifications } from '@/hooks/useNotifications';
import { voiceManager } from '@/utils/voiceNotifications';
import { foodStorage } from '@/utils/storage';
import { ratingStorage } from '@/utils/ratingStorage';
import { VoiceSettingsModal } from '@/components/VoiceSettingsModal';
import { FeedbackModal } from '@/components/FeedbackModal';

export default function SettingsScreen() {
  const [showVoiceSettings, setShowVoiceSettings] = useState(false);
  const [showLanguageModal, setShowLanguageModal] = useState(false);
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);
  const router = useRouter();
  const { t, language, changeLanguage, getSupportedLanguages } = useLanguage();
  const { isSubscribed, subscriptionType } = useSubscription();
  const { notificationsEnabled, toggleNotifications } = useNotifications();

  // 设置语音管理器的当前语言
  useEffect(() => {
    voiceManager.setCurrentLanguage(language);
    voiceManager.setTranslateFunction(t);
  }, [language, t]);

  const handleClearAllData = () => {
    Alert.alert(
      t('clearDataTitle'),
      t('clearDataMessage'),
      [
        { text: t('cancel'), style: 'cancel' },
        {
          text: t('clear'),
          style: 'destructive',
          onPress: async () => {
            try {
              await foodStorage.clearAll();
              await ratingStorage.clearAllRatings();
              Alert.alert(t('success'), t('dataCleared'));
            } catch (error) {
              Alert.alert(t('error'), t('clearDataError'));
            }
          },
        },
      ]
    );
  };

  const handleSubscription = () => {
    router.push('/subscription');
  };

  const handleRateApp = () => {
    Alert.alert(
      t('rateAppTitle'),
      t('rateAppMessage'),
      [
        { text: t('later'), style: 'cancel' },
        { text: t('rate'), onPress: () => console.log('Rate app') },
      ]
    );
  };

  const handleHelp = () => {
    Alert.alert(
      t('helpTitle'),
      t('helpMessage'),
      [{ text: t('ok') }]
    );
  };

  const handlePrivacy = () => {
    router.push('/privacy-policy');
  };

  const settingItems = [
    {
      icon: <Bell size={20} color="#667eea" />,
      title: t('notifications'),
      subtitle: t('notificationsSubtitle'),
      action: 'switch',
      value: notificationsEnabled,
      onPress: toggleNotifications,
      colors: ['#e8f2ff', '#d1e7ff'],
    },
    {
      icon: <Star size={20} color="#f59e0b" />,
      title: t('ratingsAndReviews'),
      subtitle: t('viewAndManageRatings'),
      action: 'arrow',
      onPress: () => router.push('/ratings'),
      colors: ['#fffbeb', '#fef3c7'],
    },
    {
      icon: <MessageCircle size={20} color="#10b981" />,
      title: t('sendFeedback'),
      subtitle: t('helpUsImprove'),
      action: 'arrow',
      onPress: () => setShowFeedbackModal(true),
      colors: ['#ecfdf5', '#d1fae5'],
    },
    {
      icon: <Volume2 size={20} color="#764ba2" />,
      title: t('voiceReminders'),
      subtitle: t('voiceRemindersSubtitle'),
      action: 'arrow',
      onPress: () => setShowVoiceSettings(true),
      colors: ['#f3e8ff', '#e9d5ff'],
    },
    {
      icon: <Globe size={20} color="#10b981" />,
      title: t('language'),
      subtitle: getSupportedLanguages().find(lang => lang.code === language)?.nativeName || 'English',
      action: 'arrow',
      onPress: () => setShowLanguageModal(true),
      colors: ['#ecfdf5', '#d1fae5'],
    },
    {
      icon: <Crown size={20} color="#f59e0b" />,
      title: t('subscription'),
      subtitle: isSubscribed ? t(subscriptionType) : t('freeTrial'),
      action: 'arrow',
      onPress: handleSubscription,
      premium: !isSubscribed,
      colors: ['#fffbeb', '#fef3c7'],
    },
    {
      icon: <Star size={20} color="#f093fb" />,
      title: t('rateApp'),
      subtitle: t('rateAppSubtitle'),
      action: 'arrow',
      onPress: handleRateApp,
      colors: ['#fdf2f8', '#fce7f3'],
    },
    {
      icon: <HelpCircle size={20} color="#667eea" />,
      title: t('help'),
      subtitle: t('helpSubtitle'),
      action: 'arrow',
      onPress: handleHelp,
      colors: ['#e8f2ff', '#d1e7ff'],
    },
    {
      icon: <Shield size={20} color="#059669" />,
      title: t('privacy'),
      subtitle: t('privacySubtitle'),
      action: 'arrow',
      onPress: handlePrivacy,
      colors: ['#ecfdf5', '#d1fae5'],
    },
    {
      icon: <Trash2 size={20} color="#dc2626" />,
      title: t('clearData'),
      subtitle: t('clearDataSubtitle'),
      action: 'arrow',
      onPress: handleClearAllData,
      destructive: true,
      colors: ['#fef2f2', '#fee2e2'],
    },
  ];

  return (
    <View style={styles.container}>
      {/* Premium gradient header */}
      <LinearGradient
        colors={['#667eea', '#764ba2', '#f093fb']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.header}
      >
        <SafeAreaView>
          <View style={styles.headerContent}>
            <View style={styles.profileSection}>
              <View style={styles.avatarContainer}>
                <LinearGradient
                  colors={['rgba(255, 255, 255, 0.3)', 'rgba(255, 255, 255, 0.1)']}
                  style={styles.avatar}
                >
                  <User size={24} color="#FFFFFF" />
                </LinearGradient>
                
                {/* Decorative icon */}
                <View style={styles.avatarDecoration}>
                  <SettingsIcon size={14} color="#FFFFFF" />
                </View>
              </View>
              
              <View style={styles.profileInfo}>
                <Text style={styles.profileName}>{t('appTitle')} {t('settings')}</Text>
                <View style={styles.statusContainer}>
                  <View style={styles.statusDot} />
                  <Text style={styles.profileStatus}>
                    {isSubscribed ? t('premiumMember') : t('freeUser')}
                  </Text>
                </View>
              </View>
              
              <View style={styles.headerIcon}>
                <Sparkles size={24} color="rgba(255, 255, 255, 0.6)" />
              </View>
            </View>
          </View>
        </SafeAreaView>
      </LinearGradient>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.settingsContainer}>
          {settingItems.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.settingItem,
                index === settingItems.length - 1 && styles.lastItem,
              ]}
              onPress={item.onPress}
            >
              <LinearGradient
                colors={['#FFFFFF', '#fafbfc']}
                style={styles.settingItemGradient}
              >
                <View style={styles.settingItemContent}>
                  <View style={styles.settingItemLeft}>
                    <LinearGradient
                      colors={item.colors}
                      style={styles.iconContainer}
                    >
                      {item.icon}
                    </LinearGradient>
                    
                    <View style={styles.textContainer}>
                      <View style={styles.titleRow}>
                        <Text style={[
                          styles.settingTitle,
                          item.destructive && styles.destructiveText,
                        ]}>
                          {item.title}
                        </Text>
                        {item.premium && (
                          <LinearGradient
                            colors={['#f59e0b', '#f97316']}
                            style={styles.premiumBadge}
                          >
                            <Text style={styles.premiumBadgeText}>PRO</Text>
                          </LinearGradient>
                        )}
                      </View>
                      <Text style={styles.settingSubtitle}>{item.subtitle}</Text>
                    </View>
                  </View>
                  
                  <View style={styles.settingItemRight}>
                    {item.action === 'switch' ? (
                      <Switch
                        value={item.value}
                        onValueChange={item.onPress}
                        trackColor={{ false: '#e2e8f0', true: '#667eea' }}
                        thumbColor="#FFFFFF"
                      />
                    ) : (
                      <LinearGradient
                        colors={['#f8fafc', '#e2e8f0']}
                        style={styles.arrowContainer}
                      >
                        <ChevronRight size={18} color="#94a3b8" />
                      </LinearGradient>
                    )}
                  </View>
                </View>
                
                {/* Decorative elements */}
                <View style={styles.itemDecorations}>
                  <View style={styles.itemSparkle}>
                    <Sparkles size={4} color="#667eea" />
                  </View>
                  <View style={styles.itemGlow} />
                </View>
              </LinearGradient>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.footer}>
          <LinearGradient
            colors={['#fafbfc', '#e2e8f0']}
            style={styles.footerGradient}
          >
            <Leaf size={16} color="#64748b" />
            <Text style={styles.footerText}>{t('appVersion')}: 1.0.0</Text>
          </LinearGradient>
          <Text style={styles.footerSubtext}>{t('madeWithLove')}</Text>
        </View>
      </ScrollView>
      
      <VoiceSettingsModal
        visible={showVoiceSettings}
        onClose={() => setShowVoiceSettings(false)}
      />
      
      <LanguageModal
        visible={showLanguageModal}
        onClose={() => setShowLanguageModal(false)}
        currentLanguage={language}
        onLanguageChange={changeLanguage}
        supportedLanguages={getSupportedLanguages()}
      />
    
    <FeedbackModal
      visible={showFeedbackModal}
      onClose={() => setShowFeedbackModal(false)}
    />
    </View>
  );
}

// 语言选择模态框组件
function LanguageModal({ 
  visible, 
  onClose, 
  currentLanguage, 
  onLanguageChange, 
  supportedLanguages 
}: {
  visible: boolean;
  onClose: () => void;
  currentLanguage: string;
  onLanguageChange: (language: any) => void;
  supportedLanguages: Array<{ code: string; name: string; nativeName: string }>;
}) {
  const { t } = useLanguage();

  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="pageSheet"
      onRequestClose={onClose}
    >
      <View style={languageModalStyles.container}>
        <View style={languageModalStyles.header}>
          <Text style={languageModalStyles.title}>{t('language')}</Text>
          <TouchableOpacity onPress={onClose}>
            <X size={24} color="#1F2937" />
          </TouchableOpacity>
        </View>

        <ScrollView style={languageModalStyles.content}>
          {supportedLanguages.map((lang) => (
            <TouchableOpacity
              key={lang.code}
              style={[
                languageModalStyles.languageItem,
                currentLanguage === lang.code && languageModalStyles.selectedLanguageItem,
              ]}
              onPress={() => {
                onLanguageChange(lang.code);
                onClose();
              }}
            >
              <View style={languageModalStyles.languageInfo}>
                <Text style={languageModalStyles.languageName}>{lang.nativeName}</Text>
                <Text style={languageModalStyles.languageSubname}>{lang.name}</Text>
              </View>
              {currentLanguage === lang.code && (
                <Check size={20} color="#6366F1" />
              )}
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    </Modal>
  );
}

const languageModalStyles = StyleSheet.create({
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
  languageItem: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  selectedLanguageItem: {
    borderColor: '#6366F1',
    backgroundColor: '#F0F4FF',
  },
  languageInfo: {
    flex: 1,
  },
  languageName: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#1F2937',
    marginBottom: 2,
  },
  languageSubname: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
  },
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  header: {
    paddingBottom: 32,
  },
  headerContent: {
    paddingHorizontal: 24,
    paddingTop: 16,
  },
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatarContainer: {
    position: 'relative',
    marginRight: 16,
  },
  avatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  avatarDecoration: {
    position: 'absolute',
    top: -4,
    right: -4,
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  profileInfo: {
    flex: 1,
  },
  profileName: {
    fontSize: 20,
    fontFamily: 'Inter-Bold',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#f093fb',
    marginRight: 8,
  },
  profileStatus: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: 'rgba(255, 255, 255, 0.8)',
  },
  headerIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    flex: 1,
    marginTop: -16,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    backgroundColor: '#f8fafc',
  },
  settingsContainer: {
    paddingHorizontal: 24,
    paddingTop: 32,
  },
  settingItem: {
    borderRadius: 20,
    marginBottom: 12,
    overflow: 'hidden',
    elevation: 6,
    shadowColor: '#667eea',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
  },
  settingItemGradient: {
    position: 'relative',
  },
  settingItemContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 18,
  },
  settingItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  iconContainer: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  textContainer: {
    flex: 1,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  settingTitle: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#1e293b',
  },
  destructiveText: {
    color: '#dc2626',
  },
  premiumBadge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8,
    marginLeft: 8,
  },
  premiumBadgeText: {
    fontSize: 10,
    fontFamily: 'Inter-Bold',
    color: '#FFFFFF',
  },
  settingSubtitle: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#64748b',
  },
  settingItemRight: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  arrowContainer: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemDecorations: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    pointerEvents: 'none',
  },
  itemSparkle: {
    position: 'absolute',
    top: 12,
    right: 60,
    opacity: 0.4,
  },
  itemGlow: {
    position: 'absolute',
    top: -3,
    right: -3,
    width: 15,
    height: 15,
    borderRadius: 7.5,
    backgroundColor: 'rgba(102, 126, 234, 0.05)',
  },
  lastItem: {
    marginBottom: 24,
  },
  footer: {
    alignItems: 'center',
    paddingVertical: 32,
    paddingBottom: 120,
    paddingHorizontal: 24,
  },
  footerGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 12,
    marginBottom: 8,
  },
  footerText: {
    fontSize: 13,
    fontFamily: 'Inter-Medium',
    color: '#64748b',
    marginLeft: 8,
  },
  footerSubtext: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#94a3b8',
  },
});
