import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { X, Shield, Lock, Eye, Database, UserCheck, CircleAlert as AlertCircle } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import { useLanguage } from '@/hooks/useLanguage';

export default function PrivacyPolicyScreen() {
  const router = useRouter();
  const { t } = useLanguage();

  const handleClose = () => {
    router.back();
  };

  return (
    <View style={styles.container}>
      {/* Premium gradient header */}
      <LinearGradient
        colors={['#667eea', '#764ba2', '#f093fb']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.header}
      >
        <SafeAreaView>
          <View style={styles.headerContent}>
            <TouchableOpacity onPress={handleClose} style={styles.closeButton}>
              <X size={24} color="#FFFFFF" />
            </TouchableOpacity>
            
            <View style={styles.titleSection}>
              <View style={styles.iconContainer}>
                <Shield size={28} color="#FFFFFF" />
              </View>
              <Text style={styles.headerTitle}>{t('privacyPolicyTitle')}</Text>
              <Text style={styles.headerSubtitle}>{t('privacyPolicySubtitle')}</Text>
            </View>
            
            <View style={styles.headerDecoration}>
              <Lock size={20} color="rgba(255, 255, 255, 0.6)" />
            </View>
          </View>
        </SafeAreaView>
      </LinearGradient>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.policyContainer}>
          
          {/* Update date */}
          <View style={styles.updateSection}>
            <Text style={styles.updateText}>{t('lastUpdated')}</Text>
          </View>

          {/* Introduction */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Eye size={20} color="#667eea" />
              <Text style={styles.sectionTitle}>{t('introduction')}</Text>
            </View>
            <Text style={styles.sectionContent}>
              {t('appTitle')}へようこそ！私たちはプライバシーの重要性を理解しており、個人情報の収集、使用、保存、保護の方法を説明するために、このプライバシーポリシーを作成しました。
            </Text>
            <Text style={styles.sectionContent}>
              アプリを使用することで、このプライバシーポリシーの条項に同意したことになります。このポリシーに同意しない場合は、サービスを使用しないでください。
            </Text>
          </View>

          {/* Information Collection */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Database size={20} color="#667eea" />
              <Text style={styles.sectionTitle}>{t('informationWeCollect')}</Text>
            </View>
            
            <View style={styles.subsection}>
              <Text style={styles.subsectionTitle}>1. {t('itemInformation')}</Text>
              <Text style={styles.sectionContent}>
                {t('itemInfoDetails')}
              </Text>
            </View>

            <View style={styles.subsection}>
              <Text style={styles.subsectionTitle}>2. {t('deviceInformation')}</Text>
              <Text style={styles.sectionContent}>
                {t('deviceInfoDetails')}
              </Text>
            </View>

            <View style={styles.subsection}>
              <Text style={styles.subsectionTitle}>3. {t('usageData')}</Text>
              <Text style={styles.sectionContent}>
                {t('usageDataDetails')}
              </Text>
            </View>
          </View>

          {/* Information Usage */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <UserCheck size={20} color="#667eea" />
              <Text style={styles.sectionTitle}>{t('howWeUseInformation')}</Text>
            </View>
            
            <Text style={styles.sectionContent}>
              {t('howWeUseDetails')}
            </Text>
          </View>

          {/* Data Storage */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Lock size={20} color="#667eea" />
              <Text style={styles.sectionTitle}>{t('dataStorageAndSecurity')}</Text>
            </View>
            
            <View style={styles.highlightBox}>
              <AlertCircle size={16} color="#059669" />
              <Text style={styles.highlightText}>
                {t('localStorageNotice')}
              </Text>
            </View>

            <Text style={styles.sectionContent}>
              {t('dataSecurityDetails')}
            </Text>
          </View>

          {/* Third-party Services */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Shield size={20} color="#667eea" />
              <Text style={styles.sectionTitle}>{t('thirdPartyServices')}</Text>
            </View>
            
            <Text style={styles.sectionContent}>{t('thirdPartyDetails')}</Text>
          </View>

          {/* User Rights */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <UserCheck size={20} color="#667eea" />
              <Text style={styles.sectionTitle}>{t('yourRights')}</Text>
            </View>
            
            <Text style={styles.sectionContent}>{t('yourRightsDetails')}</Text>
          </View>

          {/* Children's Privacy */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Shield size={20} color="#667eea" />
              <Text style={styles.sectionTitle}>{t('childrensPrivacy')}</Text>
            </View>
            
            <Text style={styles.sectionContent}>{t('childrensPrivacyDetails')}</Text>
          </View>

          {/* Policy Updates */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <AlertCircle size={20} color="#667eea" />
              <Text style={styles.sectionTitle}>{t('policyUpdates')}</Text>
            </View>
            
            <Text style={styles.sectionContent}>{t('policyUpdatesDetails')}</Text>
          </View>

          {/* Contact Us */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Eye size={20} color="#667eea" />
              <Text style={styles.sectionTitle}>{t('contactUs')}</Text>
            </View>
            
            <Text style={styles.sectionContent}>{t('contactUsDetails')}</Text>
            
            <View style={styles.contactBox}>
              <Text style={styles.contactText}>{t('contactEmail')}</Text>
              <Text style={styles.contactText}>{t('contactPhone')}</Text>
              <Text style={styles.contactText}>{t('contactAddress')}</Text>
            </View>
          </View>

          {/* Bottom spacing */}
          <View style={styles.bottomSpacing} />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  header: {
    paddingBottom: 32,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingTop: 16,
  },
  closeButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleSection: {
    flex: 1,
    alignItems: 'center',
  },
  iconContainer: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  headerTitle: {
    fontSize: 24,
    fontFamily: 'Inter-Bold',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: 'rgba(255, 255, 255, 0.8)',
    textAlign: 'center',
  },
  headerDecoration: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    flex: 1,
    marginTop: -16,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    backgroundColor: '#f8fafc',
  },
  policyContainer: {
    paddingHorizontal: 24,
    paddingTop: 32,
  },
  updateSection: {
    alignItems: 'center',
    marginBottom: 32,
    paddingVertical: 12,
    backgroundColor: '#e0f2fe',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#b3e5fc',
  },
  updateText: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#0277bd',
  },
  section: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    elevation: 2,
    shadowColor: '#667eea',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    borderWidth: 1,
    borderColor: '#f1f5f9',
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: 'Inter-Bold',
    color: '#1e293b',
    marginLeft: 12,
  },
  sectionContent: {
    fontSize: 15,
    fontFamily: 'Inter-Regular',
    color: '#475569',
    lineHeight: 24,
    marginBottom: 12,
  },
  subsection: {
    marginBottom: 16,
  },
  subsectionTitle: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#334155',
    marginBottom: 8,
  },
  highlightBox: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: '#f0fdf4',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#bbf7d0',
    marginBottom: 16,
  },
  highlightText: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#059669',
    marginLeft: 8,
    flex: 1,
    lineHeight: 20,
  },
  contactBox: {
    backgroundColor: '#f8fafc',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    marginTop: 12,
  },
  contactText: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#475569',
    marginBottom: 8,
    lineHeight: 20,
  },
  bottomSpacing: {
    height: 40,
  },
});
