import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Image,
  Dimensions,
  TextInput,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { X, Camera, RotateCcw, Save } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import { useLanguage } from '@/hooks/useLanguage';
import { FoodItem } from '@/types/food';
import { foodStorage } from '@/utils/storage';
import { scheduleNotification } from '@/utils/notifications';
import { foodRecognitionService } from '@/utils/foodRecognition';
import uuid from 'react-native-uuid';

const { width, height } = Dimensions.get('window');

export default function CameraScreen() {
  const [permission, requestPermission] = useCameraPermissions();
  const [facing, setFacing] = useState<'front' | 'back'>('back');
  const [capturedPhoto, setCapturedPhoto] = useState<string | null>(null);
  const [expiryDays, setExpiryDays] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const cameraRef = useRef<CameraView>(null);
  const router = useRouter();
  const { t } = useLanguage();

  const handleTakePicture = async () => {
    if (!cameraRef.current) return;
    
    try {
      const photo = await cameraRef.current.takePictureAsync();
      if (photo) {
        setCapturedPhoto(photo.uri);
      }
    } catch (error) {
      console.error('Failed to take picture:', error);
      Alert.alert(t('error'), t('photoError'));
    }
  };

  const handleSave = async () => {
    if (!capturedPhoto) {
      Alert.alert(t('error'), 'Please take a photo first');
      return;
    }

    if (!expiryDays || isNaN(Number(expiryDays))) {
      Alert.alert(t('error'), t('validDaysRequired'));
      return;
    }

    setIsSaving(true);
    try {
      const expiryDate = new Date();
      expiryDate.setDate(expiryDate.getDate() + Number(expiryDays));

      const item: FoodItem = {
        id: uuid.v4() as string,
        name: 'Item',
        category: 'other' as any,
        productionDate: new Date(),
        expiryDate,
        imageUri: capturedPhoto,
        createdAt: new Date(),
      };

      await foodStorage.addFood(item);
      await scheduleNotification(item);

      Alert.alert(t('success'), t('itemSaved'), [
        { text: t('ok'), onPress: () => router.back() },
      ]);
    } catch (error) {
      console.error('Failed to save item:', error);
      Alert.alert(t('error'), t('saveError'));
    } finally {
      setIsSaving(false);
    }
  };

  const handleRetake = () => {
    setCapturedPhoto(null);
    setExpiryDays('');
  };

  const handleClose = () => {
    router.back();
  };

  const toggleCameraFacing = () => {
    setFacing(current => (current === 'back' ? 'front' : 'back'));
  };

  if (!permission) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.permissionText}>{t('loadingCamera')}</Text>
      </SafeAreaView>
    );
  }

  if (!permission.granted) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.permissionContainer}>
          <Text style={styles.permissionTitle}>{t('cameraPermissionTitle')}</Text>
          <Text style={styles.permissionText}>{t('cameraPermissionText')}</Text>
          <TouchableOpacity
            style={styles.permissionButton}
            onPress={requestPermission}
          >
            <Text style={styles.permissionButtonText}>{t('grantPermission')}</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  // Show item card editing interface
  if (capturedPhoto) {
    return (
      <SafeAreaView style={styles.container}>
        <KeyboardAvoidingView
          style={styles.container}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
          <View style={styles.editContainer}>
            <View style={styles.header}>
              <TouchableOpacity onPress={handleClose}>
                <X size={24} color="#1F2937" />
              </TouchableOpacity>
              <Text style={styles.headerTitle}>{t('addItem')}</Text>
              <View style={{ width: 24 }} />
            </View>

            <View style={styles.cardContainer}>
              <View style={styles.itemCard}>
                {/* Item thumbnail */}
                <View style={styles.thumbnailContainer}>
                  <Image source={{ uri: capturedPhoto }} style={styles.thumbnail} />
                </View>

                {/* Expiry input */}
                <View style={styles.inputSection}>
                  <Text style={styles.inputLabel}>{t('expiryDays')}</Text>
                  <View style={styles.inputContainer}>
                    <TextInput
                      style={styles.daysInput}
                      placeholder={t('enterExpiryDays')}
                      value={expiryDays}
                      onChangeText={setExpiryDays}
                      keyboardType="numeric"
                      maxLength={3}
                    />
                    <Text style={styles.daysLabel}>{t('days')}</Text>
                  </View>
                </View>

                {/* Action buttons */}
                <View style={styles.buttonContainer}>
                  <TouchableOpacity style={styles.retakeButton} onPress={handleRetake}>
                    <RotateCcw size={18} color="#6366F1" />
                    <Text style={styles.retakeButtonText}>{t('retake')}</Text>
                  </TouchableOpacity>

                  <TouchableOpacity 
                    style={[styles.saveButton, (!expiryDays || isSaving) && styles.saveButtonDisabled]} 
                    onPress={handleSave}
                    disabled={!expiryDays || isSaving}
                  >
                    <Save size={18} color="#FFFFFF" />
                    <Text style={styles.saveButtonText}>
                      {isSaving ? t('saving') : t('save')}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    );
  }

  // Camera capture interface
  return (
    <SafeAreaView style={styles.container}>
      <CameraView
        style={styles.camera}
        facing={facing}
        ref={cameraRef}
      >
        <View style={styles.overlay}>
          <View style={styles.cameraHeader}>
            <TouchableOpacity style={styles.closeButton} onPress={handleClose}>
              <X size={24} color="#FFFFFF" />
            </TouchableOpacity>
            <Text style={styles.cameraTitle}>{t('captureItem')}</Text>
            <TouchableOpacity style={styles.flipButton} onPress={toggleCameraFacing}>
              <RotateCcw size={24} color="#FFFFFF" />
            </TouchableOpacity>
          </View>

          <View style={styles.centerContent}>
            <View style={styles.instructionCard}>
              <Text style={styles.instructionTitle}>{t('takePhoto')}</Text>
              <Text style={styles.instructionText}>{t('photoOverviewInstructions')}</Text>
            </View>
          </View>

          <View style={styles.footer}>
            <TouchableOpacity
              style={styles.captureButton}
              onPress={handleTakePicture}
            >
              <View style={styles.captureButtonInner}>
                <Camera size={32} color="#6366F1" />
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </CameraView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  camera: {
    flex: 1,
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  cameraHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  closeButton: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 12,
    borderRadius: 25,
  },
  cameraTitle: {
    color: '#FFFFFF',
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
  },
  flipButton: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 12,
    borderRadius: 25,
  },
  centerContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  instructionCard: {
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    padding: 20,
    borderRadius: 16,
    alignItems: 'center',
  },
  instructionTitle: {
    color: '#FFFFFF',
    fontSize: 20,
    fontFamily: 'Inter-SemiBold',
    textAlign: 'center',
    marginBottom: 8,
  },
  instructionText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    textAlign: 'center',
    lineHeight: 24,
  },
  footer: {
    alignItems: 'center',
    paddingBottom: 40,
  },
  captureButton: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 4,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  captureButtonInner: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#F3F4F6',
    justifyContent: 'center',
    alignItems: 'center',
  },
  editContainer: {
    flex: 1,
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
  cardContainer: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  itemCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 24,
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  thumbnailContainer: {
    alignItems: 'center',
    marginBottom: 24,
  },
  thumbnail: {
    width: 120,
    height: 120,
    borderRadius: 16,
    backgroundColor: '#F3F4F6',
  },
  inputSection: {
    marginBottom: 24,
  },
  inputLabel: {
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
    borderWidth: 2,
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
  buttonContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  retakeButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F3F4F6',
    paddingVertical: 16,
    borderRadius: 16,
    gap: 8,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  retakeButtonText: {
    color: '#6366F1',
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
  },
  saveButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#6366F1',
    paddingVertical: 16,
    borderRadius: 16,
    gap: 8,
  },
  saveButtonDisabled: {
    backgroundColor: '#9CA3AF',
  },
  saveButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
  },
  permissionContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  permissionTitle: {
    fontSize: 20,
    fontFamily: 'Inter-SemiBold',
    color: '#1F2937',
    marginBottom: 12,
    textAlign: 'center',
  },
  permissionText: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
    textAlign: 'center',
    marginBottom: 24,
  },
  permissionButton: {
    backgroundColor: '#6366F1',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 12,
  },
  permissionButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontFamily: 'Inter-Medium',
  },
});
