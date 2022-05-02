import { View, Text, Pressable, Animated, Dimensions } from 'react-native';
import React, { useEffect, useState, useRef } from 'react';
import {
  BottomTabBar,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Feather from 'react-native-vector-icons/Feather';
import Home from '../screens/Home';
import Search from '../screens/Search';
import MiniPlayer from '../components/MiniPlayer';
import { BlurView } from '@react-native-community/blur';
import useThemeProvider from '../contexts/useThemeProvider';
import Library from '../screens/Library';

const HomeNavigation = () => {
  const HomeTab = createBottomTabNavigator();
  const { themeBasedStyles } = useThemeProvider();

  const CustomTabBar = props => {
    const { navigation, state } = props;
    // const navindex = useNavigationState(state => state);
    // console.log(navindex);
    const PADDING = 30;
    const { width } = Dimensions.get('window');
    const TAB_BAR_WIDTH = width - 2 * PADDING;
    const TAB_WIDTH = TAB_BAR_WIDTH / 3;
    const [translateX] = useState(new Animated.Value(0));
    const translateTab = index => {
      // console.log(index);
      Animated.spring(translateX, {
        toValue: index * TAB_WIDTH,
        velocity: 70,
        useNativeDriver: true,
      }).start();
    };
    useEffect(() => {
      translateTab(state.index);
    }, [state.index]);

    // console.log(JSON.stringify(state, null, 4));
    return (
      <View style={{ backgroundColor: 'transparent' }}>
        {/* <BlurView
          style={{
            height: 50,
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            // backgroundColor:'#000'
          }}
          tint="light"
          intensity={40}
          overlayColor=""
        /> */}
        <View
          style={{
            position: 'absolute',
            left: 0,
            bottom: 11,
            marginHorizontal: PADDING,
          }}>
          <Animated.View
            style={{
              height: 30,
              width: TAB_WIDTH,
              backgroundColor: 'rgba(255,255,255,0.15)',
              transform: [{ translateX }],
              borderRadius: 8,
            }}
          />
        </View>
        <MiniPlayer />
        <View
          style={{
            flexDirection: 'row',
            width: '100%',
            justifyContent: 'space-between',
            paddingHorizontal: 30,
            // height: 0,
          }}>
          {state.routes.map((route, i) => (
            <Pressable
              onPress={() => {
                translateTab(state.index);
                navigation.navigate(route.name);
              }}
              key={route.key}
              style={{
                width: TAB_WIDTH,
                // backgroundColor:'yellow',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                marginVertical: 10,
                paddingVertical: 5,
                paddingHorizontal: 7,
                borderRadius: 14,
                // backgroundColor:
                //   state.index === i ? '#6135ff85' : 'transparent',
              }}>
              {route.name === 'Home' || route.name === 'Search' ? (
                <Feather
                  name={route.name.toLowerCase()}
                  size={20}
                  color={
                    state.index === i
                      ? themeBasedStyles.primaryText
                      : themeBasedStyles.secondaryText
                  }
                />
              ) : (
                <MaterialIcons
                  name="library-music"
                  size={20}
                  color={
                    state.index === i
                      ? themeBasedStyles.primaryText
                      : themeBasedStyles.secondaryText
                  }
                />
              )}
              <Text
                style={{
                  color:
                    state.index === i
                      ? themeBasedStyles.primaryText
                      : themeBasedStyles.secondaryText,
                  marginLeft: 5,
                  // display: state.index === i ? 'flex' : 'none',
                }}>
                {route.name}
              </Text>
            </Pressable>
          ))}
        </View>
        {/* <BottomTabBar
          {...props}
          style={{ height: 50, backgroundColor: 'yellow' }}
        /> */}
      </View>
    );
  };

  return (
    <HomeTab.Navigator tabBar={props => <CustomTabBar {...props} />}>
      <HomeTab.Screen
        name="Home"
        component={Home}
        options={{ headerShown: false }}
      />
      <HomeTab.Screen
        name="Search"
        component={Search}
        options={{ headerShown: false }}
      />
      <HomeTab.Screen name="Library" component={Library} />
    </HomeTab.Navigator>
  );
};

export default HomeNavigation;
