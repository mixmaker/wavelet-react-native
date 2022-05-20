import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import CustomTabBar from '../components/CustomTabBar';
import StackNavigation from './StackNavigation';
import Search from '../screens/Search';
import Library from '../screens/Library';
import About from '../screens/About';
import Settings from '../screens/Settings';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import CustomDrawer from '../components/CustomDrawer';

const Drawer = createDrawerNavigator();

const AppDrawer = () => {
  return (
    <Drawer.Navigator
      id="LeftDrawer"
      drawerContent={props => <CustomDrawer {...props} />}
      screenOptions={{
        sceneContainerStyle: { backgroundColor: 'transparent' },
        headerShown: false,
        drawerType: 'slide',
      }}>
      <Drawer.Screen name="HomeStack" component={TabNavigation} />
      <Drawer.Screen name="About" component={About} />
      <Drawer.Screen name="Settings" component={Settings} />
    </Drawer.Navigator>
  );
};

const Tab = createBottomTabNavigator();

const TabNavigation = () => {
  return (
    <Tab.Navigator
      screenOptions={{ headerShown: false }}
      tabBar={props => <CustomTabBar {...props} />}
      id="BottomTab">
      <Tab.Screen name="Home" component={StackNavigation} />
      <Tab.Screen name="Search" component={Search} />
      <Tab.Screen name="Library" component={Library} />
    </Tab.Navigator>
  );
};

export default AppDrawer;
