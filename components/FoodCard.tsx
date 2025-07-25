import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Calendar, Clock, TriangleAlert as AlertTriangle, CircleCheck as CheckCircle, Trash2, Sparkles, Star } from 'lucide-react-native';
import { FoodItem } from '@/types/food';
import { RatingStats } from '@/types/rating';
import { useLanguage } from '@/hooks/useLanguage';

interface FoodCardProps {
  food: FoodItem;
  onPress: () => void;
  onDelete: () => void;
  ratingStats?: RatingStats;
}

export function FoodCard({ food, onPress, onDelete, ratingStats }: FoodCardProps) {
  const { t } = useLanguage();

  const getDaysUntilExpiry = () => {
    const today = new Date();
    const expiryDate = new Date(food.expiryDate);
    const diffTime = expiryDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const getStatusInfo = () => {
    const days = getDaysUntilExpiry();
    if (days < 0) {
      return {
        color: '#dc2626',
        icon: <AlertTriangle size={14} color="#dc2626" />,
        text: t('expired'),
        bgGradient: ['rgba(255, 107, 107, 0.15)', 'rgba(238, 82, 83, 0.1)'],
        borderColor: '#fca5a5'
      };
    }
    if (days <= 3) {
      return {
        color: '#d97706',
        icon: <Clock size={14} color="#d97706" />,
        text: days === 0 ? t('today') : days === 1 ? t('tomorrow') : `${days} ${t('days')}`,
        bgGradient: ['rgba(255, 236, 210, 0.8)', 'rgba(252, 182, 159, 0.6)'],
        borderColor: '#fde68a'
      };
    }
    return {
      color: '#059669',
      icon: <CheckCircle size={14} color="#059669" />,
      text: `${days} ${t('days')}`,
      bgGradient: ['rgba(168, 237, 234, 0.8)', 'rgba(254, 214, 227, 0.6)'],
      borderColor: '#a7f3d0'
    };
  };

  const statusInfo = getStatusInfo();

  return (
    <TouchableOpacity style={styles.container} onPress={onPress} activeOpacity={0.95}>
      <LinearGradient
        colors={['#ffffff', '#fafbfc']}
        style={styles.card}
      >
        <View style={styles.cardContent}>
          {/* Food image area */}
          <View style={styles.imageSection}>
            {food.imageUri ? (
              <View style={styles.imageContainer}>
                <Image source={{ uri: food.imageUri }} style={styles.foodImage} />
                <LinearGradient
                  colors={['transparent', 'rgba(0, 0, 0, 0.05)']}
                  style={styles.imageOverlay}
                />
              </View>
            ) : (
              <LinearGradient
                colors={['#ffecd2', '#fcb69f']}
                style={styles.placeholderImage}
              >
                <Calendar size={20} color="#667eea" strokeWidth={2} />
              </LinearGradient>
            )}
            
            {/* Image decoration */}
            <View style={styles.imageDecoration}>
              <Sparkles size={6} color="#667eea" />
            </View>
          </View>

          {/* Food info area */}
          <View style={styles.foodInfo}>
            <Text style={styles.foodName} numberOfLines={1}>
              {t('item')}
            </Text>
            
            {/* Status badge */}
        
        {/* Rating display */}
        {ratingStats && ratingStats.totalRatings > 0 && (
          <View style={styles.ratingContainer}>
            <Star size={12} color="#F59E0B" fill="#F59E0B" />
            <Text style={styles.ratingText}>
              {ratingStats.averageRating.toFixed(1)} ({ratingStats.totalRatings})
            </Text>
          </View>
        )}
            <View style={styles.statusContainer}>
              <LinearGradient
                colors={statusInfo.bgGradient}
                style={[styles.statusBadge, { borderColor: statusInfo.borderColor }]}
              >
                {statusInfo.icon}
                <Text style={[styles.statusText, { color: statusInfo.color }]}>
                  {statusInfo.text}
                </Text>
              </LinearGradient>
            </View>
          </View>

          {/* Action button */}
          <TouchableOpacity style={styles.moreButton} onPress={onDelete}>
            <LinearGradient
              colors={['#f8fafc', '#e2e8f0']}
              style={styles.moreButtonGradient}
            >
              <Trash2 size={16} color="#dc2626" />
            </LinearGradient>
          </TouchableOpacity>
        </View>
        
        {/* Card decorative elements */}
        <View style={styles.cardDecorations}>
          <View style={styles.cardSparkle} />
          <View style={styles.cardGlow} />
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 8,
  },
  card: {
    borderRadius: 20,
    padding: 16,
    elevation: 8,
    shadowColor: '#667eea',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 16,
    borderWidth: 1,
    borderColor: '#f1f5f9',
    position: 'relative',
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  imageSection: {
    marginRight: 16,
    position: 'relative',
  },
  imageContainer: {
    width: 56,
    height: 56,
    borderRadius: 16,
    overflow: 'hidden',
    position: 'relative',
  },
  foodImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  imageOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  placeholderImage: {
    width: 56,
    height: 56,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: 'rgba(102, 126, 234, 0.2)',
    borderStyle: 'dashed',
  },
  imageDecoration: {
    position: 'absolute',
    top: -3,
    right: -3,
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  foodInfo: {
    flex: 1,
  },
  foodName: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#1e293b',
    marginBottom: 8,
    letterSpacing: 0.3,
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 12,
    borderWidth: 1,
  },
  statusText: {
    fontSize: 12,
    fontFamily: 'Inter-SemiBold',
    marginLeft: 4,
    letterSpacing: 0.3,
  },
  moreButton: {
    marginLeft: 12,
    borderRadius: 16,
    elevation: 3,
    shadowColor: '#667eea',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
  },
  moreButtonGradient: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
    gap: 4,
  },
  ratingText: {
    fontSize: 11,
    fontFamily: 'Inter-Medium',
    color: '#6B7280',
  },
  cardDecorations: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    pointerEvents: 'none',
  },
  cardSparkle: {
    position: 'absolute',
    top: 12,
    right: 50,
    width: 3,
    height: 3,
    borderRadius: 1.5,
    backgroundColor: '#667eea',
    opacity: 0.6,
  },
  cardGlow: {
    position: 'absolute',
    top: -5,
    right: -5,
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: 'rgba(102, 126, 234, 0.05)',
  },
});
