import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  Image,
  Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { X, Clock, TriangleAlert as AlertTriangle, Calendar, Leaf } from 'lucide-react-native';
import { FoodItem } from '@/types/food';
import { useLanguage } from '@/hooks/useLanguage';
import { voiceManager } from '@/utils/voiceNotifications';

const { width } = Dimensions.get('window');

interface ExpiryReminderModalProps {
  visible: boolean;
  food: FoodItem | null;
  daysUntilExpiry: number;
  onClose: () => void;
  onViewDetails: () => void;
}

export function ExpiryReminderModal({ 
  visible, 
  food, 
  daysUntilExpiry, 
  onClose, 
  onViewDetails 
}: ExpiryReminderModalProps) {
  const { t } = useLanguage();

  // 当弹窗显示时播放语音提醒
  React.useEffect(() => {
    if (visible && food) {
      playVoiceReminder();
    }
  }, [visible, food, daysUntilExpiry]);

  const playVoiceReminder = async () => {
    try {
      const settings = voiceManager.getSettings();
      if (!settings.enabled) return;

      // 设置翻译函数
      voiceManager.setTranslateFunction(t);

      // 延迟500ms播放，让弹窗动画完成
      setTimeout(() => {
        if (food) {
          voiceManager.speakFoodExpiry(food, daysUntilExpiry);
        }
      }, 500);
    } catch (error) {
      console.error('Failed to play voice reminder:', error);
    }
  };

  if (!food) return null;

  const getStatusInfo = () => {
    if (daysUntilExpiry < 0) {
      return {
        title: t('itemExpired'),
        subtitle: t('pleaseDisposeSafely'),
        icon: <AlertTriangle size={32} color="#FFFFFF" />,
        gradient: ['#FF6B6B', '#EE5A52'],
        textColor: '#FFFFFF',
        urgency: 'expired'
      };
    }
    if (daysUntilExpiry === 0) {
      return {
        title: t('itemExpiresToday'),
        subtitle: t('pleaseUseImmediately'),
        icon: <Clock size={32} color="#FFFFFF" />,
        gradient: ['#FF8A65', '#FF7043'],
        textColor: '#FFFFFF',
        urgency: 'today'
      };
    }
    if (daysUntilExpiry === 1) {
      return {
        title: t('itemExpiresTomorrow'),
        subtitle: t('pleaseUseSoon'),
        icon: <Clock size={32} color="#FFFFFF" />,
        gradient: ['#FFB74D', '#FF9800'],
        textColor: '#FFFFFF',
        urgency: 'tomorrow'
      };
    }
    if (daysUntilExpiry <= 3) {
      return {
        title: t('itemExpiresInDays', { days: daysUntilExpiry }),
        subtitle: t('pleaseNoteExpiryTime'),
        icon: <Calendar size={32} color="#FFFFFF" />,
        gradient: ['#FFD54F', '#FFC107'],
        textColor: '#FFFFFF',
        urgency: 'soon'
      };
    }
    return {
      title: t('itemInGoodCondition'),
      subtitle: t('stayFresh'),
      icon: <Leaf size={32} color="#FFFFFF" />,
      gradient: ['#81C784', '#4CAF50'],
      textColor: '#FFFFFF',
      urgency: 'fresh'
    };
  };

  const statusInfo = getStatusInfo();

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          {/* Header status area */}
          <LinearGradient
            colors={statusInfo.gradient}
            style={styles.header}
          >
            <TouchableOpacity style={styles.closeButton} onPress={onClose}>
              <X size={24} color="#FFFFFF" />
            </TouchableOpacity>
            
            <View style={styles.statusSection}>
              <View style={styles.iconContainer}>
                {statusInfo.icon}
              </View>
              <Text style={styles.statusTitle}>{statusInfo.title}</Text>
              <Text style={styles.statusSubtitle}>{statusInfo.subtitle}</Text>
            </View>
            
            {/* Decorative elements */}
            <View style={styles.headerDecorations}>
              <View style={styles.decoration1} />
              <View style={styles.decoration2} />
            </View>
          </LinearGradient>

          {/* Item info area */}
          <View style={styles.content}>
            <View style={styles.foodSection}>
              {/* Item image */}
              <View style={styles.imageContainer}>
                {food.imageUri ? (
                  <Image source={{ uri: food.imageUri }} style={styles.foodImage} />
                ) : (
                  <LinearGradient
                    colors={['#E8F5E8', '#F0F8F0']}
                    style={styles.placeholderImage}
                  >
                    <Calendar size={40} color="#7ED4AD" />
                  </LinearGradient>
                )}
                
                {/* Days label */}
                <View style={styles.daysLabel}>
                  <LinearGradient
                    colors={statusInfo.gradient}
                    style={styles.daysLabelGradient}
                  >
                    <Text style={styles.daysText}>
                      {daysUntilExpiry < 0 ? 'Expired' : 
                       daysUntilExpiry === 0 ? 'Today' :
                       daysUntilExpiry === 1 ? 'Tomorrow' :
                       `${daysUntilExpiry} days`}
                    </Text>
                  </LinearGradient>
                </View>
              </View>

              {/* Item details */}
              <View style={styles.foodDetails}>
                <Text style={styles.foodName}>{t('item')}</Text>
                
                <View style={styles.dateInfo}>
                  <View style={styles.dateRow}>
                    <Text style={styles.dateLabel}>{t('expiryDate')}:</Text>
                    <Text style={[styles.dateValue, { color: statusInfo.gradient[0] }]}>
                      {food.expiryDate.toLocaleDateString()}
                    </Text>
                  </View>
                </View>
              </View>
            </View>

            {/* Action buttons */}
            <View style={styles.actions}>
              <TouchableOpacity style={styles.secondaryButton} onPress={onClose}>
                <Text style={styles.secondaryButtonText}>{t('remindLater')}</Text>
              </TouchableOpacity>
              
              <TouchableOpacity style={styles.primaryButton} onPress={onViewDetails}>
                <LinearGradient
                  colors={statusInfo.gradient}
                  style={styles.primaryButtonGradient}
                >
                  <Text style={styles.primaryButtonText}>{t('viewDetails')}</Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  modalContainer: {
    width: width - 40,
    maxWidth: 400,
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    overflow: 'hidden',
    elevation: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
  },
  header: {
    paddingTop: 20,
    paddingBottom: 30,
    paddingHorizontal: 20,
    position: 'relative',
  },
  closeButton: {
    position: 'absolute',
    top: 20,
    right: 20,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
  },
  statusSection: {
    alignItems: 'center',
    paddingTop: 20,
  },
  iconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  statusTitle: {
    fontSize: 24,
    fontFamily: 'Inter-Bold',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 8,
  },
  statusSubtitle: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: 'rgba(255, 255, 255, 0.9)',
    textAlign: 'center',
  },
  headerDecorations: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  decoration1: {
    position: 'absolute',
    top: 30,
    left: 20,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  decoration2: {
    position: 'absolute',
    bottom: 20,
    right: 30,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  content: {
    padding: 24,
  },
  foodSection: {
    alignItems: 'center',
    marginBottom: 32,
  },
  imageContainer: {
    position: 'relative',
    marginBottom: 20,
  },
  foodImage: {
    width: 120,
    height: 120,
    borderRadius: 20,
    backgroundColor: '#F5F5F5',
  },
  placeholderImage: {
    width: 120,
    height: 120,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#E0E0E0',
    borderStyle: 'dashed',
  },
  daysLabel: {
    position: 'absolute',
    top: -8,
    right: -8,
    borderRadius: 16,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  daysLabelGradient: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  daysText: {
    fontSize: 12,
    fontFamily: 'Inter-Bold',
    color: '#FFFFFF',
  },
  foodDetails: {
    alignItems: 'center',
  },
  foodName: {
    fontSize: 20,
    fontFamily: 'Inter-Bold',
    color: '#2D3748',
    marginBottom: 16,
    textAlign: 'center',
  },
  dateInfo: {
    width: '100%',
  },
  dateRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
    paddingHorizontal: 16,
  },
  dateLabel: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#718096',
  },
  dateValue: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: '#2D3748',
  },
  actions: {
    flexDirection: 'row',
    gap: 12,
  },
  secondaryButton: {
    flex: 1,
    backgroundColor: '#F7FAFC',
    paddingVertical: 16,
    borderRadius: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  secondaryButtonText: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#4A5568',
  },
  primaryButton: {
    flex: 1,
    borderRadius: 16,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  primaryButtonGradient: {
    paddingVertical: 16,
    borderRadius: 16,
    alignItems: 'center',
  },
  primaryButtonText: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#FFFFFF',
  },
});
