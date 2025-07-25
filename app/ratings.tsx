import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  RefreshControl,
  Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { X, Star, MessageCircle, Calendar, User, TrendingUp } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import { Rating, RatingStats } from '@/types/rating';
import { FoodItem } from '@/types/food';
import { useLanguage } from '@/hooks/useLanguage';
import { ratingStorage } from '@/utils/ratingStorage';
import { foodStorage } from '@/utils/storage';
import { RatingDisplay } from '@/components/RatingDisplay';

export default function RatingsScreen() {
  const [ratings, setRatings] = useState<Rating[]>([]);
  const [stats, setStats] = useState<RatingStats | null>(null);
  const [foods, setFoods] = useState<{ [key: string]: FoodItem }>({});
  const [refreshing, setRefreshing] = useState(false);
  const router = useRouter();
  const { t } = useLanguage();

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [ratingsData, statsData, foodsData] = await Promise.all([
        ratingStorage.getAllRatings(),
        ratingStorage.getRatingStats(),
        foodStorage.getAllFoods(),
      ]);

      setRatings(ratingsData);
      setStats(statsData);
      
      // Create foods lookup map
      const foodsMap: { [key: string]: FoodItem } = {};
      foodsData.forEach(food => {
        foodsMap[food.id] = food;
      });
      setFoods(foodsMap);
    } catch (error) {
      console.error('Failed to load ratings data:', error);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await loadData();
    setRefreshing(false);
  };

  const renderRatingItem = (rating: Rating) => {
    const food = foods[rating.foodId];
    
    return (
      <View key={rating.id} style={styles.ratingItem}>
        <LinearGradient
          colors={['#FFFFFF', '#F8FAFC']}
          style={styles.ratingCard}
        >
          {/* Rating Header */}
          <View style={styles.ratingHeader}>
            <View style={styles.ratingLeft}>
              {food?.imageUri ? (
                <Image source={{ uri: food.imageUri }} style={styles.foodThumbnail} />
              ) : (
                <View style={styles.placeholderThumbnail}>
                  <Calendar size={20} color="#9CA3AF" />
                </View>
              )}
              
              <View style={styles.ratingInfo}>
                <Text style={styles.foodName}>{t('item')}</Text>
                <View style={styles.starsRow}>
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      size={14}
                      color={star <= rating.rating ? '#F59E0B' : '#E5E7EB'}
                      fill={star <= rating.rating ? '#F59E0B' : 'transparent'}
                    />
                  ))}
                  <Text style={styles.ratingValue}>({rating.rating})</Text>
                </View>
              </View>
            </View>
            
            <Text style={styles.ratingDate}>
              {rating.createdAt.toLocaleDateString()}
            </Text>
          </View>

          {/* Tags */}
          {rating.tags.length > 0 && (
            <View style={styles.tagsContainer}>
              {rating.tags.map((tag) => (
                <View key={tag} style={styles.tag}>
                  <Text style={styles.tagText}>{t(tag)}</Text>
                </View>
              ))}
            </View>
          )}

          {/* Comment */}
          {rating.comment && (
            <View style={styles.commentContainer}>
              <MessageCircle size={16} color="#6B7280" />
              <Text style={styles.commentText}>{rating.comment}</Text>
            </View>
          )}
        </LinearGradient>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <LinearGradient
        colors={['#667eea', '#764ba2']}
        style={styles.header}
      >
        <View style={styles.headerContent}>
          <TouchableOpacity onPress={() => router.back()}>
            <X size={24} color="#FFFFFF" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>{t('ratingsAndReviews')}</Text>
          <View style={{ width: 24 }} />
        </View>
      </LinearGradient>

      <ScrollView
        style={styles.content}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        showsVerticalScrollIndicator={false}
      >
        {/* Overall Stats */}
        {stats && stats.totalRatings > 0 && (
          <RatingDisplay stats={stats} />
        )}

        {/* Individual Ratings */}
        <View style={styles.ratingsSection}>
          <View style={styles.sectionHeader}>
            <TrendingUp size={20} color="#667eea" />
            <Text style={styles.sectionTitle}>{t('recentRatings')}</Text>
          </View>

          {ratings.length === 0 ? (
            <View style={styles.emptyState}>
              <Star size={48} color="#E5E7EB" />
              <Text style={styles.emptyTitle}>{t('noRatingsYet')}</Text>
              <Text style={styles.emptySubtitle}>{t('startRatingItems')}</Text>
            </View>
          ) : (
            <View style={styles.ratingsList}>
              {ratings
                .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
                .map(renderRatingItem)}
            </View>
          )}
        </View>

        <View style={styles.bottomSpacing} />
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
    paddingBottom: 20,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  headerTitle: {
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
    color: '#FFFFFF',
  },
  content: {
    flex: 1,
  },
  ratingsSection: {
    paddingHorizontal: 20,
    marginTop: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
    color: '#1F2937',
    marginLeft: 8,
  },
  ratingsList: {
    gap: 12,
  },
  ratingItem: {
    borderRadius: 16,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
  },
  ratingCard: {
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#F1F5F9',
  },
  ratingHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  ratingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  foodThumbnail: {
    width: 40,
    height: 40,
    borderRadius: 8,
    marginRight: 12,
  },
  placeholderThumbnail: {
    width: 40,
    height: 40,
    borderRadius: 8,
    backgroundColor: '#F3F4F6',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  ratingInfo: {
    flex: 1,
  },
  foodName: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#1F2937',
    marginBottom: 4,
  },
  starsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
  },
  ratingValue: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    color: '#6B7280',
    marginLeft: 4,
  },
  ratingDate: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#9CA3AF',
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 12,
  },
  tag: {
    backgroundColor: '#F3F4F6',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  tagText: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    color: '#6B7280',
  },
  commentContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: '#F9FAFB',
    padding: 12,
    borderRadius: 12,
    gap: 8,
  },
  commentText: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#4B5563',
    flex: 1,
    lineHeight: 20,
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 60,
  },
  emptyTitle: {
    fontSize: 20,
    fontFamily: 'Inter-SemiBold',
    color: '#1F2937',
    marginTop: 16,
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
    textAlign: 'center',
  },
  bottomSpacing: {
    height: 40,
  },
});