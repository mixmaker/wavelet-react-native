import {
  Appearance,
  StyleSheet,
  View,
  Animated,
  Dimensions,
} from 'react-native';
import React, { useState, useEffect, useRef } from 'react';
import {
  NavigationContainer,
  DarkTheme,
  DefaultTheme,
} from '@react-navigation/native';
import TrackPlayer, {
  Event,
  State,
  useTrackPlayerEvents,
  usePlaybackState,
  useProgress,
} from 'react-native-track-player';
import useAppContext from './src/contexts/useAppContext';
import ImageColors from 'react-native-image-colors';
import { LogBox } from 'react-native';
import DrawerNavigation from './src/navigation/DrawerNavigation';
import { fetchLyricsfromId } from './src/api';
import useThemeProvider from './src/contexts/useThemeProvider';
import { SystemBars } from 'react-native-bars';
import * as BootSplash from 'react-native-bootsplash';

LogBox.ignoreLogs([
  "[react-native-gesture-handler] Seems like you're using an old API with gesture components, check out new Gestures system!",
  "ViewPropTypes will be removed from React Native. Migrate to ViewPropTypes exported from 'deprecated-react-native-prop-types'.",
]);
const App = () => {
  const {
    playlist,
    setupPlayer,
    isDarkMode,
    setIsDarkMode,
    currentTrackIndex,
    setCurrentTrackIndex,
    setPlaylist,
    isPlaying,
    setIsPlaying,
    setColorPalette,
    setLyrics,
    setProgress,
  } = useAppContext();
  const { colors, constants } = useThemeProvider();
  const navigationRef = useRef(null);
  const progress = useProgress();
  useEffect(() => {
    setProgress(progress);
  }, [progress]);

  // Appearance.addChangeListener(({ colorScheme }) => {
  //   colorScheme === 'dark' ? setIsDarkMode(true) : setIsDarkMode(false);
  // });

  useTrackPlayerEvents([Event.PlaybackTrackChanged], async event => {
    if (event.type === Event.PlaybackTrackChanged) {
      TrackPlayer.getCurrentTrack().then(index => setCurrentTrackIndex(index));
    }
  });

  const playbackState = usePlaybackState();
  useEffect(() => {
    if (
      playbackState === State.Buffering ||
      playbackState === State.Connecting
    ) {
      setIsPlaying('buffering');
    } else if (playbackState === State.Playing) {
      setIsPlaying('playing');
    } else if (
      playbackState === State.Paused ||
      playbackState === State.Ready ||
      playbackState === State.None ||
      playbackState === State.Stopped
    ) {
      setIsPlaying('paused');
    }
  }, [playbackState]);

  const fetchLyrics = async () => {
    const lyr = await fetchLyricsfromId(playlist[currentTrackIndex]?.id);
    setLyrics(lyr);
  };

  const getColorPalette = async url => {
    const result = await ImageColors.getColors(url);
    setColorPalette(result);
  };

  useEffect(() => {
    setupPlayer();
  }, []);
  useEffect(() => {
    fetchLyrics();
  }, [currentTrackIndex]);

  useEffect(() => {
    playlist.length > 0 &&
      getColorPalette(playlist[currentTrackIndex]?.artwork);
  }, [currentTrackIndex, playlist]);

  useEffect(() => {
    TrackPlayer.add([...playlist]);
    if (isPlaying === 'paused' && playlist.length > 0) {
      TrackPlayer.play();
    }
  }, [playlist]);

  const bootSplashLogo = require('./src/assets/logo.png');
  const [bootSplashIsVisible, setBootSplashIsVisible] = React.useState(true);
  const [bootSplashLogoIsLoaded, setBootSplashLogoIsLoaded] =
    React.useState(false);
  const opacity = React.useRef(new Animated.Value(1));
  const translateY = React.useRef(new Animated.Value(0));

  const init = async () => {
    try {
      await BootSplash.hide();

      Animated.stagger(150, [
        Animated.spring(translateY.current, {
          useNativeDriver: true,
          toValue: -50,
        }),
        Animated.spring(translateY.current, {
          useNativeDriver: true,
          toValue: Dimensions.get('window').height,
        }),
      ]).start();

      Animated.timing(opacity.current, {
        useNativeDriver: true,
        toValue: 0,
        duration: 150,
        delay: 350,
      }).start(() => {
        setBootSplashIsVisible(false);
      });
    } catch (error) {
      console.log(error);
      setBootSplashIsVisible(false);
    }
  };

  React.useEffect(() => {
    bootSplashLogoIsLoaded && init();
  }, [bootSplashLogoIsLoaded]);
  const CustomTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: colors.primarybg,
    },
  };
  const CustomDarkTheme = {
    ...DarkTheme,
    colors: {
      ...DarkTheme.colors,
      background: colors.primarybg,
    },
  };
  return (
    <View style={{ flex: 1 }}>
      <NavigationContainer
        ref={navigationRef}
        theme={isDarkMode ? CustomDarkTheme : CustomTheme}>
        <SystemBars
          animated={true}
          barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        />
        <DrawerNavigation />
      </NavigationContainer>
      {bootSplashIsVisible && (
        <Animated.View
          style={[
            StyleSheet.absoluteFill,
            {
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: colors.primarybg,
            },
            { opacity: opacity.current },
          ]}>
          <Animated.Image
            source={bootSplashLogo}
            fadeDuration={0}
            resizeMode="contain"
            onLoadEnd={() => setBootSplashLogoIsLoaded(true)}
            style={[
              styles.logo,
              { transform: [{ translateY: translateY.current }] },
            ]}
          />
        </Animated.View>
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  text: {
    fontSize: 24,
    fontWeight: '700',
    margin: 20,
    lineHeight: 30,
    color: '#333',
    textAlign: 'center',
  },
  bootsplash: {},
  logo: {
    height: 120,
    width: 120,
  },
});
export default App;
