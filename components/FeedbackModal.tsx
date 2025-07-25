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
import { X, Send, Bug, Lightbulb, Settings as SettingsIcon, MessageSquare } from 'lucide-react-native';
import { FeedbackItem } from '@/types/rating';
import { useLanguage } from '@/hooks/useLanguage';
import { ratingStorage } from '@/utils/ratingStorage';
import uuid from 'react-native-uuid';

interface FeedbackModalProps {
  visible: boolean;
  onClose: () => void;
  onFeedbackSubmitted?: () => void;
}

const feedbackTypes = [
  {
    type: 'bug' as const,
    title: 'reportBug',
    icon: <Bug size={24} color="#EF4444" />,
    color: '#EF4444',
    gradient: ['#FEF2F2', '#FEE2E2'],
  },
  {
    type: 'feature' as const,
    title: 'requestFeature',
    icon: <Lightbulb size={24} color="#F59E0B" />,
    color: '#F59E0B',
    gradient: ['#FFFBEB', '#FEF3C7'],
  },
  {
    type: 'improvement' as const,
    title: 'suggestImprovement',
    icon: <SettingsIcon size={24} color="#6366F1" />,
    color: '#6366F1',
    gradient: ['#EEF2FF', '#E0E7FF'],
  },
  {
    type: 'general' as const,
    title: 'generalFeedback',
    icon: <MessageSquare size={24} color="#10B981" />,
    color: '#10B981',
    gradient: ['#ECFDF5', '#D1FAE5'],
  },
];

