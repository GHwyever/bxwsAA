import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Alert,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { X, Star, Heart, ThumbsUp, Frown, Smile, Meh } from 'lucide-react-native';
import { FoodItem } from '@/types/food';
import { Rating } from '@/types/rating';
import { useLanguage } from '@/hooks/useLanguage';
import { ratingStorage } from '@/utils/ratingStorage';
import uuid from 'react-native-uuid';

interface RatingModalProps {
  visible: boolean;
  food: FoodItem | null;
  onClose: () => void;
  onRatingSubmitted?: (rating: Rating) => void;
}

const ratingTags = [
  { key: 'fresh', icon: '🌿', color: '#10B981' },
  { key: 'tasty', icon: '😋', color: '#F59E0B' },
  { key: 'expired', icon: '⚠️', color: '#EF4444' },
  { key: 'waste', icon: '🗑️', color: '#6B7280' },
  { key: 'healthy', icon: '💚', color: '#059669' },
  { key: 'delicious', icon: '🤤', color: '#F97316' },
  { key: 'spoiled', icon: '🤢', color: '#DC2626' },
  { key: 'perfect', icon: '✨', color: '#8B5CF6' },
];

export function RatingModal({ visible, food, onClose, onRatingSubmitted }: RatingModalProps) {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { t } = useLanguage();

  const handleRatingPress = (value: number) => {
    setRating(value);
  };

  const handleTagPress = (tag: string) => {
    setSelectedTags(prev => 
      prev.includes(tag) 
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  };

  const handleSubmit = async () => {
    if (rating === 0) {
      Alert.alert(t('error'), t('pleaseSelectRating'));
      return;
    }

    if (!food) return;

    setIsSubmitting(true);
    try {
      const newRating: Rating = {
        id: uuid.v4() as string,
        foodId: food.id,
        rating,
        comment: comment.trim(),
        tags: selectedTags,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      await ratingStorage.addRating(newRating);
      onRatingSubmitted?.(newRating);
      
      Alert.alert(t('success'), t('ratingSubmitted'), [
        { text: t('ok'), onPress: handleClose },
      ]);
    } catch (error) {
      console.error('Failed to submit rating:', error);
      Alert.alert(t('error'), t('ratingSubmissionError'));
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    setRating(0);
    setComment('');
    setSelectedTags([]);
    onClose();
  };

  const getRatingEmoji = () => {
    switch (rating) {
      case 1: return <Frown size={32} color="#EF4444" />;
      case 2: return <Meh size={32} color="#F59E0B" />;
      case 3: return <Smile size={32} color="#10B981" />;
      case 4: return <Smile size={32} color="#059669" />;
      case 5: return <Heart size={32} color="#DC2626" />;
      default: return <Smile size={32} color="#9CA3AF" />;
    }
  };

  const getRatingText = () => {
    switch (rating) {
      case 1: return t('terrible');
      case 2: return t('poor');
      case 3: return t('average');
      case 4: return t('good');
      case 5: return t('excellent');
      default: return t('selectRating');
    }
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="pageSheet"
      onRequestClose={handleClose}
    >
      <View style={styles.container}>
        {/* Header */}
        <LinearGradient
          colors={['#667eea', '#764ba2']}
          style={styles.header}
        >
          <View style={styles.headerContent}>
            <TouchableOpacity onPress={handleClose}>
              <X size={24} color="#FFFFFF" />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>{t('rateThisItem')}</Text>
            <View style={{ width: 24 }} />
          </View>
        </LinearGradient>

        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          {/* Rating Section */}
          <View style={styles.ratingSection}>
            <View style={styles.emojiContainer}>
              {getRatingEmoji()}
            </View>
            
            <Text style={styles.ratingText}>{getRatingText()}</Text>
            
            <View style={styles.starsContainer}>
              {[1, 2, 3, 4, 5].map((star) => (
                <TouchableOpacity
                  key={star}
                  style={styles.starButton}
                  onPress={() => handleRatingPress(star)}
                >
                  <Star
                    size={40}
                    color={star <= rating ? '#F59E0B' : '#E5E7EB'}
                    fill={star <= rating ? '#F59E0B' : 'transparent'}
                  />
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Tags Section */}
          {rating > 0 && (
            <View style={styles.tagsSection}>
              <Text style={styles.sectionTitle}>{t('howWasIt')}</Text>
              <View style={styles.tagsContainer}>
                {ratingTags.map((tag) => (
                  <TouchableOpacity
                    key={tag.key}
                    style={[
                      styles.tagButton,
                      selectedTags.includes(tag.key) && {
                        backgroundColor: tag.color,
                        borderColor: tag.color,
                      },
                    ]}
                    onPress={() => handleTagPress(tag.key)}
                  >
                    <Text style={styles.tagEmoji}>{tag.icon}</Text>
                    <Text
                      style={[
                        styles.tagText,
                        selectedTags.includes(tag.key) && styles.tagTextSelected,
                      ]}
                    >
                      {t(tag.key)}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          )}

          {/* Comment Section */}
          {rating > 0 && (
            <View style={styles.commentSection}>
              <Text style={styles.sectionTitle}>{t('addComment')}</Text>
              <View style={styles.commentInputContainer}>
                <TextInput
                  style={styles.commentInput}
                  placeholder={t('shareYourExperience')}
                  value={comment}
                  onChangeText={setComment}
                  multiline
                  numberOfLines={4}
                  maxLength={500}
                />
                <Text style={styles.characterCount}>
                  {comment.length}/500
                </Text>
              </View>
            </View>
          )}

          {/* Submit Button */}
          {rating > 0 && (
            <TouchableOpacity
              style={[styles.submitButton, isSubmitting && styles.submitButtonDisabled]}
              onPress={handleSubmit}
              disabled={isSubmitting}
            >
              <LinearGradient
                colors={['#667eea', '#764ba2']}
                style={styles.submitButtonGradient}
              >
                <ThumbsUp size={20} color="#FFFFFF" />
                <Text style={styles.submitButtonText}>
                  {isSubmitting ? t('submitting') : t('submitRating')}
                </Text>
              </LinearGradient>
            </TouchableOpacity>
          )}

          <View style={styles.bottomSpacing} />
        </ScrollView>
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
    paddingTop: 20,
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
  ratingSection: {
    alignItems: 'center',
    paddingVertical: 40,
    paddingHorizontal: 20,
  },
  emojiContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  ratingText: {
    fontSize: 20,
    fontFamily: 'Inter-SemiBold',
    color: '#1F2937',
    marginBottom: 24,
  },
  starsContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  starButton: {
    padding: 4,
  },
  tagsSection: {
    paddingHorizontal: 20,
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
    color: '#1F2937',
    marginBottom: 16,
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  tagButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: '#E5E7EB',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
  },
  tagEmoji: {
    fontSize: 16,
    marginRight: 8,
  },
  tagText: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#6B7280',
  },
  tagTextSelected: {
    color: '#FFFFFF',
  },
  commentSection: {
    paddingHorizontal: 20,
    marginBottom: 32,
  },
  commentInputContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    padding: 16,
  },
  commentInput: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#1F2937',
    textAlignVertical: 'top',
    minHeight: 100,
  },
  characterCount: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#9CA3AF',
    textAlign: 'right',
    marginTop: 8,
  },
  submitButton: {
    marginHorizontal: 20,
    borderRadius: 16,
    elevation: 4,
    shadowColor: '#667eea',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
  },
  submitButtonDisabled: {
    opacity: 0.6,
  },
  submitButtonGradient: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 16,
    borderRadius: 16,
    gap: 8,
  },
  submitButtonText: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#FFFFFF',
  },
  bottomSpacing: {
    height: 40,
  },
});