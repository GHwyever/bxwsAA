import { useState, useEffect } from 'react';
import { foodStorage } from '@/utils/storage';
import { requestNotificationPermissions } from '@/utils/notifications';

export function useNotifications() {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);

  useEffect(() => {
    loadNotificationSettings();
  }, []);

  const loadNotificationSettings = async () => {
    try {
      const settings = await foodStorage.getNotificationSettings();
      setNotificationsEnabled(settings.enabled);
    } catch (error) {
      console.error('Failed to load notification settings:', error);
    }
  };

  const toggleNotifications = async () => {
    try {
      const newEnabled = !notificationsEnabled;
      
      if (newEnabled) {
        // Request permission when enabling notifications
        const hasPermission = await requestNotificationPermissions();
        if (!hasPermission) {
          return; // Don't enable if permission denied
        }
      }

      await foodStorage.setNotificationSettings({ enabled: newEnabled });
      setNotificationsEnabled(newEnabled);
    } catch (error) {
      console.error('Failed to toggle notifications:', error);
    }
  };

  return {
    notificationsEnabled,
    toggleNotifications,
  };
}
