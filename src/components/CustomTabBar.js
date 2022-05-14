import React, { useEffect } from 'react';
import { View, Text, Pressable } from 'react-native';
import MiniPlayer from './MiniPlayer';
import Feather from 'react-native-vector-icons/Feather';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import useThemeProvider from '../contexts/useThemeProvider';

const CustomTabBar = props => {
  const { constants, colors } = useThemeProvider();
  const { navigation, descriptors, state } = props;
  const focusedOptions = descriptors[state.routes[state.index].key].options;
  const PADDING = 30;
  const width = constants.fullWidth;
  const TAB_BAR_WIDTH = width - 2 * PADDING;
  const TAB_WIDTH = TAB_BAR_WIDTH / 3;
  const translateX = useSharedValue(0);
  const rStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));
  useEffect(() => {
    translateX.value = withSpring(TAB_WIDTH * state.index);
  }, [state.index]);

  return (
    <View
      style={[
        { backgroundColor: colors.secondarybg },
        focusedOptions.tabBarStyle,
      ]}>
      <View
        style={{
          position: 'absolute',
          // left: 0,
          bottom: 11,
          marginHorizontal: PADDING,
        }}>
        <Animated.View
          style={[
            {
              height: 30,
              width: TAB_WIDTH,
              // backgroundColor: 'rgba(255,255,255,0.15)',
              backgroundColor: colors.slider,
              borderRadius: 8,
            },
            rStyle,
          ]}
        />
      </View>
      <MiniPlayer />
      <View
        style={{
          flexDirection: 'row',
          width: '100%',
          justifyContent: 'space-between',
          paddingHorizontal: 30,
          // height: 0,
        }}>
        {state.routes.map((route, i) => (
          <Pressable
            onPress={() => {
              navigation.navigate(route.name);
            }}
            key={route.key}
            style={{
              width: TAB_WIDTH,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              marginVertical: 10,
              paddingVertical: 5,
              paddingHorizontal: 7,
              borderRadius: 14,
              // backgroundColor:
              //   state.index === i ? '#6135ff85' : 'transparent',
            }}>
            {route.name === 'Home' || route.name === 'Search' ? (
              <Feather
                name={route.name.toLowerCase()}
                size={20}
                color={
                  state.index === i ? colors.primaryText : colors.secondaryText
                }
              />
            ) : (
              <MaterialIcons
                name="library-music"
                size={20}
                color={
                  state.index === i ? colors.primaryText : colors.secondaryText
                }
              />
            )}
            <Text
              style={{
                color:
                  state.index === i ? colors.primaryText : colors.secondaryText,
                marginLeft: 5,
                // display: state.index === i ? 'flex' : 'none',
              }}>
              {route.name}
            </Text>
          </Pressable>
        ))}
      </View>
    </View>
  );
};
export default CustomTabBar;
