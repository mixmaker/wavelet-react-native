import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '../screens/Home';
import Library from '../screens/Library';
import Search from '../screens/Search';
import CustomTabBar from '../components/CustomTabBar';

const Tab = createBottomTabNavigator();

const TabNavigation = () => {
  return (
    <Tab.Navigator
      screenOptions={{ headerShown: false }}
      tabBar={props => <CustomTabBar {...props} />}
      id="BottomTab">
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Search" component={Search} />
      <Tab.Screen name="Library" component={Library} />
    </Tab.Navigator>
  );
};
export default TabNavigation;
