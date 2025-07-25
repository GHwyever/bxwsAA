import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Alert,
  Image,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { X, Calendar, Save, Star, MessageCircle } from 'lucide-react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import DateTimePicker from '@react-native-community/datetimepicker';
import { FoodItem } from '@/types/food';
import { Rating, RatingStats } from '@/types/rating';
import { foodStorage } from '@/utils/storage';
import { ratingStorage } from '@/utils/ratingStorage';
import { useLanguage } from '@/hooks/useLanguage';
import { scheduleNotification } from '@/utils/notifications';
import { RatingModal } from '@/components/RatingModal';
import { RatingDisplay } from '@/components/RatingDisplay';

export default function FoodDetailScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{
    id?: string;
  }>();
  const { t } = useLanguage();

  const [food, setFood] = useState<Partial<FoodItem>>({
    expiryDate: new Date(),
  });
  const [showExpiryDatePicker, setShowExpiryDatePicker] = useState(false);
  const [expiryDays, setExpiryDays] = useState('');
  const [isEditMode, setIsEditMode] = useState(!id);
  const [showRatingModal, setShowRatingModal] = useState(false);
  const [ratingStats, setRatingStats] = useState<RatingStats | null>(null);

  useEffect(() => {
    if (id) {
      loadFood();
      loadRatingStats();
    }
  }, [id]);

  const loadFood = async () => {
    if (!id) return;
    try {
      const existingFood = await foodStorage.getFood(id);
      if (existingFood) {
        setFood(existingFood);
        // Calculate current remaining days
        const today = new Date();
        const diffTime = existingFood.expiryDate.getTime() - today.getTime();
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        setExpiryDays(diffDays.toString());
      }
    } catch (error) {
      console.error('Failed to load food:', error);
    }
  };

  const loadRatingStats = async () => {
    if (!id) return;
    try {
      const stats = await ratingStorage.getRatingStats(id);
      setRatingStats(stats);
    } catch (error) {
      console.error('Failed to load rating stats:', error);
    }
  };
  const handleExpiryDaysChange = (days: string) => {
    setExpiryDays(days);
    if (days && !isNaN(Number(days))) {
      const expiryDate = new Date();
      expiryDate.setDate(expiryDate.getDate() + Number(days));
      setFood(prev => ({ ...prev, expiryDate }));
    }
  };

  const handleSave = async () => {
    if (!food.expiryDate) {
      Alert.alert(t('error'), t('expiryDateRequired'));
      return;
    }

    try {
      const foodItem: FoodItem = {
        id: food.id!,
        name: 'Item',
        category: 'other' as any,
        productionDate: food.productionDate || new Date(),
        expiryDate: food.expiryDate,
        imageUri: food.imageUri,
        createdAt: food.createdAt || new Date(),
      };

      await foodStorage.updateFood(foodItem);

      // Schedule notifications
      await scheduleNotification(foodItem);

      Alert.alert(t('success'), t('itemSaved'), [
        { text: t('ok'), onPress: () => router.back() },
      ]);
    } catch (error) {
      console.error('Failed to save food:', error);
      Alert.alert(t('error'), t('saveError'));
    }
  };

  const handleClose = () => {
    router.back();
  };

  const handleRatingSubmitted = () => {
    loadRatingStats();
  };
  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <View style={styles.header}>
          <TouchableOpacity onPress={handleClose}>
            <X size={24} color="#1F2937" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>{t('itemDetails')}</Text>
          {id && !isEditMode && (
            <TouchableOpacity onPress={() => setIsEditMode(true)} style={styles.editButton}>
              <Text style={styles.editButtonText}>{t('edit')}</Text>
            </TouchableOpacity>
          )}
          {id && !isEditMode && (
            <TouchableOpacity onPress={() => setShowRatingModal(true)} style={styles.rateButton}>
              <Star size={16} color="#FFFFFF" />
            </TouchableOpacity>
          )}
          {!id && !isEditMode && <View style={{ width: 24 }} />}
        </View>

        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          {food.imageUri && (
            <View style={styles.imageContainer}>
              <Image source={{ uri: food.imageUri }} style={styles.itemImage} />
            </View>
          )}

          {/* Rating Section */}
          {id && !isEditMode && ratingStats && ratingStats.totalRatings > 0 && (
            <RatingDisplay 
              stats={ratingStats} 
              onViewAllRatings={() => router.push('/ratings')}
              compact
            />
          )}

          <View style={styles.form}>
            {isEditMode ? (
              <View style={styles.inputGroup}>
                <Text style={styles.label}>{t('expiryDays')}</Text>
                <View style={styles.inputContainer}>
                  <TextInput
                    style={styles.daysInput}
                    placeholder={t('enterExpiryDays')}
                    value={expiryDays}
                    onChangeText={handleExpiryDaysChange}
                    keyboardType="numeric"
                    maxLength={3}
                  />
                  <Text style={styles.daysLabel}>{t('days')}</Text>
                </View>
              </View>
            ) : (
              <View style={styles.inputGroup}>
                <Text style={styles.label}>{t('expiryDate')}</Text>
                <View style={styles.dateDisplay}>
                  <Calendar size={20} color="#6366F1" />
                  <Text style={styles.dateText}>
                    {food.expiryDate?.toLocaleDateString() || ''}
                  </Text>
                </View>
              </View>
            )}

            {isEditMode && (
              <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
                <Save size={20} color="#FFFFFF" />
                <Text style={styles.saveButtonText}>{t('save')}</Text>
              </TouchableOpacity>
            )}
          </View>
        </ScrollView>

        {showExpiryDatePicker && (
          <DateTimePicker
            value={food.expiryDate || new Date()}
            mode="date"
            display="default"
            onChange={(event, selectedDate) => {
              setShowExpiryDatePicker(false);
              if (selectedDate) {
                setFood(prev => ({ ...prev, expiryDate: selectedDate }));
              }
            }}
          />
        )}
      </KeyboardAvoidingView>
      
      <RatingModal
        visible={showRatingModal}
        food={food as FoodItem}
        onClose={() => setShowRatingModal(false)}
        onRatingSubmitted={handleRatingSubmitted}
      />
    </SafeAreaView>
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
  headerTitle: {
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
    color: '#1F2937',
  },
  editButton: {
    backgroundColor: '#6366F1',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  editButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontFamily: 'Inter-Medium',
  },
  rateButton: {
    backgroundColor: '#F59E0B',
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    flex: 1,
  },
  imageContainer: {
    alignItems: 'center',
    paddingVertical: 24,
  },
  itemImage: {
    width: 160,
    height: 160,
    borderRadius: 16,
    backgroundColor: '#F3F4F6',
  },
  form: {
    padding: 24,
  },
  inputGroup: {
    marginBottom: 24,
  },
  label: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#1F2937',
    marginBottom: 12,
    textAlign: 'center',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F9FAFB',
    borderRadius: 16,
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  daysInput: {
    fontSize: 24,
    fontFamily: 'Inter-Bold',
    color: '#1F2937',
    textAlign: 'center',
    minWidth: 80,
  },
  daysLabel: {
    fontSize: 18,
    fontFamily: 'Inter-Medium',
    color: '#6B7280',
    marginLeft: 8,
  },
  dateDisplay: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F9FAFB',
    borderRadius: 16,
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  dateText: {
    fontSize: 16,
    fontFamily: 'Inter-Medium',
    color: '#1F2937',
    marginLeft: 8,
  },
  saveButton: {
    backgroundColor: '#6366F1',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 16,
    borderRadius: 16,
    marginTop: 24,
  },
  saveButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    marginLeft: 8,
  },
});
