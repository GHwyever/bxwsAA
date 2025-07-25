import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Star, MessageCircle, TrendingUp } from 'lucide-react-native';
import { RatingStats } from '@/types/rating';
import { useLanguage } from '@/hooks/useLanguage';

interface RatingDisplayProps {
  stats: RatingStats;
  onViewAllRatings?: () => void;
  compact?: boolean;
}

export function RatingDisplay({ stats, onViewAllRatings, compact = false }: RatingDisplayProps) {
  const { t } = useLanguage();

  const renderStars = (rating: number, size: number = 16) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

    return (
      <View style={styles.starsRow}>
        {/* Full stars */}
        {Array.from({ length: fullStars }).map((_, index) => (
          <Star key={`full-${index}`} size={size} color="#F59E0B" fill="#F59E0B" />
        ))}
        
        {/* Half star */}
        {hasHalfStar && (
          <View style={styles.halfStarContainer}>
            <Star size={size} color="#E5E7EB" fill="#E5E7EB" />
            <View style={[styles.halfStarOverlay, { width: size / 2 }]}>
              <Star size={size} color="#F59E0B" fill="#F59E0B" />
            </View>
          </View>
        )}
        
        {/* Empty stars */}
        {Array.from({ length: emptyStars }).map((_, index) => (
          <Star key={`empty-${index}`} size={size} color="#E5E7EB" fill="#E5E7EB" />
        ))}
      </View>
    );
  };

  if (compact) {
    return (
      <TouchableOpacity style={styles.compactContainer} onPress={onViewAllRatings}>
        <View style={styles.compactRating}>
          {renderStars(stats.averageRating, 14)}
          <Text style={styles.compactRatingText}>
            {stats.averageRating.toFixed(1)} ({stats.totalRatings})
          </Text>
        </View>
      </TouchableOpacity>
    );
  }

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#FFFFFF', '#F8FAFC']}
        style={styles.card}
      >
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <TrendingUp size={20} color="#667eea" />
            <Text style={styles.headerTitle}>{t('userRatings')}</Text>
          </View>
          {onViewAllRatings && (
            <TouchableOpacity onPress={onViewAllRatings}>
              <Text style={styles.viewAllText}>{t('viewAll')}</Text>
            </TouchableOpacity>
          )}
        </View>

        {/* Main Rating */}
        <View style={styles.mainRating}>
          <View style={styles.ratingScore}>
            <Text style={styles.averageRating}>
              {stats.averageRating.toFixed(1)}
            </Text>
            <Text style={styles.outOfFive}>/ 5</Text>
          </View>
          
          <View style={styles.ratingDetails}>
            {renderStars(stats.averageRating, 20)}
            <Text style={styles.totalRatings}>
              {t('basedOnRatings', { count: stats.totalRatings })}
            </Text>
          </View>
        </View>

        {/* Rating Distribution */}
        <View style={styles.distribution}>
          {[5, 4, 3, 2, 1].map((star) => {
            const count = stats.ratingDistribution[star as keyof typeof stats.ratingDistribution];
            const percentage = stats.totalRatings > 0 ? (count / stats.totalRatings) * 100 : 0;
            
            return (
              <View key={star} style={styles.distributionRow}>
                <Text style={styles.starNumber}>{star}</Text>
                <Star size={12} color="#F59E0B" fill="#F59E0B" />
                
                <View style={styles.progressBar}>
                  <View style={styles.progressTrack}>
                    <LinearGradient
                      colors={['#F59E0B', '#D97706']}
                      style={[styles.progressFill, { width: `${percentage}%` }]}
                    />
                  </View>
                </View>
                
                <Text style={styles.countText}>{count}</Text>
              </View>
            );
          })}
        </View>

        {/* Common Tags */}
        {stats.commonTags.length > 0 && (
          <View style={styles.tagsSection}>
            <Text style={styles.tagsTitle}>{t('commonTags')}</Text>
            <View style={styles.tagsContainer}>
              {stats.commonTags.slice(0, 6).map((tagData) => (
                <View key={tagData.tag} style={styles.tagChip}>
                  <Text style={styles.tagChipText}>
                    {t(tagData.tag)} ({tagData.count})
                  </Text>
                </View>
              ))}
            </View>
          </View>
        )}
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
    marginVertical: 16,
  },
  card: {
    borderRadius: 20,
    padding: 20,
    elevation: 6,
    shadowColor: '#667eea',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    borderWidth: 1,
    borderColor: '#F1F5F9',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
    color: '#1F2937',
    marginLeft: 8,
  },
  viewAllText: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#667eea',
  },
  mainRating: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  ratingScore: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginRight: 20,
  },
  averageRating: {
    fontSize: 36,
    fontFamily: 'Inter-Bold',
    color: '#1F2937',
  },
  outOfFive: {
    fontSize: 18,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
    marginLeft: 4,
  },
  ratingDetails: {
    flex: 1,
    alignItems: 'flex-start',
  },
  starsRow: {
    flexDirection: 'row',
    gap: 2,
    marginBottom: 8,
  },
  halfStarContainer: {
    position: 'relative',
  },
  halfStarOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    overflow: 'hidden',
  },
  totalRatings: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
  },
  distribution: {
    marginBottom: 20,
  },
  distributionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    gap: 8,
  },
  starNumber: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    color: '#6B7280',
    width: 12,
  },
  progressBar: {
    flex: 1,
    marginHorizontal: 8,
  },
  progressTrack: {
    height: 6,
    backgroundColor: '#F3F4F6',
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 3,
  },
  countText: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    color: '#6B7280',
    width: 20,
    textAlign: 'right',
  },
  tagsSection: {
    borderTopWidth: 1,
    borderTopColor: '#F3F4F6',
    paddingTop: 16,
  },
  tagsTitle: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#1F2937',
    marginBottom: 12,
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  tagChip: {
    backgroundColor: '#F3F4F6',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  tagChipText: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    color: '#6B7280',
  },
  compactContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  compactRating: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  compactRatingText: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#6B7280',
  },
});