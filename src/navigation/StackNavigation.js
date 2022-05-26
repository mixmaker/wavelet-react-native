import React from 'react';
import {
  CardStyleInterpolators,
  createStackNavigator,
} from '@react-navigation/stack';
import DetailScreen from '../screens/DetailScreen';
import Player from '../screens/Player';
import TabNavigation from './TabNavigation';
import useAppContext from '../contexts/useAppContext';

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
        name="Player"
        component={Player}
        options={{
          headerShown: false,
          cardStyleInterpolator: animationType,
          gestureEnabled: true,
          gestureDirection: 'vertical',
        }}
      />
    </Stack.Navigator>
  );
};

export default StackNavigation;
