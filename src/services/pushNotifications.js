import * as Notifications from 'expo-notifications';
import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';
import Constants from 'expo-constants';

/* 
Note: To test notifications run app on a physical device, You should see a Token on console log 
like this ExponentPushToken[***********************], copy this token and goto https://expo.io/notifications
where you need top paste this token under "To (Expo push token from your app)" and fill other fileds in the form
and press "Send a Notification", you should see a notification on your device.
*/

const PUSH_ENDPOINT = 'https://exp.host/--/api/v2/push/send';

export default async () => {
  if (Constants.isDevice) {
    // Check for previous token in AsyncStorage
    let previousToken = await AsyncStorage.getItem('pushtoken');
    console.log(previousToken);

    if (previousToken) {
      return; // return if present
    } else {
      const { status } = await Notifications.requestPermissionsAsync(); // else request for permission
      finalStatus = status;
    }

    if (finalStatus !== 'granted') {
      return;
    }

    const token = (await Notifications.getExpoPushTokenAsync()).data; // Request for new token on permission granted
    console.log(token);

    await axios.post(
      PUSH_ENDPOINT,
      {
        headers: {
          Accept: 'application/json',
          'Accept-encoding': 'gzip, deflate',
          'Content-Type': 'application/json',
        },
      },
      { token: { token } }
    );

    AsyncStorage.setItem('pushtoken', token); // Saving token to AsyncStorage
  } else {
    alert('Must use physical device for Push Notifications');
  }

  if (Platform.OS === 'android') {
    Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }
};
