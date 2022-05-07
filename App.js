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
import { SafeAreaProvider } from 'react-native-safe-area-context';
import axios from 'axios';
import { fetchLyricsfromId, fetchSongDataFromId } from './src/api';
import ImageColors from 'react-native-image-colors';
import RNBootSplash from 'react-native-bootsplash';
import { LogBox } from 'react-native';
import AppDrawer from './src/navigation/AppNavigation';

LogBox.ignoreLogs([
  "[react-native-gesture-handler] Seems like you're using an old API with gesture components, check out new Gestures system!",
]);
const App = () => {
  const {
    playlist,
    setupPlayer,
    isDarkMode,
    setIsDarkMode,
    currentSongId,
    setCurrentSong,
    setPlaylist,
    setIsPlaying,
    setColorPalette,
    setLyrics,
  } = useAppContext();
  const navigationRef = useRef(null);
  Appearance.addChangeListener(({ colorScheme }) => {
    colorScheme === 'dark' ? setIsDarkMode(true) : setIsDarkMode(false);
  });

  useTrackPlayerEvents([Event.PlaybackState], async event => {
    if (event.type === Event.PlaybackState) {
      if (event.state === State.Playing) {
        setIsPlaying('playing');
      }
      if (event.state === State.Buffering || event.state === State.Connecting) {
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
  });
  const cancelTokenSource = axios.CancelToken.source();
  const playSongHandler = async () => {
    navigationRef.current?.navigate('Player');
    const newTrack = await fetchSongDataFromId(
      currentSongId,
      cancelTokenSource,
    );
    setPlaylist([newTrack]);
    setCurrentSong(newTrack);
    const lyr = await fetchLyricsfromId(currentSongId, cancelTokenSource);
    setLyrics(lyr);
    getColorPalette(newTrack.artwork);
    TrackPlayer.play();
  };

  const getColorPalette = async url => {
    const result = await ImageColors.getColors(url);
    setColorPalette(result);
  };

  useEffect(() => {
    // navBarColor();
    setupPlayer();
    StatusBar.setTranslucent(true);
  }, []);

  useEffect(() => {
    if (currentSongId) playSongHandler();

    return () => TrackPlayer.destroy();
  }, [currentSongId]);

  useEffect(() => {
    if (playlist.length < 1) {
      // setCurrentSong()
    }
    TrackPlayer.add([...playlist]);
  }, [playlist]);

  return (
    <SafeAreaProvider>
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
    </SafeAreaProvider>
  );
};

export default App;
