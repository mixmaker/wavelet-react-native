import { View, Text } from 'react-native';
import React from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import useThemeProvider from '../contexts/useThemeProvider';

const NoNetworkComponent = () => {
  const { constants, colors } = useThemeProvider();

  return (
    <View
      style={{
        height: constants.fullHeight,
        alignItems: 'center',
        justifyContent: 'center',
        // backgroundColor: 'red',
      }}>
      <MaterialCommunityIcons
        name="wifi-strength-off-outline"
        size={40}
        color={colors.secondaryText}
      />
      <Text
        style={{
          color: colors.primaryText,
          fontSize: 21,
          textAlign: 'center',
        }}>
        No network available
      </Text>
    </View>
  );
};

export default NoNetworkComponent;
