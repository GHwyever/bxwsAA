import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  RefreshControl,
  Dimensions,
  StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Plus, Clock, Leaf, TriangleAlert as AlertTriangle, CircleCheck as CheckCircle, User, Chrome as Home, Sparkles, Volume2, VolumeX } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import { FoodItem } from '@/types/food';
import { foodStorage } from '@/utils/storage';
import { useLanguage } from '@/hooks/useLanguage';
import { useSubscription } from '@/hooks/useSubscription';
import { voiceManager } from '@/utils/voiceNotifications';
import { FoodCard } from '@/components/FoodCard';
import { EmptyState } from '@/components/EmptyState';
import { ExpiryReminderModal } from '@/components/ExpiryReminderModal';
import { checkExpiringItemsAndNotify } from '@/utils/notifications';

const { width, height } = Dimensions.get('window');

export default function HomeScreen() {
  const [foods, setFoods] = useState<FoodItem[]>([]);
  const [refreshing, setRefreshing] = useState(false);
  const [voiceEnabled, setVoiceEnabled] = useState(true);
  const [reminderModal, setReminderModal] = useState<{
    visible: boolean;
    food: FoodItem | null;
    daysUntilExpiry: number;
  }>({
    visible: false,
    food: null,
    daysUntilExpiry: 0,
  });
  const router = useRouter();
  const { t, language } = useLanguage();
  const { isSubscribed, checkSubscription } = useSubscription();

  const loadFoods = async () => {
    try {
      const storedFoods = await foodStorage.getAllFoods();
      setFoods(storedFoods);
      
      // Check for expiring foods
      checkForExpiringFoods(storedFoods);
    } catch (error) {
      console.error('Failed to load foods:', error);
    }
  };

  const checkForExpiringFoods = (foodList: FoodItem[]) => {
    const today = new Date();
    const expiringFood = foodList.find(food => {
      const daysUntilExpiry = Math.ceil((new Date(food.expiryDate).getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
      return daysUntilExpiry >= -1 && daysUntilExpiry <= 3;
    });

    if (expiringFood) {
      const daysUntilExpiry = Math.ceil((new Date(expiringFood.expiryDate).getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
      setReminderModal({
        visible: true,
        food: expiringFood,
        daysUntilExpiry,
      });
    }
  };

  useEffect(() => {
    loadFoods();
    checkSubscription();
    loadVoiceSettings();
    // 设置语音管理器的翻译函数
    voiceManager.setTranslateFunction(t);
  }, []);

  // 当语言切换时更新语音管理器的翻译函数
  useEffect(() => {
    voiceManager.setCurrentLanguage(language);
    voiceManager.setTranslateFunction(t);
  }, [language, t]);

  const loadVoiceSettings = async () => {
    const settings = voiceManager.getSettings();
    setVoiceEnabled(settings.enabled);
  };

  const toggleVoice = async () => {
    const newEnabled = !voiceEnabled;
    setVoiceEnabled(newEnabled);
    await voiceManager.updateSettings({ enabled: newEnabled });
    
    // 设置当前语言
    voiceManager.setCurrentLanguage(language);
    
    // Play test sound when enabling
    if (newEnabled) {
      await voiceManager.speak(t('voiceEnabled'));
    } else {
      await voiceManager.speak(t('voiceDisabled'));
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await loadFoods();
    setRefreshing(false);
  };

  const handleDeleteFood = async (id: string) => {
    Alert.alert(
      t('deleteConfirmTitle'),
      t('deleteConfirmMessage'),
      [
        { text: t('cancel'), style: 'cancel' },
        {
          text: t('delete'),
          style: 'destructive',
          onPress: async () => {
            await foodStorage.deleteFood(id);
            await loadFoods();
          },
        },
      ]
    );
  };

  const handleAddFood = () => {
    if (!isSubscribed && foods.length >= 5) {
      Alert.alert(
        t('trialLimitTitle'),
        t('trialLimitMessage'),
        [
          { text: t('cancel'), style: 'cancel' },
          {
            text: t('upgrade'),
            onPress: () => router.push('/subscription'),
          },
        ]
      );
      return;
    }
    router.push('/camera');
  };

  const getStats = () => {
    const today = new Date();
    const expired = foods.filter(food => new Date(food.expiryDate) < today);
    const expiringSoon = foods.filter(food => {
      const daysUntilExpiry = Math.ceil((new Date(food.expiryDate).getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
      return daysUntilExpiry >= 0 && daysUntilExpiry <= 3;
    });
    const fresh = foods.filter(food => {
      const daysUntilExpiry = Math.ceil((new Date(food.expiryDate).getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
      return daysUntilExpiry > 3;
    });

    return { expired, expiringSoon, fresh };
  };

  const stats = getStats();

  const handleStatsCardPress = (status: 'expired' | 'expiringSoon' | 'fresh') => {
    const params = new URLSearchParams();
    params.append('status', status);
    router.push(`/food-list?${params.toString()}`);
  };

  const handleCloseReminderModal = () => {
    setReminderModal({ visible: false, food: null, daysUntilExpiry: 0 });
  };

  const handleViewFoodDetails = () => {
    if (reminderModal.food) {
      handleCloseReminderModal();
      router.push(`/food-detail?id=${reminderModal.food.id}`);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />
      
      {/* Mint green to white gradient background */}
      <LinearGradient
        colors={['#75e0aa', '#ffffff']}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
        style={styles.background}
      >
        <SafeAreaView style={styles.safeArea}>
          <ScrollView
            style={styles.scrollView}
            contentContainerStyle={styles.scrollContent}
            refreshControl={
              <RefreshControl 
                refreshing={refreshing} 
                onRefresh={onRefresh}
                tintColor="#FFFFFF"
                colors={['#FFFFFF']}
              />
            }
            showsVerticalScrollIndicator={false}
          >
            {/* Header Section */}
            <View style={styles.headerSection}>
              {/* Voice toggle button */}
              <TouchableOpacity style={styles.voiceToggle} onPress={toggleVoice}>
                <View style={[styles.voiceToggleButton, !voiceEnabled && styles.voiceToggleDisabled]}>
                  {voiceEnabled ? (
                    <Volume2 size={20} color="#FFFFFF" strokeWidth={2} />
                  ) : (
                    <VolumeX size={20} color="#FFFFFF" strokeWidth={2} />
                  )}
                </View>
              </TouchableOpacity>
              
              <Text style={styles.appTitle}>{t('appTitle')}</Text>
              <Text style={styles.subtitle}>{t('homeSubtitle1')}</Text>
              <Text style={styles.subtitle}>{t('homeSubtitle2')}</Text>
              
              {/* Dot indicators */}
              <View style={styles.dotsContainer}>
                <View style={[styles.dot, styles.activeDot]} />
                <View style={styles.dot} />
                <View style={styles.dot} />
                <View style={styles.dot} />
                <View style={styles.dot} />
              </View>
              
              {/* Free trial button */}
              <TouchableOpacity 
                style={styles.trialButton}
                onPress={() => router.push('/subscription')}
              >
                <Text style={styles.trialButtonText}>{t('freeTrial')}</Text>
              </TouchableOpacity>
            </View>

            {/* Stats Cards */}
            <View style={styles.statsSection}>
              <TouchableOpacity 
                style={styles.statCard}
                onPress={() => handleStatsCardPress('expired')}
              >
                <View style={[styles.statCardContent, { backgroundColor: '#FF9B9B' }]}>
                  <View style={styles.statIconWrapper}>
                    <AlertTriangle size={20} color="#FFFFFF" strokeWidth={2} />
                  </View>
                  <Text style={styles.statNumber}>{stats.expired.length}</Text>
                  <Text style={styles.statLabel}>{t('expired')}</Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity 
                style={styles.statCard}
                onPress={() => handleStatsCardPress('expiringSoon')}
              >
                <View style={[styles.statCardContent, { backgroundColor: '#FFB366' }]}>
                  <View style={styles.statIconWrapper}>
                    <Clock size={20} color="#FFFFFF" strokeWidth={2} />
                  </View>
                  <Text style={styles.statNumber}>{stats.expiringSoon.length}</Text>
                  <Text style={styles.statLabel}>{t('expiringSoon')}</Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity 
                style={styles.statCard}
                onPress={() => handleStatsCardPress('fresh')}
              >
                <View style={[styles.statCardContent, { backgroundColor: '#7ED4AD' }]}>
                  <View style={styles.statIconWrapper}>
                    <Leaf size={20} color="#FFFFFF" strokeWidth={2} />
                  </View>
                  <Text style={styles.statNumber}>{stats.fresh.length}</Text>
                  <Text style={styles.statLabel}>{t('fresh')}</Text>
                </View>
              </TouchableOpacity>
            </View>

            {/* Items List Section */}
            <View style={styles.foodSection}>
              <View style={styles.foodSectionHeader}>
                <Text style={styles.foodSectionTitle}>{t('yourItems')}</Text>
                <Text style={styles.foodSectionSubtitle}>
                  {t('noItemsSubtitle')}
                </Text>
                
                {/* Decorative line */}
                <View style={styles.decorativeLine} />
              </View>

              {foods.length === 0 ? (
                <EmptyState
                  title={t('noItemsTitle')}
                  buttonText={t('addFirstItem')}
                  onButtonPress={handleAddFood}
                />
              ) : (
                <View style={styles.foodList}>
                  {foods.map((food) => (
                    <FoodCard
                      key={food.id}
                      food={food}
                      onDelete={() => handleDeleteFood(food.id)}
                      onPress={() => router.push(`/food-detail?id=${food.id}`)}
                    />
                  ))}
                </View>
              )}
            </View>

            {/* Bottom spacing */}
            <View style={styles.bottomSpacing} />
          </ScrollView>
        </SafeAreaView>
      </LinearGradient>

      {/* Expiry reminder modal */}
      <ExpiryReminderModal
        visible={reminderModal.visible}
        food={reminderModal.food}
        daysUntilExpiry={reminderModal.daysUntilExpiry}
        onClose={handleCloseReminderModal}
        onViewDetails={handleViewFoodDetails}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 100,
  },
  headerSection: {
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingTop: 60,
    paddingBottom: 50,
    position: 'relative',
  },
  voiceToggle: {
    position: 'absolute',
    top: 20,
    right: 24,
    zIndex: 10,
  },
  voiceToggleButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  voiceToggleDisabled: {
    backgroundColor: 'rgba(0, 0, 0, 0.15)',
    borderColor: 'rgba(0, 0, 0, 0.2)',
  },
  appTitle: {
    fontSize: 42,
    fontFamily: 'Inter-Bold',
    color: '#2D5A3D',
    textAlign: 'center',
    marginBottom: 20,
    letterSpacing: 1,
    textShadowColor: 'rgba(255, 255, 255, 0.8)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  subtitle: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#3A6B4A',
    textAlign: 'center',
    marginBottom: 8,
    letterSpacing: 0.5,
    textShadowColor: 'rgba(255, 255, 255, 0.6)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 1,
  },
  dotsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 32,
    gap: 8,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: 'rgba(45, 90, 61, 0.4)',
  },
  activeDot: {
    backgroundColor: '#2D5A3D',
    width: 20,
  },
  trialButton: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 32,
    paddingVertical: 12,
    borderRadius: 25,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    borderWidth: 1,
    borderColor: 'rgba(45, 90, 61, 0.1)',
  },
  trialButtonText: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#2D5A3D',
    letterSpacing: 0.5,
  },
  statsSection: {
    flexDirection: 'row',
    paddingHorizontal: 24,
    marginBottom: 40,
    gap: 12,
  },
  statCard: {
    flex: 1,
    borderRadius: 20,
    overflow: 'hidden',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  statCardContent: {
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 120,
  },
  statIconWrapper: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  statNumber: {
    fontSize: 24,
    fontFamily: 'Inter-Bold',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#FFFFFF',
    textAlign: 'center',
  },
  foodSection: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 0,
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    paddingTop: 40,
    minHeight: height * 0.5,
    flex: 1,
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
  },
  foodSectionHeader: {
    alignItems: 'center',
    paddingHorizontal: 24,
    marginBottom: 32,
  },
  foodSectionTitle: {
    fontSize: 24,
    fontFamily: 'Inter-Bold',
    color: '#666666',
    marginBottom: 12,
  },
  foodSectionSubtitle: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#999999',
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 24,
  },
  decorativeLine: {
    width: 60,
    height: 3,
    backgroundColor: '#7ED4AD',
    borderRadius: 1.5,
  },
  foodList: {
    paddingHorizontal: 24,
    gap: 16,
  },
  bottomSpacing: {
    height: 40,
  },
});
