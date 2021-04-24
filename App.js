import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Icon } from 'react-native-elements';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { Provider } from 'react-redux';
import { StyleSheet, Text, View, Alert } from 'react-native';

import registerForNotifications from './src/services/pushNotifications';
import { store, persistor } from './src/store';
import { PersistGate } from 'redux-persist/integration/react';
import * as Notifications from 'expo-notifications';

import AuthScreen from './src/screens/AuthScreen';
import WelcomeScreen from './src/screens/WelcomeScreen';
import MapScreen from './src/screens/MapScreen';
import DeckScreen from './src/screens/DeckScreen';
import ReviewScreen from './src/screens/ReviewScreen';
import SettingsScreen from './src/screens/SettingsScreen';

export default class App extends React.Component {
  componentDidMount() {
    registerForNotifications();
    Notifications.addNotificationReceivedListener((notification) => {
      const {
        data: { text },
        origin,
      } = notification;

      if (origin === 'received' && text) {
        Alert.alert('New Push Notification', text, [{ text: 'Ok.' }]);
      }
    });
  }

  render() {
    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <AppContainer />
        </PersistGate>
      </Provider>
    );
  }
}

const MainNavigator = createBottomTabNavigator(
  {
    Welcome: WelcomeScreen,
    Auth: AuthScreen,
    main: createBottomTabNavigator(
      {
        Map: MapScreen,
        Deck: DeckScreen,
        Review: createStackNavigator(
          {
            Review: ReviewScreen,
            Settings: SettingsScreen,
          },
          {
            navigationOptions: {
              title: 'Review Jobs',
              tabBarIcon: ({ tintColor }) => {
                return <Icon name="favorite" size={30} color={tintColor} />;
              },
            },
          }
        ),
      },
      {
        tabBarOptions: {
          labelStyle: { fontSize: 12 },
        },
      }
    ),
  },
  {
    initialRouteName: 'Welcome',
    defaultNavigationOptions: {
      tabBarVisible: false,
    },
  }
);

const AppContainer = createAppContainer(MainNavigator);
