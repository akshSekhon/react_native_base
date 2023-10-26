import messaging from '@react-native-firebase/messaging';
import { PermissionsAndroid, Platform } from 'react-native';

import { PERMISSIONS } from 'react-native-permissions';
import { saveFcmTokenToRedux } from '../redux/actions/auth';
// import {getItem, getUserData, setItem} from './utils';
import notifee from '@notifee/react-native';
import { setItem } from './AsyncStorage';


export async function requestUserPermission(callback = () => {}) {
  if (Platform.OS === 'ios') {
    await messaging().registerDeviceForRemoteMessages();
    // await messaging().registerForRemoteNotifications()
  }
  if (Platform.Version >= 33 && Platform.OS === 'android') {
    try {
      const granted = await PermissionsAndroid.request(
        PERMISSIONS.ANDROID.POST_NOTIFICATIONS,
        {
          title: 'Notification Permission',
          message: 'Allow this app to post notifications?',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        getFcmToken();
        callback(false);
      } else {
        callback(true);
      }
    } catch (err) {
      console.warn(err);
    }
  } else {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;
    if (enabled) {
      getFcmToken();
      callback(false);
    } else callback(true);
  }
}


const getFcmToken = async () => {
  try {
    const token = await messaging().getToken();
    await setItem('FCM_TOKEN', token).then(cb => {
      console.log('FCM ', cb);
      saveFcmTokenToRedux(token);
    });
    console.log('FCM token:: ------ ', token);
  } catch (error) {
    console.log(error, 'fcm error in creating token');
  }
};


async function onDisplayNotification(data) {
  // Request permissions (required for iOS)

  console.log(data, 'FCM onDisplayNotification datadatadatadata');

  if (Platform.OS === 'ios') {
    await notifee.requestPermission();
  }

  // Create a channel (required for Android)
  const channelId = await notifee.createChannel({
    id: 'default',
    name: 'name',
    sound: 'default',
    pressAction: {id: 'default'},
    // badgeIconType: AndroidBadgeIconType.LARGE,
    // importance: AndroidImportance.HIGH,
    // vibration: true,
  });

  // Display a notification
  await notifee.displayNotification({
    title: data?.notification?.title,
    body: data?.notification?.body,
    data: data?.data,
    android: {
      channelId,
    },
    ios: {
      sound: 'default',
    },
  });
}

export const notificationListener = async () => {
  const unsubscribe = messaging().onMessage(async remoteMessage => {
    console.log('A new FCM message arrived!', remoteMessage);

    onDisplayNotification(remoteMessage);
  });
  //Backgorund
  messaging().onNotificationOpenedApp(remoteMessage => {
    const {notification} = remoteMessage;
    console.log(remoteMessage, 'background remoteMessageremoteMessage');
    
   
  });

  //Kill or inactive
  messaging()
    .getInitialNotification()
    .then(remoteMessage => {
      console.log(remoteMessage, 'remoteMessageremoteMessage');

    });

    return () => unsubscribe();
};
