import { GlobalContext } from './useAppContext';
import React, { useState } from 'react';
import { Appearance } from 'react-native';
import { decode } from 'html-entities';
import TrackPlayer, { Capability } from 'react-native-track-player';

const GlobalState = ({ children }) => {
  const colorscheme = Appearance.getColorScheme() === 'dark' ? true : false;
  const [isDarkMode, setIsDarkMode] = useState(colorscheme);
  const [homeData, setHomeData] = useState();
  const [searchData, setSearchData] = useState();
  const [albumData, setAlbumData] = useState();
  const [currentSong, setCurrentSong] = useState();
  const [currentSongId, setCurrentSongId] = useState();
  const [isPlaying, setIsPlaying] = useState(false);
  const [playlist, setPlaylist] = useState([]);
  const [colorPalette, setColorPalette] = useState();

  //decode html texts
  function decodeHtml(string) {
    return decode(string);
  }

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
        currentSongId,
        setCurrentSongId,
        setupPlayer,
        colorPalette,
        setColorPalette,
      }}>
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalState;
