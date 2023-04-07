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
import { fetchLyricsfromId } from './src/api';
import useThemeProvider from './src/contexts/useThemeProvider';
import { SystemBars } from 'react-native-bars';
import * as BootSplash from 'react-native-bootsplash';
import StackNavigation from './src/navigation/StackNavigation';
import CodePush from 'react-native-code-push';
import CodePushManager from './src/components/CodePushManager';
import { SheetProvider } from 'react-native-actions-sheet';
import './sheets';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { observeLikedSongs } from './src/data/helpers';
import withObservables from '@nozbe/with-observables';

const App = ({ likedSongs }) => {
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
    likedSongList,
    setLikedSongList,
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

  //?open player when clicking notif
  // useEffect(() => {
  //   const handleUrl = data => {
  //     if (data.url === 'trackplayer://notification.click') {
  //       navigationRef.current.navigate('Player');
  //     }
  //   };
  //   Linking.getInitialURL().then(url => handleUrl({ url: url }));
  //   Linking.addEventListener('url', handleUrl);

  //   return () => {
  //     Linking.removeEventListener('url', handleUrl);
  //   };
  // }, []);

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
    var data = [];
    likedSongs?.forEach(s => {
      data = [...data, { id: s.id, songId: s.song_id }].filter(item => item);
    });
    setLikedSongList(data);
  }, [likedSongs]);

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
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View style={{ flex: 1 }}>
        <NavigationContainer
          ref={navigationRef}
          theme={isDarkMode ? CustomDarkTheme : CustomTheme}>
          <SheetProvider>
            <SystemBars
              animated={true}
              barStyle={isDarkMode ? 'light-content' : 'dark-content'}
            />
            <StackNavigation />
          </SheetProvider>
        </NavigationContainer>
        {/* <CodePushManager /> */}
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
    </GestureHandlerRootView>
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

const EnhanceWithLS = withObservables(['likedSongs'], () => ({
  likedSongs: observeLikedSongs(),
}));
export default EnhanceWithLS(App);
