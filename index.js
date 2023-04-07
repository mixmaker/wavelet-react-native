/**
 * @format
 */
// import 'react-native-gesture-handler';
import { AppRegistry } from 'react-native';
import React from 'react';
import App from './App';
import { name as appName } from './app.json';
import GlobalState from './src/contexts/GlobalState';
import TrackPlayer from 'react-native-track-player';
import Theme from './src/contexts/Theme';

const AppRoot = () => (
  <GlobalState>
    <Theme>
      <App />
    </Theme>
  </GlobalState>
);
AppRegistry.registerComponent(appName, () => AppRoot);
TrackPlayer.registerPlaybackService(() => require('./service'));
