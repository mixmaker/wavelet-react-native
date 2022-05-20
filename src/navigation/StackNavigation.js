import React, { useLayoutEffect } from 'react';
import {
  CardStyleInterpolators,
  createStackNavigator,
} from '@react-navigation/stack';
import Home from '../screens/Home';
import DetailScreen from '../screens/DetailScreen';
import Player from '../screens/Player';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';

const Stack = createStackNavigator();

const StackNavigation = ({ navigation, route }) => {
  // const { colors } = useThemeProvider();
  useLayoutEffect(() => {
    const routeName = getFocusedRouteNameFromRoute(route);
    if (routeName === 'DetailScreen' || routeName === 'Player') {
      navigation.getParent('BottomTab').setOptions({tabBarStyle: {display: 'none'}});
    } else {
      navigation.getParent('BottomTab').setOptions({tabBarStyle: {display: 'flex'}});
    }
  }, [navigation, route]);
  return (
    // // <View style={{marginTop: StatusBar.currentHeight + 10, flex:1}}>
    <Stack.Navigator initialRouteName="HomeTab" id="Stack">
      <Stack.Screen
        name="HomeTab"
        component={Home}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="DetailScreen"
        component={DetailScreen}
        // sharedElements={route => {
        //   const {sharedId} = route.params;
        //   return sharedId;
        // }}
        options={{
          headerShown: false,
          // cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
          gestureEnabled: true,
        }}
      />
      <Stack.Screen
        name="Player"
        component={Player}
        options={{
          headerShown: false,
          cardStyleInterpolator: CardStyleInterpolators.forRevealFromBottomAndroid,
          gestureEnabled: true,
          gestureDirection: 'vertical',
        }}
      />
    </Stack.Navigator>
    // </View>
  );
};

export default StackNavigation;