export function FeedbackModal({ visible, onClose, onFeedbackSubmitted }: FeedbackModalProps) {
  const [selectedType, setSelectedType] = useState<FeedbackItem['type'] | null>(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [email, setEmail] = useState('');
  const [rating, setRating] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { t } = useLanguage();

  const handleSubmit = async () => {
    if (!selectedType) {
      Alert.alert(t('error'), t('pleaseSelectFeedbackType'));
      return;
    }

    if (!title.trim()) {
      Alert.alert(t('error'), t('pleaseFillTitle'));
      return;
    }

    if (!description.trim()) {
      Alert.alert(t('error'), t('pleaseFillDescription'));
      return;
    }

    setIsSubmitting(true);
    try {
      const feedback: FeedbackItem = {
        id: uuid.v4() as string,
        type: selectedType,
        title: title.trim(),
        description: description.trim(),
        rating,
        email: email.trim(),
        appVersion: '1.0.0',
        createdAt: new Date(),
        status: 'pending',
      };

      await ratingStorage.addFeedback(feedback);
      onFeedbackSubmitted?.();
      
      Alert.alert(t('success'), t('feedbackSubmitted'), [
        { text: t('ok'), onPress: handleClose },
      ]);
    } catch (error) {
      console.error('Failed to submit feedback:', error);
      Alert.alert(t('error'), t('feedbackSubmissionError'));
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    setSelectedType(null);
    setTitle('');
    setDescription('');
    setEmail('');
    setRating(0);
    onClose();
  };

  const selectedTypeData = feedbackTypes.find(type => type.type === selectedType);

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
            <Text style={styles.headerTitle}>{t('sendFeedback')}</Text>
            <View style={{ width: 24 }} />
          </View>
        </LinearGradient>

        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          {/* Feedback Type Selection */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>{t('feedbackType')}</Text>
            <View style={styles.typeGrid}>
              {feedbackTypes.map((type) => (
                <TouchableOpacity
                  key={type.type}
                  style={[
                    styles.typeCard,
                    selectedType === type.type && styles.typeCardSelected,
                  ]}
                  onPress={() => setSelectedType(type.type)}
                >
                  <LinearGradient
                    colors={selectedType === type.type ? [type.color, type.color] : type.gradient}
                    style={styles.typeCardGradient}
                  >
                    <View style={[
                      styles.typeIcon,
                      selectedType === type.type && styles.typeIconSelected,
                    ]}>
                      {React.cloneElement(type.icon, {
                        color: selectedType === type.type ? '#FFFFFF' : type.color,
                      })}
                    </View>
                    <Text style={[
                      styles.typeTitle,
                      selectedType === type.type && styles.typeTitleSelected,
                    ]}>
                      {t(type.title)}
                    </Text>
                  </LinearGradient>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Form Fields */}
          {selectedType && (
            <>
              {/* Title */}
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>{t('title')}</Text>
                <TextInput
                  style={styles.titleInput}
                  placeholder={t('enterTitle')}
                  value={title}
                  onChangeText={setTitle}
                  maxLength={100}
                />
                <Text style={styles.characterCount}>{title.length}/100</Text>
              </View>

              {/* Description */}
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>{t('description')}</Text>
                <TextInput
                  style={styles.descriptionInput}
                  placeholder={t('enterDescription')}
                  value={description}
                  onChangeText={setDescription}
                  multiline
                  numberOfLines={6}
                  maxLength={1000}
                  textAlignVertical="top"
                />
                <Text style={styles.characterCount}>{description.length}/1000</Text>
              </View>

              {/* Overall Rating */}
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>{t('overallRating')}</Text>
                <View style={styles.ratingContainer}>
                  {[1, 2, 3, 4, 5].map((star) => (
                    <TouchableOpacity
                      key={star}
                      style={styles.starButton}
                      onPress={() => setRating(star)}
                    >
                      <Star
                        size={32}
                        color={star <= rating ? '#F59E0B' : '#E5E7EB'}
                        fill={star <= rating ? '#F59E0B' : 'transparent'}
                      />
                    </TouchableOpacity>
                  ))}
                </View>
              </View>

              {/* Email (Optional) */}
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>{t('emailOptional')}</Text>
                <TextInput
                  style={styles.emailInput}
                  placeholder={t('enterEmail')}
                  value={email}
                  onChangeText={setEmail}
                  keyboardType="email-address"
                  autoCapitalize="none"
                />
                <Text style={styles.emailNote}>{t('emailNote')}</Text>
              </View>

              {/* Submit Button */}
              <TouchableOpacity
                style={[styles.submitButton, isSubmitting && styles.submitButtonDisabled]}
                onPress={handleSubmit}
                disabled={isSubmitting}
              >
                <LinearGradient
                  colors={selectedTypeData ? [selectedTypeData.color, selectedTypeData.color] : ['#667eea', '#764ba2']}
                  style={styles.submitButtonGradient}
                >
                  <Send size={20} color="#FFFFFF" />
                  <Text style={styles.submitButtonText}>
                    {isSubmitting ? t('submitting') : t('submitFeedback')}
                  </Text>
                </LinearGradient>
              </TouchableOpacity>
            </>
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
  section: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#1F2937',
    marginBottom: 12,
  },
  typeGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  typeCard: {
    width: '48%',
    borderRadius: 16,
    overflow: 'hidden',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
  },
  typeCardSelected: {
    elevation: 6,
    shadowOpacity: 0.15,
  },
  typeCardGradient: {
    padding: 16,
    alignItems: 'center',
    minHeight: 100,
    justifyContent: 'center',
  },
  typeIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  typeIconSelected: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
  typeTitle: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: '#1F2937',
    textAlign: 'center',
  },
  typeTitleSelected: {
    color: '#FFFFFF',
  },
  titleInput: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#1F2937',
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  descriptionInput: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#1F2937',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    minHeight: 120,
  },
  emailInput: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#1F2937',
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  characterCount: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#9CA3AF',
    textAlign: 'right',
    marginTop: 8,
  },
  emailNote: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
    marginTop: 8,
  },
  ratingContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 8,
  },
  starButton: {
    padding: 4,
  },
  submitButton: {
    marginHorizontal: 20,
    borderRadius: 16,
    elevation: 4,
    shadowColor: '#000',
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