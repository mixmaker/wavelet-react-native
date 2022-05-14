import { StatusBar, Appearance } from 'react-native';
import React, { useEffect, useRef } from 'react';
import {
  NavigationContainer,
  DarkTheme,
  DefaultTheme,
} from '@react-navigation/native';
import TrackPlayer, {
  Event,
  State,
  useTrackPlayerEvents,
} from 'react-native-track-player';
import useAppContext from './src/contexts/useAppContext';
import ImageColors from 'react-native-image-colors';
import RNBootSplash from 'react-native-bootsplash';
import { LogBox } from 'react-native';
import AppDrawer from './src/navigation/AppNavigation';
import { fetchLyricsfromId } from './src/api';
import changeNavigationBarColor from 'react-native-navigation-bar-color';
import useThemeProvider from './src/contexts/useThemeProvider';

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
  const { colors } = useThemeProvider();
  const navigationRef = useRef(null);
  Appearance.addChangeListener(({ colorScheme }) => {
    colorScheme === 'dark' ? setIsDarkMode(true) : setIsDarkMode(false);
  });

  useTrackPlayerEvents(
    [Event.PlaybackState, Event.PlaybackTrackChanged],
    async event => {
      if (event.type === Event.PlaybackState) {
        if (event.state === State.Playing) {
          setIsPlaying('playing');
        }
        if (
          event.state === State.Buffering ||
          event.state === State.Connecting
        ) {
          setIsPlaying('buffering');
        }
        if (
          event.state === State.Paused ||
          event.state === State.Ready ||
          event.state === State.None ||
          event.state === State.Stopped
        ) {
          setIsPlaying('paused');
        }
      }
      if (event.type === Event.PlaybackTrackChanged) {
        setCurrentTrackIndex(event.track + 1 || 0);
      }
    },
  );

  const fetchLyrics = async () => {
    const lyr = await fetchLyricsfromId(playlist[currentTrackIndex]?.id);
    setLyrics(lyr);
  };

  const getColorPalette = async url => {
    const result = await ImageColors.getColors(url);
    setColorPalette(result);
  };

  useEffect(() => {
    changeNavigationBarColor('transparent')
    // changeNavigationBarColor('transparent')
    setupPlayer();
    StatusBar.setTranslucent(true);
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
    <NavigationContainer
      ref={navigationRef}
      theme={isDarkMode ? DarkTheme : DefaultTheme}
      onReady={() => RNBootSplash.hide({ fade: true })}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'} // !for some strange reason this didn't work on my physical device running api32
        backgroundColor="transparent"
      />
      <AppDrawer />
    </NavigationContainer>
  );
};

export default App;
