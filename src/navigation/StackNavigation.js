import React from 'react';
import {
  CardStyleInterpolators,
  createStackNavigator,
} from '@react-navigation/stack';
import DetailScreen from '../screens/DetailScreen';
import Player from '../screens/Player';
import TabNavigation from './TabNavigation';
import useAppContext from '../contexts/useAppContext';
import AppearanceSettings from '../screens/settings/AppearanceSettings';
import GeneralSettings from '../screens/settings/GeneralSettings';
import About from '../screens/About';
import AudioPlayerSettings from '../screens/settings/AudioPlayerSettings';
import Search from '../screens/Search';
import LikedSongs from '../screens/LikedSongs';

const Stack = createStackNavigator();

const StackNavigation = () => {
  const { playerAnimationType } = useAppContext();
  const animationType =
    playerAnimationType === 'Classic'
      ? CardStyleInterpolators.forVerticalIOS
      : playerAnimationType === 'iOS Modal Type'
      ? CardStyleInterpolators.forModalPresentationIOS
      : CardStyleInterpolators.forRevealFromBottomAndroid;
  return (
    <Stack.Navigator initialRouteName="HomeTab" id="Stack">
      <Stack.Screen
        name="HomeTab"
        component={TabNavigation}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="DetailScreen"
        component={DetailScreen}
        options={{
          headerShown: false,
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
          gestureEnabled: true,
        }}
      />
      <Stack.Screen
        name="Search"
        component={Search}
        options={{
          headerShown: false,
          cardStyleInterpolator:
            CardStyleInterpolators.forRevealFromBottomAndroid,
          gestureEnabled: true,
        }}
      />
      <Stack.Screen
        name="LikedSongs"
        component={LikedSongs}
        options={{
          headerShown: false,
          cardStyleInterpolator:
            CardStyleInterpolators.forHorizontalIOS,
          gestureEnabled: true,
        }}
      />
      <Stack.Screen
        name="Player"
        component={Player}
        options={{
          headerShown: false,
          cardStyleInterpolator: animationType,
          gestureEnabled: true,
          gestureDirection: 'vertical',
        }}
      />
      <Stack.Screen
        name="AppearanceSettings"
        component={AppearanceSettings}
        options={{
          headerShown: false,
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        }}
      />
      <Stack.Screen
        name="GeneralSettings"
        component={GeneralSettings}
        options={{
          headerShown: false,
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        }}
      />
      <Stack.Screen
        name="AudioPlayerSettings"
        component={AudioPlayerSettings}
        options={{
          headerShown: false,
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        }}
      />
      <Stack.Screen
        name="About"
        component={About}
        options={{
          headerShown: false,
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        }}
      />
    </Stack.Navigator>
  );
};

export default StackNavigation;
