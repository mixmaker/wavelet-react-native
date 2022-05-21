import { View, Text, Pressable, Image } from 'react-native';
import React from 'react';
import { DrawerContentScrollView } from '@react-navigation/drawer';
import useThemeProvider from '../contexts/useThemeProvider';
import Feather from 'react-native-vector-icons/Feather';
import {version} from '../../package.json'

const CustomDrawer = props => {
  const { state, navigation } = props;
  const { colors, constants } = useThemeProvider();

  return (
    <View
      style={{
        flex: 1,
        position: 'relative',
        backgroundColor: colors.drawer,
        paddingHorizontal: 10,
        paddingTop: constants.statusbarHeight + 30,
      }}>
      <Image
        source={{
          uri: 'https://images.pexels.com/photos/131683/pexels-photo-131683.jpeg?auto=compress&cs=tinysrgb&w=280&h=165&dpr=2',
        }}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: 175,
          resizeMode: 'cover',
        }}
      />
      <View
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: 175,
          opacity: 0.5,
          backgroundColor: colors.primarybg,
        }}
      />
      <Text style={{ fontSize: 42, marginLeft: 12, color: colors.primaryText }}>
        Wavelet
      </Text>
      <Text style={{ fontSize: 14, marginLeft: 15, color: colors.secondaryText }}>
        {version}
      </Text>
      <DrawerContentScrollView
        contentContainerStyle={{
          marginTop: 10,
          justifyContent: 'space-between',
        }}>
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
                  state.index === i ? colors.slider : 'transparent',
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
          marginBottom: 30,
          textAlign: 'center',
          color: colors.secondaryText,
          fontSize: 15,
          marginHorizontal: 15,
        }}>
        Made with ♥ by Shoumik Kumbhakar
      </Text>
    </View>
  );
};

export default CustomDrawer;
