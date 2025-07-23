import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';
import { FoodItem } from '@/types/food';
import { voiceManager } from './voiceNotifications';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

// 增强的通知配置
export async function configureNotifications() {
  if (Platform.OS === 'web') {
    // Web平台使用浏览器通知API
    if ('Notification' in window) {
      const permission = await Notification.requestPermission();
      return permission === 'granted';
    }
    return false;
  }

  // 移动端配置
  await Notifications.setNotificationChannelAsync('food-expiry', {
    name: '物品过期提醒',
    importance: Notifications.AndroidImportance.HIGH,
    vibrationPattern: [0, 250, 250, 250],
    lightColor: '#FF6B6B',
    sound: 'default',
    enableVibrate: true,
    enableLights: true,
  });

  return true;
}

export async function requestNotificationPermissions() {
  await configureNotifications();
  
  const { status: existingStatus } = await Notifications.getPermissionsAsync();
  let finalStatus = existingStatus;
  
  if (existingStatus !== 'granted') {
    const { status } = await Notifications.requestPermissionsAsync();
    finalStatus = status;
  }
  
  return finalStatus === 'granted';
}

// 发送浏览器通知（Web平台）
async function sendWebNotification(title: string, body: string, data?: any) {
  if ('Notification' in window && Notification.permission === 'granted') {
    const notification = new Notification(title, {
      body,
      icon: '/assets/images/icon.png',
      badge: '/assets/images/icon.png',
      tag: data?.foodId || 'food-expiry',
      requireInteraction: true,
      data,
    });

    // 点击通知时的处理
    notification.onclick = () => {
      window.focus();
      notification.close();
    };

    // 自动关闭通知
    setTimeout(() => {
      notification.close();
    }, 10000);
  }
}

// 触发语音提醒
async function triggerVoiceAlert(food: FoodItem, daysUntilExpiry: number) {
  try {
    // 只在用户设置中启用语音且通知被触发时播报
    const settings = await voiceManager.getSettings();
    if (settings.enabled) {
      await voiceManager.speakFoodExpiry(food, daysUntilExpiry);
    }
  } catch (error) {
    console.error('语音提醒失败:', error);
  }
}

export async function scheduleNotification(food: FoodItem) {
  try {
    // Cancel existing notifications for this food (only on native platforms)
    if (Platform.OS !== 'web') {
      const existingNotifications = await Notifications.getAllScheduledNotificationsAsync();
      const foodNotifications = existingNotifications.filter(
        notification => notification.identifier.includes(food.id)
      );
      
      for (const notification of foodNotifications) {
        await Notifications.cancelScheduledNotificationAsync(notification.identifier);
      }
    }

    const now = new Date();
    const expiryDate = new Date(food.expiryDate);
    
    // 增强的通知调度：3天、2天、1天前以及过期当天
    const notificationDays = [3, 2, 1];
    
    for (const days of notificationDays) {
      const notificationDate = new Date(expiryDate);
      notificationDate.setDate(notificationDate.getDate() - days);
      
      // Only schedule if the notification date is in the future
      if (notificationDate > now) {
        const identifier = `${food.id}-${days}days`;
        
        const title = days === 1 ? '物品明天过期！' : `物品${days}天后过期`;
        const body = `您的物品即将过期，请及时处理！`;
        
        if (Platform.OS === 'web') {
          // Web平台使用setTimeout模拟定时通知
          const delay = notificationDate.getTime() - now.getTime();
          if (delay > 0) {
            setTimeout(async () => {
              await sendWebNotification(title, body, { foodId: food.id, days });
              // 移除自动语音播报，只在通知被点击时播报
            }, delay);
          }
        } else {
          // 移动端使用expo-notifications
          await Notifications.scheduleNotificationAsync({
            identifier,
            content: {
              title,
              body,
              data: { foodId: food.id, days },
              sound: 'default',
              priority: Notifications.AndroidNotificationPriority.HIGH,
              categoryIdentifier: 'food-expiry',
            },
            trigger: {
              date: notificationDate,
              channelId: 'food-expiry',
            },
          });
        }
      }
    }
    
    // 过期当天通知
    const expiredNotificationDate = new Date(expiryDate);
    expiredNotificationDate.setHours(9, 0, 0, 0); // 上午9点提醒
    
    if (expiredNotificationDate > now) {
      const identifier = `${food.id}-expired`;
      const title = '物品已过期！';
      const body = `您的物品已过期，请安全处理。`;
      
      if (Platform.OS === 'web') {
        const delay = expiredNotificationDate.getTime() - now.getTime();
        if (delay > 0) {
          setTimeout(async () => {
            await sendWebNotification(title, body, { foodId: food.id, expired: true });
            // 移除自动语音播报，只在通知被点击时播报
          }, delay);
        }
      } else {
        await Notifications.scheduleNotificationAsync({
          identifier,
          content: {
            title,
            body,
            data: { foodId: food.id, expired: true },
            sound: 'default',
            priority: Notifications.AndroidNotificationPriority.HIGH,
            categoryIdentifier: 'food-expiry',
          },
          trigger: {
            date: expiredNotificationDate,
            channelId: 'food-expiry',
          },
        });
      }
    }
  } catch (error) {
    console.error('Failed to schedule notification:', error);
  }
}

export async function cancelAllNotifications() {
  try {
    if (Platform.OS !== 'web') {
      await Notifications.cancelAllScheduledNotificationsAsync();
    }
  } catch (error) {
    console.error('Failed to cancel notifications:', error);
  }
}

// 检查即将过期的物品并触发语音提醒
export async function checkExpiringItemsAndNotify(foods: FoodItem[]) {
  const today = new Date();
  const expiringFoods = foods.filter(food => {
    const daysUntilExpiry = Math.ceil((new Date(food.expiryDate).getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
    return daysUntilExpiry >= -1 && daysUntilExpiry <= 3;
  });

  // 移除自动语音播报，只在用户主动触发时播报
  // 语音播报现在只通过通知系统或用户手动操作触发
}
