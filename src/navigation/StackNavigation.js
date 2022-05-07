import React from 'react';
import Home from '../screens/Home';
import {
  CardStyleInterpolators,
  createStackNavigator,
} from '@react-navigation/stack';
import DetailScreen from '../screens/DetailScreen';
import Player from '../screens/Player';

const Stack = createStackNavigator();

const StackNavigation = () => {
  // const { themeBasedStyles } = useThemeProvider();

  return (
    // // <View style={{marginTop: StatusBar.currentHeight + 10, flex:1}}>
    //   {/* <Entypo
    //         name="menu"
    //         size={24}
    //         color="#fff"
    //         style={{ marginLeft: 15 }}
    //         onPress={() => {
    //           navigation?.openDrawer();
    //         }}
    //         /> */}
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
          // cardStyleInterpolator: CardStyleInterpolators.forRevealFromBottomAndroid,
          gestureEnabled: true,
        }}
      />
      <Stack.Screen
        name="Player"
        component={Player}
        options={{
          headerShown: false,
          cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS,
          gestureEnabled: true,
          gestureDirection: 'vertical',
        }}
      />
    </Stack.Navigator>
    // </View>
  );
};

export default StackNavigation;
