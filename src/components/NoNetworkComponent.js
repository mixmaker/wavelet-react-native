import { View } from 'react-native';
import React from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import useThemeProvider from '../contexts/useThemeProvider';
import CustomText from '../fragments/CustomText';

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
      <CustomText semiBold
        style={{
          color: colors.primaryText,
          fontSize: 21,
          textAlign: 'center',
        }}>
        No network available
      </CustomText>
    </View>
  );
};

export default NoNetworkComponent;
