import React from 'react';
import { Dimensions, StatusBar, Platform } from 'react-native';
import useAppContext from './useAppContext';
import { ThemeProvider } from './useThemeProvider';

const Theme = ({ children }) => {
  const { isDarkMode } = useAppContext();

  const constants = {
    fullWidth: Dimensions.get('window').width,
    fullHeight: Dimensions.get('window').height,
    statusbarHeight: StatusBar.currentHeight,
    navbarHeight:
      Dimensions.get('screen').height -
      Dimensions.get('window').height -
      StatusBar.currentHeight,
  };

  const androidSafeArea = {
    flex: 1,
    backgroundColor: 'white',
    paddingTop: Platform.OS === 'android' ? constants.statusbarHeight : 0,
  };
  const colors = isDarkMode
    ? {
        primarybg: '#0f1010',
        secondarybg: '#1b1b1b',
        primaryText: '#f0f0f0',
        secondaryText: '#8b8b8b',
        icon: '#e0e0e0',
        bgGradient: '#9554e971',
        tabBar: '#30FF6A',
      }
    : {
        primarybg: '#fff',
        secondarybg: '#f2f2f2',
        primaryText: '#000',
        secondaryText: '#696969',
        icon: '#000',
        bgGradient: '#9554e971',
        tabBar: '#37e067',
      };

  return (
    <ThemeProvider.Provider value={{ colors, constants, androidSafeArea }}>
      {children}
    </ThemeProvider.Provider>
  );
};

export default Theme;
