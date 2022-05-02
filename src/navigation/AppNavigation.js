import React from 'react';
import {
  CardStyleInterpolators,
  createStackNavigator,
} from '@react-navigation/stack';
import HomeNavigation from './HomeNavigation';
import DetailScreen from '../screens/DetailScreen';
import Player from '../screens/Player';
import useAppContext from '../contexts/useAppContext';
import { createSharedElementStackNavigator } from 'react-navigation-shared-element';

const AppNavigation = () => {
  const AppStack = createStackNavigator();
  return (
    <AppStack.Navigator initialRouteName="HomeTab">
      <AppStack.Screen
        name="HomeTab"
        component={HomeNavigation}
        options={{
          headerShown: false,
        }}
      />
      <AppStack.Screen
        name="DetailScreen"
        component={DetailScreen}
        // sharedElements={route => {
        //   const {sharedId} = route.params;
        //   return sharedId;
        // }}
        options={{
          headerShown: false,
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
          gestureEnabled: true,
        }}
      />
      <AppStack.Screen
        name="Player"
        component={Player}
        options={{
          headerShown: false,
          cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS,
          gestureEnabled: true,
          gestureDirection: 'vertical',
        }}
      />
    </AppStack.Navigator>
  );
};

export default AppNavigation;
