import { View, Pressable } from 'react-native';
import React, { useEffect, useMemo, useRef } from 'react';
import useThemeProvider from '../contexts/useThemeProvider';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MiniPlayer from './MiniPlayer';

const CustomTabBar = props => {
  const { constants, colors } = useThemeProvider();
  const { navigation, descriptors, state } = props;
  // const focusedOptions = descriptors[state.routes[state.index].key].options;
  // const tabWidth = useMemo(() => constants.fullWidth / 4, []);
  return (
    <View
      style={[
        {
          position: 'absolute',
          bottom: 0,
          right: 0,
          left: 0,
          backgroundColor: 'transparent',
          zIndex: 10000,
          elevation: 0,
        },
        // focusedOptions.tabBarStyle,
      ]}>
        <MiniPlayer />
      <View
        style={{
          borderTopLeftRadius: 10,
          borderTopRightRadius: 10,
          paddingBottom: constants.navbarHeight + 10,
          flexDirection: 'row',
          width: '100%',
          justifyContent: 'space-between',
          paddingHorizontal: 30,
          backgroundColor: colors.secondarybg,
          // backgroundColor: 'red',
          // height: 0,
        }}>
        {state.routes.map((route, i) => {
          let active = route.key === state.routes[state.index].key;
          const { options } = descriptors[route.key];
          return (
            <TabComponent
              key={route.key}
              active={active}
              options={options}
              // onLayout={e => handleLayout(e, index)}
              onPress={() => navigation.navigate(route.name)}
            />
          );
        })}
      </View>
    </View>
  );
};

const TabComponent = ({ active, options, onLayout, onPress }) => {
  const ref = useRef(null);

  // useEffect(() => {
  //   if (active && ref?.current) {
  //     // @ts-ignore
  //     ref.current.play();
  //   }
  // }, [active]);
  return (
    <Pressable
      onPress={onPress}
      onLayout={onLayout}
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        // marginBottom: 8,
        marginVertical: 10,
        paddingVertical: 7,
        paddingHorizontal: 10,
        // borderRadius: 14,
        // backgroundColor: 'yellow',
        // backgroundColor:
        //   state.index === i ? '#5c547885' : 'transparent',
      }}>
      {options.tabBarIcon({ active })}
      {/* {options.tabBarIcon ? options.tabBarIcon({ ref }) : <Text>?</Text>} */}
    </Pressable>
  );
};

{
  /* <Ionicons
name={
  route.name === 'Home'
  ? focused
  ? 'ios-home'
      : 'ios-home-outline'
      : route.name === 'Discover'
      ? focused
      ? 'ios-compass'
      : 'ios-compass-outline'
      : route.name === 'Library'
      ? focused
      ? 'ios-musical-note'
      : 'ios-musical-note-outline'
      : route.name === 'Settings' &&
      (focused ? 'ios-settings' : 'ios-settings-outline')
    }
    size={23}
    color={focused ? colors.tabBar : colors.secondaryText}
  /> */
}
export default CustomTabBar;
