import { Text } from 'react-native';
import React from 'react';

const CustomText = ({ bold, semiBold, style, children, ...newProps }) => {
  let font = { fontFamily: 'Nunito-Regular' };
  if (bold) {
    font = { fontFamily: 'Nunito-Bold' };
  }
  if (semiBold) {
    font = { fontFamily: 'Nunito-SemiBold' };
  }
  return (
    <Text {...newProps} style={[style, font]}>
      {children}
    </Text>
  );
};

export default CustomText;
