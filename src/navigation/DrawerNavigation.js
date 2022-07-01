import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import StackNavigation from './StackNavigation';
import About from '../screens/About';
import Settings from '../screens/Settings';
import CustomDrawer from '../components/CustomDrawer';

const Drawer = createDrawerNavigator();

const DrawerNavigation = () => {
  return (
    <Drawer.Navigator
      id="LeftDrawer"
      drawerContent={props => <CustomDrawer {...props} />}
      screenOptions={{
        sceneContainerStyle: { backgroundColor: 'transparent' },
        headerShown: false,
        drawerType: 'slide',
      }}>
      <Drawer.Screen name="HomeStack" component={StackNavigation} />
      <Drawer.Screen name="About" component={About} />
      <Drawer.Screen name="Settings" component={Settings} />
    </Drawer.Navigator>
  );
};



export default DrawerNavigation;
