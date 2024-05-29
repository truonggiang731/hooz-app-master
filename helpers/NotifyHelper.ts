import * as Notifications from 'expo-notifications';
import {Platform} from 'react-native';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

export async function getExpoPushTokenAsync() {
  const { status } = await Notifications.getPermissionsAsync();

  if (status !== 'granted') {
    return null;
  }

  let token = (await Notifications.getExpoPushTokenAsync()).data;

  return token;
}

export async function registerForPushNotificationsAsync() {
  if (Platform.OS === 'android') {
    Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }

  const { status } = await Notifications.getPermissionsAsync();

  if (status !== 'granted') {
    await Notifications.requestPermissionsAsync();
  }
}
