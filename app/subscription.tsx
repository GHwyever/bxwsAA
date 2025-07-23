import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { X, Crown, Check, Star, Leaf, TreePine, Sparkles } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import { useLanguage } from '@/hooks/useLanguage';
import { useSubscription } from '@/hooks/useSubscription';

export default function SubscriptionScreen() {
  const [selectedPlan, setSelectedPlan] = useState<'monthly' | 'yearly' | 'lifetime'>('yearly');
  const router = useRouter();
  const { t } = useLanguage();
  const { subscribe } = useSubscription();

  const plans = [
    {
      id: 'monthly',
      name: t('monthlyPlan'),
      price: '$8',
      period: t('month'),
      originalPrice: null,
      savings: null,
      popular: false,
    },
    {
      id: 'yearly',
      name: t('yearlyPlan'),
      price: '$88',
      period: t('year'),
      originalPrice: '$96',
      savings: t('save8'),
      popular: true,
    },
    {
      id: 'lifetime',
      name: t('lifetimePlan'),
      price: '$128',
      period: t('lifetime'),
      originalPrice: '$288',
      savings: t('limitedTime'),
      popular: false,
    },
  ];

  const features = [
    t('unlimitedItems'),
    t('smartNotifications'),
    t('photoRecognition'),
    t('multiDeviceSync'),
    t('advancedAnalytics'),
    t('prioritySupport'),
  ];

  const handleSubscribe = async () => {
    try {
      await subscribe(selectedPlan);
      Alert.alert(
        t('subscriptionSuccess'),
        t('subscriptionSuccessMessage'),
        [
          { text: t('ok'), onPress: () => router.back() },
        ]
      );
    } catch (error) {
      Alert.alert(t('error'), t('subscriptionError'));
    }
  };

  const handleClose = () => {
    router.back();
  };

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={['#667eea', '#764ba2', '#f093fb']}
        style={styles.header}
      >
        <View style={styles.headerTop}>
          <TouchableOpacity onPress={handleClose}>
            <X size={24} color="#FFFFFF" />
          </TouchableOpacity>
          <View style={styles.headerIcon}>
            <Crown size={24} color="#FFFFFF" />
          </View>
        </View>
        
        <View style={styles.headerContent}>
          <View style={styles.titleRow}>
            <TreePine size={28} color="#FFFFFF" />
            <Text style={styles.headerTitle}>{t('upgradeToPremium')}</Text>
          </View>
          <Text style={styles.headerSubtitle}>{t('unlockAllFeatures')}</Text>
          
          {/* Premium decorations */}
          <View style={styles.ecoDecorations}>
            <View style={styles.leafFloat1}>
              <Leaf size={16} color="rgba(255, 255, 255, 0.4)" />
            </View>
            <View style={styles.leafFloat2}>
              <Leaf size={12} color="rgba(255, 255, 255, 0.3)" />
            </View>
            <View style={styles.sparkleFloat}>
              <Sparkles size={10} color="rgba(255, 255, 255, 0.5)" />
            </View>
          </View>
        </View>
      </LinearGradient>

      <ScrollView style={styles.content}>
        <View style={styles.trialBanner}>
          <Star size={18} color="#f59e0b" />
          <Text style={styles.trialText}>🌱 {t('freeTrial7Days')}</Text>
        </View>

        <View style={styles.featuresSection}>
          <View style={styles.featuresSectionHeader}>
            <Leaf size={20} color="#667eea" />
            <Text style={styles.sectionTitle}>{t('premiumFeatures')}</Text>
          </View>
          {features.map((feature, index) => (
            <View key={index} style={styles.featureItem}>
              <LinearGradient
                colors={['#e8f2ff', '#d1e7ff']}
                style={styles.featureIcon}
              >
                <Check size={16} color="#667eea" />
              </LinearGradient>
              <Text style={styles.featureText}>{feature}</Text>
            </View>
          ))}
        </View>

        <View style={styles.plansSection}>
          <Text style={styles.sectionTitle}>{t('choosePlan')}</Text>
          {plans.map((plan) => (
            <TouchableOpacity
              key={plan.id}
              style={[
                styles.planCard,
                selectedPlan === plan.id && styles.planCardSelected,
                plan.popular && styles.planCardPopular,
              ]}
              onPress={() => setSelectedPlan(plan.id as any)}
            >
              {plan.popular && (
                <LinearGradient
                  colors={['#f59e0b', '#d97706']}
                  style={styles.popularBadge}
                >
                  <Text style={styles.popularText}>🌟 {t('mostPopular')}</Text>
                </LinearGradient>
              )}
              <View style={styles.planHeader}>
                <View style={styles.planInfo}>
                  <Text style={styles.planName}>{plan.name}</Text>
                  <View style={styles.planPricing}>
                    <Text style={styles.planPrice}>{plan.price}</Text>
                    <Text style={styles.planPeriod}>/{plan.period}</Text>
                  </View>
                  {plan.originalPrice && (
                    <View style={styles.savingsContainer}>
                      <Text style={styles.originalPrice}>{plan.originalPrice}</Text>
                      <Text style={styles.savings}>{plan.savings}</Text>
                    </View>
                  )}
                </View>
                <View style={styles.planRadio}>
                  <View
                    style={[
                      styles.radioOuter,
                      selectedPlan === plan.id && styles.radioOuterSelected,
                    ]}
                  >
                    {selectedPlan === plan.id && <View style={styles.radioInner} />}
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        <TouchableOpacity style={styles.subscribeButton} onPress={handleSubscribe}>
          <LinearGradient
            colors={['#667eea', '#764ba2']}
            style={styles.subscribeButtonGradient}
          >
            <TreePine size={20} color="#FFFFFF" />
            <Text style={styles.subscribeButtonText}>{t('startFreeTrial')}</Text>
          </LinearGradient>
        </TouchableOpacity>

        <View style={styles.disclaimer}>
          <Text style={styles.disclaimerText}>{t('subscriptionDisclaimer')}</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0fdf4',
  },
  header: {
    paddingHorizontal: 20,
    paddingBottom: 30,
    position: 'relative',
    overflow: 'hidden',
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  headerIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerContent: {
    alignItems: 'center',
    position: 'relative',
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  headerTitle: {
    fontSize: 24,
    fontFamily: 'Inter-Bold',
    color: '#FFFFFF',
    marginLeft: 8,
  },
  headerSubtitle: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: 'rgba(255, 255, 255, 0.9)',
    textAlign: 'center',
  },
  ecoDecorations: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  leafFloat1: {
    position: 'absolute',
    top: -10,
    right: 20,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    transform: [{ rotate: '15deg' }],
  },
  leafFloat2: {
    position: 'absolute',
    bottom: -5,
    left: 30,
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    transform: [{ rotate: '-20deg' }],
  },
  sparkleFloat: {
    position: 'absolute',
    top: 20,
    left: 50,
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  trialBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fffbeb',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
    marginTop: 20,
    marginBottom: 30,
    borderWidth: 1,
    borderColor: '#fde68a',
  },
  trialText: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#d97706',
    marginLeft: 8,
  },
  featuresSection: {
    marginBottom: 30,
  },
  featuresSectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
    color: '#667eea',
    marginLeft: 6,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#f3f4f6',
  },
  featureIcon: {
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  featureText: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#374151',
    flex: 1,
  },
  plansSection: {
    marginBottom: 30,
  },
  planCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    marginBottom: 12,
    borderWidth: 2,
    borderColor: '#f3f4f6',
    position: 'relative',
  },
  planCardSelected: {
    borderColor: '#667eea',
    backgroundColor: '#f0fdf4',
  },
  planCardPopular: {
    borderColor: '#f59e0b',
  },
  popularBadge: {
    position: 'absolute',
    top: -8,
    left: 20,
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  popularText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontFamily: 'Inter-Medium',
  },
  planHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  planInfo: {
    flex: 1,
  },
  planName: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#667eea',
    marginBottom: 4,
  },
  planPricing: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginBottom: 4,
  },
  planPrice: {
    fontSize: 24,
    fontFamily: 'Inter-Bold',
    color: '#667eea',
  },
  planPeriod: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#6b7280',
    marginLeft: 4,
  },
  savingsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  originalPrice: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#9ca3af',
    textDecorationLine: 'line-through',
    marginRight: 8,
  },
  savings: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#667eea',
  },
  planRadio: {
    marginLeft: 16,
  },
  radioOuter: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#d1d5db',
    justifyContent: 'center',
    alignItems: 'center',
  },
  radioOuterSelected: {
    borderColor: '#667eea',
  },
  radioInner: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#667eea',
  },
  subscribeButton: {
    marginBottom: 20,
    borderRadius: 16,
    elevation: 8,
    shadowColor: '#667eea',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  subscribeButtonGradient: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 16,
    borderRadius: 16,
  },
  subscribeButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    marginLeft: 8,
  },
  disclaimer: {
    paddingBottom: 120,
  },
  disclaimerText: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#9ca3af',
    textAlign: 'center',
    lineHeight: 18,
  },
});
