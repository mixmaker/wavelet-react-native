import { Appearance } from 'react-native';
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
} from 'react-native-track-player';
import useAppContext from './src/contexts/useAppContext';
import ImageColors from 'react-native-image-colors';
import { LogBox } from 'react-native';
import AppDrawer from './src/navigation/AppNavigation';
import { fetchLyricsfromId } from './src/api';
import useThemeProvider from './src/contexts/useThemeProvider';
import AnimatedSplash from 'react-native-animated-splash-screen';
import { SystemBars } from 'react-native-bars';

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
  } = useAppContext();
  const { colors, constants } = useThemeProvider();
  const [isloaded, setIsloaded] = useState(false);
  const navigationRef = useRef(null);
  Appearance.addChangeListener(({ colorScheme }) => {
    colorScheme === 'dark' ? setIsDarkMode(true) : setIsDarkMode(false);
  });

  useTrackPlayerEvents([Event.PlaybackTrackChanged], async event => {
    if (event.type === Event.PlaybackTrackChanged) {
      setCurrentTrackIndex(event.track + 1 || 0); // skip back doesn't decrease track index
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
    if (isPlaying === 'paused') {
      TrackPlayer.play();
    }
  }, [playlist]);
  return (
    <AnimatedSplash
      showStatusBar={false}
      translucent={true}
      isLoaded={isloaded}
      logoImage={require('./src/assets/logo.png')}
      backgroundColor={colors.primarybg}
      logoHeight={150}
      logoWidth={150}>
      <NavigationContainer
        ref={navigationRef}
        onReady={() =>
          setTimeout(() => {
            setIsloaded(true);
          }, 500)
        }
        theme={isDarkMode ? DarkTheme : DefaultTheme}>
        <SystemBars
          animated={true}
          barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        />
        <AppDrawer />
      </NavigationContainer>
    </AnimatedSplash>
  );
};

export default App;
