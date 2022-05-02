import { StatusBar, Appearance } from 'react-native';
import React, { useEffect, useRef } from 'react';
import {
  NavigationContainer,
  DarkTheme,
  DefaultTheme,
} from '@react-navigation/native';
import AppNavigation from './src/navigation/AppNavigation';
import TrackPlayer, {
  Event,
  State,
  useTrackPlayerEvents,
} from 'react-native-track-player';
import useAppContext from './src/contexts/useAppContext';
// import changeNavigationBarColor from 'react-native-navigation-bar-color';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import axios from 'axios';
import { fetchSongDataFromId } from './src/api';
import ImageColors from 'react-native-image-colors';
import RNBootSplash from 'react-native-bootsplash';
import { LogBox } from 'react-native';

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
  } = useAppContext();
  const navigationRef = useRef(null);
  // const navBarColor = async () => {
  //   try {
  //     const response = await changeNavigationBarColor('#fff');
  //     console.log(response); // {success: true}
  //   } catch (e) {
  //     console.log(e); // {success: false}
  //   }
  // };
  Appearance.addChangeListener(({ colorScheme }) => {
    colorScheme === 'dark' ? setIsDarkMode(true) : setIsDarkMode(false);
  });

  useTrackPlayerEvents([Event.PlaybackState], async event => {
    if (event.type === Event.PlaybackState) {
      if (event.state === State.Playing || event.state === State.Buffering) {
        setIsPlaying(true);
      }
      if (
        event.state === State.Paused ||
        event.state === State.Connecting ||
        event.state === State.Ready ||
        event.state === State.None ||
        event.state === State.Stopped
      ) {
        setIsPlaying(false);
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
    TrackPlayer.add([...playlist]);
  }, [playlist]);

  return (
    <SafeAreaProvider>
      <NavigationContainer
        ref={navigationRef}
        theme={isDarkMode ? DarkTheme : DefaultTheme}
        onReady={() => RNBootSplash.hide({ fade: true })}>
        <StatusBar
          barStyle={isDarkMode ? 'light-content' : 'dark-content'}
          backgroundColor="transparent"
        />
        <AppNavigation />
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

export default App;
