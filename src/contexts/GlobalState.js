import { GlobalContext } from './useAppContext';
import React, { useState } from 'react';
import { Appearance } from 'react-native';
import { decode } from 'html-entities';
import TrackPlayer, {
  AppKilledPlaybackBehavior,
  Capability,
} from 'react-native-track-player';
import { trackHelper } from '../api';

export function decodeHtml(string) {
  return decode(string);
}
const GlobalState = ({ children }) => {
  const colorscheme = Appearance.getColorScheme() === 'dark';
  const [isDarkMode, setIsDarkMode] = useState(colorscheme);
  const [themePref, setThemePref] = useState('Auto');
  const [homeData, setHomeData] = useState();
  const [searchData, setSearchData] = useState({});
  const [likedSongList, setLikedSongList] = useState([]);
  const [recentlyPlayed, setRecentlyPlayed] = useState([]);
  const [currentSong, setCurrentSong] = useState();
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [progress, setProgress] = useState({
    buffered: 0,
    duration: 0,
    position: 0,
  });
  const [lyrics, setLyrics] = useState();
  const [isPlaying, setIsPlaying] = useState('paused');
  const [playlist, setPlaylist] = useState([]);
  const [colorPalette, setColorPalette] = useState();
  const [audioQuality, setAudioQuality] = useState(160);
  const [playerAnimationType, setPlayerAnimationType] = useState('Classic');
  //decode html texts

  const setupPlayer = async () => {
    try {
      await TrackPlayer.setupPlayer();
      TrackPlayer.updateOptions({
        appKilledPlaybackBehavior: AppKilledPlaybackBehavior.ContinuePlayback,
        icon: require('../assets/not_icon.webp'),
        capabilities: [
          Capability.Play,
          Capability.Pause,
          Capability.SkipToNext,
          Capability.SkipToPrevious,
          Capability.Stop,
          Capability.SeekTo,
          // Capability.Like, //! crashes in android 10, 13
          // Capability.Dislike
        ],
        compactCapabilities: [
          Capability.Play,
          Capability.Pause,
          Capability.SkipToNext,
          Capability.SkipToPrevious,
        ],
      });
      await TrackPlayer.add(playlist);
    } catch (error) {
      console.log(error);
    }
  };

  const playlistHandler = (songArr, createNew) => {
    const newPlaylist = [];
    for (let i = 0; i < songArr.length; i++) {
      const track = trackHelper(songArr[i]);
      newPlaylist.push(track);
    }
    if (createNew) {
      TrackPlayer.reset();
      setPlaylist(newPlaylist);
    } else setPlaylist([...playlist, ...newPlaylist]);
  };

  return (
    <GlobalContext.Provider
      value={{
        isDarkMode,
        setIsDarkMode,
        homeData,
        setHomeData,
        searchData,
        setSearchData,
        currentSong,
        setCurrentSong,
        decodeHtml,
        isPlaying,
        setIsPlaying,
        playlist,
        setPlaylist,
        currentTrackIndex,
        setCurrentTrackIndex,
        setupPlayer,
        colorPalette,
        setColorPalette,
        lyrics,
        setLyrics,
        audioQuality,
        setAudioQuality,
        playlistHandler,
        progress,
        setProgress,
        playerAnimationType,
        setPlayerAnimationType,
        themePref,
        setThemePref,
        likedSongList,
        setLikedSongList,
        recentlyPlayed,
        setRecentlyPlayed,
      }}>
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalState;
