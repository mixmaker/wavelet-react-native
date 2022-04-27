import {GlobalContext} from './useAppContext';
import React, {useState, useRef} from 'react';
import {Appearance} from 'react-native';
import CryptoJS from 'crypto-js';
import {decode} from 'html-entities';
import TrackPlayer, {Capability} from 'react-native-track-player';
import {getResponse, songDetailsfromIdURL} from '../api';
import axios from 'axios';

const GlobalState = ({children}) => {
  const colorscheme = Appearance.getColorScheme() === 'dark' ? true : false;
  const [isDarkMode, setIsDarkMode] = useState(colorscheme);
  const [homeData, setHomeData] = useState();
  const [searchData, setSearchData] = useState();
  const [albumData, setAlbumData] = useState();
  const [currentSong, setCurrentSong] = useState();
  const [currentSongId, setCurrentSongId] = useState();
  const [isPlaying, setIsPlaying] = useState(false);
  const [playlist, setPlaylist] = useState([]);
  const [error, setError] = useState();

  //decrypt encrypted media url
  function decryptByDES(ciphertext) {
    var keyHex = CryptoJS.enc.Utf8.parse('38346591');

    // direct decrypt ciphertext
    var decrypted = CryptoJS.DES.decrypt(
      {
        ciphertext: CryptoJS.enc.Base64.parse(ciphertext),
      },
      keyHex,
      {
        mode: CryptoJS.mode.ECB,
        padding: CryptoJS.pad.Pkcs7,
      },
    );
    return decrypted.toString(CryptoJS.enc.Utf8);
  }

  //decode html texts
  function decodeHtml(string) {
    return decode(string);
  }

  //? convert each song into a track object
  const trackHelper = song => ({
    url: decryptByDES(song.more_info.encrypted_media_url), // Load media from the network
    title: song.title,
    album: song.more_info.album,
    artist:
      song.more_info.artistMap.primary_artists.length > 2
        ? song.more_info.artistMap.primary_artists
            .slice(0, 2)
            .map(artist => artist.name)
            .join(', ')
        : song.more_info.artistMap.primary_artists
            .map(artist => artist.name)
            .join(', '),
    // genre: 'Progressive House, Electro House',
    // date: '2014-05-20T07:00:00+00:00', // RFC 3339
    artwork: song.image, // Load artwork from the network
    duration: song.duration, // Duration in seconds
  });
  const setupPlayer = async () => {
    await TrackPlayer.setupPlayer();
    TrackPlayer.updateOptions({
      stopWithApp: false,
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
  const addSongToPlaylist = songId => {
    fetchSongDataFromId(songId);
    setPlaylist([...playlist, track]);
  };
  const cancelTokenSource = axios.CancelToken.source();
  const fetchSongDataFromId = async songId => {
    try {
      const detailUri = songDetailsfromIdURL(songId || currentSongId);
      const data = await getResponse(detailUri, cancelTokenSource);
      const newTrack = trackHelper(data.songs[0]);
      return newTrack;
    } catch (error) {
      console.log(error);
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
        decryptByDES,
        decodeHtml,
        isPlaying,
        setIsPlaying,
        playlist,
        setPlaylist,
        trackHelper,
        currentSongId,
        setCurrentSongId,
        setupPlayer,
        addSongToPlaylist,
        fetchSongDataFromId,
        error,
        setError,
      }}>
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalState;
