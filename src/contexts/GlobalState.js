import { GlobalContext } from './useAppContext';
import React, { useState } from 'react';
import { Appearance } from 'react-native';
import { decode } from 'html-entities';
import TrackPlayer, { Capability } from 'react-native-track-player';
import { fetchSongDataFromId } from '../api';

const GlobalState = ({ children }) => {
  const colorscheme = Appearance.getColorScheme() === 'dark' ? true : false;
  const [isDarkMode, setIsDarkMode] = useState(colorscheme);
  const [homeData, setHomeData] = useState();
  const [searchData, setSearchData] = useState();
  const [albumData, setAlbumData] = useState();
  const [currentSong, setCurrentSong] = useState();
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [lyrics, setLyrics] = useState();
  const [isPlaying, setIsPlaying] = useState('paused');
  const [playlist, setPlaylist] = useState([]);
  const [colorPalette, setColorPalette] = useState();
  const [audioQuality, setAudioQuality] = useState(160);
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

  const playSongHandler = async (songId, addtoPlaylist) => {
    const track = await fetchSongDataFromId(songId);
    track.url = track.url.replace('_96.mp4',`_${audioQuality}.mp4`)
    // console.log(track)
    if (addtoPlaylist) {
      setPlaylist(prevPlaylist => [...prevPlaylist, track]);
      TrackPlayer.play();
    } else {
      setPlaylist([]);
      TrackPlayer.reset();
      setPlaylist([track]);
      TrackPlayer.play();
    }
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
        playSongHandler,
        audioQuality,
        setAudioQuality,
      }}>
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalState;
