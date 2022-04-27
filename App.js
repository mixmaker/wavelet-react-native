import {SafeAreaView, StatusBar, Appearance} from 'react-native';
import React, {useEffect} from 'react';
import {
  NavigationContainer,
  DarkTheme,
  DefaultTheme,
} from '@react-navigation/native';
import Home from './src/screens/Home';
import AppNavigation from './src/navigation/AppNavigation';
import TrackPlayer, {
  Event,
  State,
  useTrackPlayerEvents,
} from 'react-native-track-player';
import useAppContext from './src/contexts/useAppContext';
// import changeNavigationBarColor from 'react-native-navigation-bar-color';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import axios from 'axios';

const App = () => {
  const {
    playlist,
    setupPlayer,
    isDarkMode,
    setIsDarkMode,
    fetchSongDataFromId,
    currentSongId,
    setCurrentSong,
    setPlaylist,
    setIsPlaying,
  } = useAppContext();
  // const navBarColor = async () => {
  //   try {
  //     const response = await changeNavigationBarColor('#fff');
  //     console.log(response); // {success: true}
  //   } catch (e) {
  //     console.log(e); // {success: false}
  //   }
  // };
  Appearance.addChangeListener(({colorScheme}) => {
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

  const playSongHandler = async () => {
    const newTrack = await fetchSongDataFromId();
    setPlaylist([newTrack]);
    setCurrentSong(newTrack);
    TrackPlayer.play();
  };

  useEffect(() => {
    // navBarColor();
    setupPlayer();
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
      <NavigationContainer theme={isDarkMode ? DarkTheme : DefaultTheme}>
        <StatusBar
          barStyle={isDarkMode ? 'light-content' : 'dark-content'}
          backgroundColor={isDarkMode ? '#111' : '#fff'}
        />
        <AppNavigation />
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

export default App;
