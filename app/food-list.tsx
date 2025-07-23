import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  RefreshControl,
  Dimensions,
  Image,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { X, Calendar } from 'lucide-react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { FoodItem } from '@/types/food';
import { foodStorage } from '@/utils/storage';
import { useLanguage } from '@/hooks/useLanguage';

const { width } = Dimensions.get('window');
const COLUMN_WIDTH = (width - 60) / 2; // 2 columns with padding

export default function FoodListScreen() {
  const [foods, setFoods] = useState<FoodItem[]>([]);
  const [filteredFoods, setFilteredFoods] = useState<FoodItem[]>([]);
  const [refreshing, setRefreshing] = useState(false);
  const router = useRouter();
  const { status } = useLocalSearchParams<{ status?: string }>();
  const { t } = useLanguage();

  useEffect(() => {
    loadFoods();
  }, []);

  useEffect(() => {
    if (foods.length > 0 && status) {
      filterFoodsByStatus();
    }
  }, [foods, status]);

  const loadFoods = async () => {
    try {
      const storedFoods = await foodStorage.getAllFoods();
      setFoods(storedFoods);
    } catch (error) {
      console.error('Failed to load foods:', error);
    }
  };

  const filterFoodsByStatus = () => {
    const today = new Date();
    let filtered: FoodItem[] = [];

    switch (status) {
      case 'expired':
        filtered = foods.filter(food => new Date(food.expiryDate) < today);
        break;
      case 'expiringSoon':
        filtered = foods.filter(food => {
          const daysUntilExpiry = Math.ceil((new Date(food.expiryDate).getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
          return daysUntilExpiry >= 0 && daysUntilExpiry <= 3;
        });
        break;
      case 'fresh':
        filtered = foods.filter(food => {
          const daysUntilExpiry = Math.ceil((new Date(food.expiryDate).getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
          return daysUntilExpiry > 3;
        });
        break;
      default:
        filtered = foods;
    }

    setFilteredFoods(filtered);
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await loadFoods();
    setRefreshing(false);
  };

  const getStatusTitle = () => {
    switch (status) {
      case 'expired':
        return t('expired');
      case 'expiringSoon':
        return t('expiringSoon');
      case 'fresh':
        return t('fresh');
      default:
        return t('allItems');
    }
  };

  const getDaysUntilExpiry = (food: FoodItem) => {
    const today = new Date();
    const expiryDate = new Date(food.expiryDate);
    const diffTime = expiryDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const getStatusColor = (food: FoodItem) => {
    const days = getDaysUntilExpiry(food);
    if (days < 0) return '#EF4444';
    if (days <= 3) return '#F59E0B';
    return '#10B981';
  };

  const getStatusText = (food: FoodItem) => {
    const days = getDaysUntilExpiry(food);
    if (days < 0) return t('expired');
    if (days === 0) return t('today');
    if (days === 1) return t('tomorrow');
    return `${days} ${t('days')}`;
  };

  const renderFoodItem = (food: FoodItem, index: number) => {
    const isLeftColumn = index % 2 === 0;
    const itemHeight = 220 + (index % 3) * 40; // Varied height for waterfall effect

    return (
      <TouchableOpacity
        key={food.id}
        style={[
          styles.foodItem,
          {
            width: COLUMN_WIDTH,
            height: itemHeight,
            marginLeft: isLeftColumn ? 0 : 10,
            marginRight: isLeftColumn ? 10 : 0,
          },
        ]}
        onPress={() => router.push(`/food-detail?id=${food.id}`)}
      >
        {food.imageUri ? (
          <View style={styles.imageContainer}>
            <Image source={{ uri: food.imageUri }} style={styles.foodImage} />
            <View style={styles.imageOverlay} />
          </View>
        ) : (
          <View style={styles.placeholderImage}>
            <View style={styles.placeholderIcon}>
              <Calendar size={32} color="#FFFFFF" />
            </View>
          </View>
        )}
        
        <View style={styles.foodInfo}>
          <Text style={styles.foodName} numberOfLines={2}>
            {t('item')}
          </Text>
          <View style={[
            styles.statusBadge, 
            { 
              backgroundColor: getStatusColor(food),
              shadowColor: getStatusColor(food),
            }
          ]}>
            <Text style={styles.statusText}>
              {getStatusText(food)}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  const renderWaterfallLayout = () => {
    const leftColumn: FoodItem[] = [];
    const rightColumn: FoodItem[] = [];

    filteredFoods.forEach((food, index) => {
      if (index % 2 === 0) {
        leftColumn.push(food);
      } else {
        rightColumn.push(food);
      }
    });

    return (
      <View style={styles.waterfallContainer}>
        <View style={styles.column}>
          {leftColumn.map((food, index) => renderFoodItem(food, index * 2))}
        </View>
        <View style={styles.column}>
          {rightColumn.map((food, index) => renderFoodItem(food, index * 2 + 1))}
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <X size={24} color="#1F2937" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{getStatusTitle()}</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView
        style={styles.content}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {filteredFoods.length === 0 ? (
          <View style={styles.emptyState}>
            <Text style={styles.emptyTitle}>{t('noItemsFound')}</Text>
            <Text style={styles.emptySubtitle}>{t('pleaseAddSomeItemsFirst')}</Text>
          </View>
        ) : (
          renderWaterfallLayout()
        )}
      </ScrollView>
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
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 100,
  },
  waterfallContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  column: {
    flex: 1,
  },
  foodItem: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    marginBottom: 16,
    overflow: 'hidden',
    elevation: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 12,
  },
  imageContainer: {
    position: 'relative',
    width: '100%',
    height: 140,
  },
  imageOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
  },
  foodImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  placeholderImage: {
    width: '100%',
    height: 140,
    backgroundColor: '#E5E7EB',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  placeholderIcon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#9CA3AF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  foodInfo: {
    padding: 16,
    flex: 1,
    justifyContent: 'space-between',
  },
  foodName: {
    fontSize: 15,
    fontFamily: 'Inter-Bold',
    color: '#1F2937',
    marginBottom: 12,
    lineHeight: 20,
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    alignSelf: 'flex-start',
    elevation: 2,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  statusText: {
    fontSize: 11,
    fontFamily: 'Inter-Bold',
    color: '#FFFFFF',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 60,
  },
  emptyTitle: {
    fontSize: 24,
    fontFamily: 'Inter-Bold',
    color: '#1F2937',
    marginBottom: 12,
  },
  emptySubtitle: {
    fontSize: 18,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
    textAlign: 'center',
    lineHeight: 26,
  },
});
