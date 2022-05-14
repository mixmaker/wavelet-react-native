import { View, Text, Pressable } from 'react-native';
import React from 'react';
import { DrawerContentScrollView } from '@react-navigation/drawer';
import useThemeProvider from '../contexts/useThemeProvider';
import Feather from 'react-native-vector-icons/Feather';
const CustomDrawer = props => {
  const { state, navigation } = props;
  const { colors, constants } = useThemeProvider();

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: colors.primarybg,
        paddingHorizontal: 10,
        paddingTop: constants.statusbarHeight + 30,
      }}>
      <Text
        style={{ fontSize: 42, marginLeft: 12, color: colors.secondaryText }}>
        Wavelet
      </Text>
      <DrawerContentScrollView
        contentContainerStyle={{ justifyContent: 'space-between' }}>
        <View style={{}}>
          {state.routes?.map((route, i) => (
            <Pressable
              style={{
                flexDirection: 'row',
                paddingLeft: 10,
                paddingVertical: 10,
                marginVertical: 5,
                borderRadius: 8,
                backgroundColor:
                  state.index === i ? colors.secondarybg : colors.primarybg,
              }}
              onPress={() => navigation.navigate(route.name)}
              key={route.key}>
              <Feather
                name={
                  route.name === 'HomeStack'
                    ? 'home'
                    : route.name === 'About'
                    ? 'info'
                    : 'settings'
                }
                size={20}
                color={
                  state.index === i ? colors.primaryText : colors.secondaryText
                }
              />
              <Text
                style={{
                  marginLeft: 8,
                  color:
                    state.index === i
                      ? colors.primaryText
                      : colors.secondaryText,
                  fontSize: 16,
                }}>
                {route.name === 'HomeStack' ? 'Home' : route.name}
              </Text>
            </Pressable>
          ))}
        </View>
      </DrawerContentScrollView>
      <Text
        style={{
          marginBottom: 20,
          textAlign: 'center',
          color: colors.secondaryText,
          fontSize: 15,
        }}>
        Made with ♥ by Shoumik Kumbhakar
      </Text>
    </View>
  );
};

export default CustomDrawer;
