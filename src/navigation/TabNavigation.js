import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '../screens/Home';
import Library from '../screens/Library';
import CustomTabBar from '../components/CustomTabbar';
import Settings from '../screens/Settings';
import Discover from '../screens/Discover';
import Ionicons from 'react-native-vector-icons/Ionicons';
import useThemeProvider from '../contexts/useThemeProvider';

const Tab = createBottomTabNavigator();

const TabNavigation = () => {
  const { colors } = useThemeProvider();
  return (
    <Tab.Navigator
      initialRouteName="Home"
      backBehavior="initialRoute"
      tabBar={props => <CustomTabBar {...props} />}
      screenOptions={{ headerShown: false }}
      id="BottomTab">
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({ active }) => (
            <Ionicons
              name={active ? 'ios-home' : 'ios-home-outline'}
              size={23}
              color={active ? colors.tabBar : colors.secondaryText}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Discover"
        component={Discover}
        options={{
          tabBarIcon: ({ active }) => (
            <Ionicons
              name={active ? 'ios-compass' : 'ios-compass-outline'}
              size={23}
              color={active ? colors.tabBar : colors.secondaryText}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Library"
        component={Library}
        options={{
          tabBarIcon: ({ active }) => (
            <Ionicons
              name={active ? 'ios-musical-note' : 'ios-musical-note-outline'}
              size={23}
              color={active ? colors.tabBar : colors.secondaryText}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Settings"
        component={Settings}
        options={{
          tabBarIcon: ({ active }) => (
            <Ionicons
              name={active ? 'ios-settings' : 'ios-settings-outline'}
              size={23}
              color={active ? colors.tabBar : colors.secondaryText}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};
export default TabNavigation;
