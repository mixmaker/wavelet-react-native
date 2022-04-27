import React from 'react';
import {Dimensions, StatusBar, Platform} from 'react-native';
import useAppContext from './useAppContext';
import {ThemeProvider} from './useThemeProvider';

const Theme = ({children}) => {
  const {isDarkMode} = useAppContext();

  const constants = {
    fullWidth: Dimensions.get('window').width,
    fullHeight: Dimensions.get('window').height,
    statusbarHeight: StatusBar.currentHeight,
  };

  const androidSafeArea = {
    flex: 1,
    backgroundColor: 'white',
    paddingTop: Platform.OS === 'android' ? constants.statusbarHeight : 0,
  };
  const themeBasedStyles = isDarkMode
    ? {
        primarybg: '#000',
        secondarybg: '#1c1c1c',
        primaryText: '#fff',
        secondaryText: '#8b8b8b',
        icon: '#e0e0e0',
      }
    : {
        primarybg: '#fff',
        secondarybg: '#f2f2f2',
        primaryText: '#000',
        secondaryText: '#858585',
        icon: '#000',
      };
      
  return (
    <ThemeProvider.Provider
      value={{themeBasedStyles, constants, androidSafeArea}}>
      {children}
    </ThemeProvider.Provider>
  );
};

export default Theme;
