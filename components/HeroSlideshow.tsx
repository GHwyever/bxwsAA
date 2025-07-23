import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  Animated,
  Image,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { ChevronLeft, ChevronRight, Sparkles, Shield, Bell } from 'lucide-react-native';

const { width } = Dimensions.get('window');
const SLIDE_WIDTH = width - 48; // 24px padding on each side

interface Slide {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  gradient: string[];
  icon: React.ReactNode;
}

const slides: Slide[] = [
  {
    id: 1,
    title: '食物过期提醒',
    subtitle: '智能管理，安心生活',
    description: '通过拍照识别食物，自动设置过期提醒，让您的生活更加有序安全。',
    image: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=800',
    gradient: ['#67e8f9', '#22d3ee', '#0891b2'],
    icon: <Sparkles size={24} color="#FFFFFF" />,
  },
  {
    id: 2,
    title: '食物过期提醒',
    subtitle: '守护您的食物新鲜',
    description: '智能冰箱管理，及时提醒过期食物，减少浪费，保护健康。',
    image: 'https://images.pexels.com/photos/2696064/pexels-photo-2696064.jpeg?auto=compress&cs=tinysrgb&w=800',
    gradient: ['#22d3ee', '#06b6d4', '#0891b2'],
    icon: <Shield size={24} color="#FFFFFF" />,
  },
  {
    id: 3,
    title: '食物过期提醒',
    subtitle: '贴心提醒，健康生活',
    description: '可爱的食物角色提醒您注意保质期，让健康管理变得有趣简单。',
    image: 'https://images.pexels.com/photos/102104/pexels-photo-102104.jpeg?auto=compress&cs=tinysrgb&w=800',
    gradient: ['#67e8f9', '#22d3ee', '#0891b2'],
    icon: <Bell size={24} color="#FFFFFF" />,
  },
];

