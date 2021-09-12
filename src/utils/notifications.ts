import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';
import storage from './storage'

const KEY = 'BLOG'

export const saveIdentifier = async ({ id, identifier }: {id: string, identifier: string}) => {
  return storage.storeData(`${KEY}_${id}`, identifier)
}

export const getIdentifier = async (id: string) => {
  return storage.getData(`${KEY}_${id}`)
}

export const removeIdentifier = async  (id: string) => {
  return storage.removeData(`${KEY}_${id}`)
}

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: false,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});


export async function schedulePushNotification({
    title,
    body,
}: {
  title: string,
  body: string,
}) {
    return Notifications.scheduleNotificationAsync({
      content: {
        title,
        body,
      },
      trigger: {
        seconds: 60,
        repeats: true,
      },
    });
  }

  export async function cancelAllPushNotification() {
    return Notifications.cancelAllScheduledNotificationsAsync()
  }

  export async function cancelScheduledNotificationAsync(identifier: string) {
    return Notifications.cancelScheduledNotificationAsync(identifier)
  }

  export async function registerForPushNotificationsAsync(platform: string) {
    let token;
    if (Device.isDevice) {
      const { status: existingStatus } = await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      if (existingStatus !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      if (finalStatus !== 'granted') {
        alert('Failed to get push token for push notification!');
        return;
      }
      token = (await Notifications.getExpoPushTokenAsync()).data;
      console.log(token);
    } else {
      alert('Must use physical device for Push Notifications');
    }

    if (platform === 'android') {
      Notifications.setNotificationChannelAsync('default', {
        name: 'default',
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: '#FF231F7C',
      });
    }

    return token;
  }
