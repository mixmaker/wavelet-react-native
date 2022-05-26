import { GlobalContext } from './useAppContext';
import React, { useState } from 'react';
import { Appearance } from 'react-native';
import { decode } from 'html-entities';
import TrackPlayer, { Capability } from 'react-native-track-player';
import { trackHelper } from '../api';

export function decodeHtml(string) {
  return decode(string);
}
const GlobalState = ({ children }) => {
  const colorscheme = Appearance.getColorScheme() === 'dark';
  const [isDarkMode, setIsDarkMode] = useState(colorscheme);
  const [homeData, setHomeData] = useState();
  const [searchData, setSearchData] = useState();
  const [albumData, setAlbumData] = useState();
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
    await TrackPlayer.setupPlayer();
    TrackPlayer.updateOptions({
      stopWithApp: false,
      icon: require('../assets/not_icon.webp'),
      capabilities: [
        Capability.Play,
        Capability.Pause,
        Capability.SkipToNext,
        Capability.SkipToPrevious,
        Capability.Stop,
        Capability.SeekTo,
        // Capability.Like, //! crashes in android 10
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
  };

  const playlistHandler = (songArr, createNew) => {
    const newPlaylist = [];
    for (let i = 0; i < songArr.length; i++) {
      const track = trackHelper(songArr[i]);
      newPlaylist.push(track);
    }
    if (createNew) {
      TrackPlayer.reset();
      console.log('first');
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
        albumData,
        setAlbumData,
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
      }}>
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalState;