export function HeroSlideshow() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollViewRef = useRef<ScrollView>(null);
  const fadeAnim = useRef(new Animated.Value(1)).current;
  const scaleAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => {
        const nextIndex = (prevIndex + 1) % slides.length;
        scrollToSlide(nextIndex);
        return nextIndex;
      });
    }, 4000);

    return () => clearInterval(timer);
  }, []);

  const scrollToSlide = (index: number) => {
    if (scrollViewRef.current) {
      // 添加淡入淡出动画
      Animated.sequence([
        Animated.parallel([
          Animated.timing(fadeAnim, {
            toValue: 0.7,
            duration: 200,
            useNativeDriver: true,
          }),
          Animated.timing(scaleAnim, {
            toValue: 0.95,
            duration: 200,
            useNativeDriver: true,
          }),
        ]),
        Animated.parallel([
          Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 300,
            useNativeDriver: true,
          }),
          Animated.timing(scaleAnim, {
            toValue: 1,
            duration: 300,
            useNativeDriver: true,
          }),
        ]),
      ]).start();

      scrollViewRef.current.scrollTo({
        x: index * SLIDE_WIDTH,
        animated: true,
      });
    }
  };

  const handleScroll = (event: any) => {
    const scrollPosition = event.nativeEvent.contentOffset.x;
    const index = Math.round(scrollPosition / SLIDE_WIDTH);
    setCurrentIndex(index);
  };

  const goToPrevious = () => {
    const newIndex = currentIndex === 0 ? slides.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
    scrollToSlide(newIndex);
  };

  const goToNext = () => {
    const newIndex = (currentIndex + 1) % slides.length;
    setCurrentIndex(newIndex);
    scrollToSlide(newIndex);
  };

  const renderSlide = (slide: Slide, index: number) => (
    <Animated.View
      key={slide.id}
      style={[
        styles.slide,
        {
          opacity: fadeAnim,
          transform: [{ scale: scaleAnim }],
        },
      ]}
    >
      <LinearGradient
        colors={slide.gradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.slideGradient}
      >
        {/* 背景装饰 */}
        <View style={styles.backgroundDecorations}>
          <View style={[styles.floatingCircle, styles.circle1]} />
          <View style={[styles.floatingCircle, styles.circle2]} />
          <View style={[styles.floatingCircle, styles.circle3]} />
        </View>

        <View style={styles.slideContent}>
          {/* 图标和标题区域 */}
          <View style={styles.headerSection}>
            <View style={styles.iconContainer}>
              {slide.icon}
            </View>
            <Text style={styles.slideTitle}>{slide.title}</Text>
            <Text style={styles.slideSubtitle}>{slide.subtitle}</Text>
          </View>

          {/* 图片区域 */}
          <View style={styles.imageContainer}>
            <View style={styles.imageFrame}>
              <Image source={{ uri: slide.image }} style={styles.slideImage} />
              <View style={styles.imageOverlay} />
            </View>
            
            {/* 图片装饰 */}
            <View style={styles.imageDecorations}>
              <View style={styles.sparkle1}>
                <Sparkles size={12} color="rgba(255, 255, 255, 0.6)" />
              </View>
              <View style={styles.sparkle2}>
                <Sparkles size={8} color="rgba(255, 255, 255, 0.4)" />
              </View>
            </View>
          </View>

          {/* 描述文字 */}
          <View style={styles.descriptionContainer}>
            <Text style={styles.slideDescription}>{slide.description}</Text>
          </View>
        </View>
      </LinearGradient>
    </Animated.View>
  );

  return (
    <View style={styles.container}>
      <ScrollView
        ref={scrollViewRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        decelerationRate="fast"
        snapToInterval={SLIDE_WIDTH}
        snapToAlignment="start"
        contentContainerStyle={styles.scrollContainer}
      >
        {slides.map((slide, index) => renderSlide(slide, index))}
      </ScrollView>

      {/* 导航控制 */}
      <View style={styles.controls}>
        <TouchableOpacity style={styles.navButton} onPress={goToPrevious}>
          <ChevronLeft size={20} color="#FFFFFF" />
        </TouchableOpacity>

        {/* 指示器 */}
        <View style={styles.indicators}>
          {slides.map((_, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.indicator,
                index === currentIndex && styles.activeIndicator,
              ]}
              onPress={() => {
                setCurrentIndex(index);
                scrollToSlide(index);
              }}
            />
          ))}
        </View>

        <TouchableOpacity style={styles.navButton} onPress={goToNext}>
          <ChevronRight size={20} color="#FFFFFF" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 280,
    marginBottom: 32,
  },
  scrollContainer: {
    paddingHorizontal: 24,
  },
  slide: {
    width: SLIDE_WIDTH,
    height: 240,
    marginRight: 0,
    borderRadius: 24,
    overflow: 'hidden',
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
  },
  slideGradient: {
    flex: 1,
    position: 'relative',
  },
  backgroundDecorations: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  floatingCircle: {
    position: 'absolute',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 50,
  },
  circle1: {
    width: 80,
    height: 80,
    top: -20,
    right: -20,
  },
  circle2: {
    width: 60,
    height: 60,
    bottom: -15,
    left: -15,
  },
  circle3: {
    width: 40,
    height: 40,
    top: 60,
    left: 20,
  },
  slideContent: {
    flex: 1,
    padding: 20,
    justifyContent: 'space-between',
  },
  headerSection: {
    alignItems: 'center',
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  slideTitle: {
    fontSize: 20,
    fontFamily: 'Inter-Bold',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 4,
  },
  slideSubtitle: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: 'rgba(255, 255, 255, 0.9)',
    textAlign: 'center',
  },
  imageContainer: {
    alignItems: 'center',
    position: 'relative',
  },
  imageFrame: {
    width: 80,
    height: 80,
    borderRadius: 16,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.3)',
    position: 'relative',
  },
  slideImage: {
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
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
  },
  imageDecorations: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  sparkle1: {
    position: 'absolute',
    top: -5,
    right: 10,
  },
  sparkle2: {
    position: 'absolute',
    bottom: 5,
    left: 15,
  },
  descriptionContainer: {
    alignItems: 'center',
  },
  slideDescription: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: 'rgba(255, 255, 255, 0.8)',
    textAlign: 'center',
    lineHeight: 18,
  },
  controls: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    marginTop: 16,
  },
  navButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(8, 145, 178, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4,
    shadowColor: '#0891b2',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
  },
  indicators: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  indicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'rgba(8, 145, 178, 0.3)',
  },
  activeIndicator: {
    backgroundColor: '#0891b2',
    width: 24,
  },
});
