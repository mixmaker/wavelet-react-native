import { getResponse } from './';

import CryptoJS from 'crypto-js';

const baseURL = 'https://www.jiosaavn.com';
const URLstr = '/api.php?_format=json&_marker=0&api_version=4&ctx=web6dot0';
const endpoints = {
  getResults: '__call=search.getResults',
  songDetails: '__call=song.getDetails',
  homeData: '__call=webapi.getLaunchData',
  topSearches: '__call=content.getTopSearches',
  playlistDetails: '__call=playlist.getDetails',
  albumDetails: '__call=content.getAlbumDetails',
  artistResults: '__call=search.getArtistResults',
  artistRadio: '__call=webradio.createArtistStation',
  radioSongs: '__call=webradio.getSong',
  getlyrics: '__call=lyrics.getLyrics',
};

const getURL = params => {
  return `${baseURL}${URLstr}&${params}`;
};

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

export const searchResultsURL = query => {
  return getURL(`p=1&q=${query}&n=20&${endpoints.getResults}`);
};

export const songDetailsfromIdURL = id => {
  return getURL(`pids=${id}&${endpoints.songDetails}`);
};

export const homeDataURL = () => {
  return getURL(`${endpoints.homeData}`);
};

export const topSearchesURL = () => {
  return getURL(`${endpoints.topSearches}`);
};

export const lyricsURL = id => {
  return getURL(`${endpoints.getlyrics}&lyrics_id=${id}`);
};

export const albumURL = (type, id) => {
  let params;
  if (type === 'playlist') {
    params = `${endpoints.playlistDetails}&cc=in&listid=${id}`;
  }
  if (type === 'album') {
    params = `${endpoints.albumDetails}&cc=in&albumid=${id}`;
  }
  if (type === 'song') {
    params = `pids=${id}&${endpoints.songDetails}`;
  }
  if (type === 'radio_station') {
    params = `name=${id}&query=${id}&language=hindi&${endpoints.artistRadio}`;
  }
  return getURL(params);
};

export const fetchAlbumDetails = async (type, id, cancelTokenSource) => {
  const url = albumURL(type, id);
  const data = await getResponse(url, cancelTokenSource);
  if (type === 'album' || type === 'playlist' || type === 'song') {
    return data;
  }
  if (type === 'radio_station') {
    const { stationid } = data;
    const newurl = getURL(
      `stationid=${stationid}&k=20&next=1&${endpoints.radioSongs}`,
    );
    const newData = await getResponse(newurl, cancelTokenSource);
    return newData;
  }
};

export const fetchSongDataFromId = async (songId, cancelTokenSource) => {
  try {
    const detailUri = songDetailsfromIdURL(songId);
    const data = await getResponse(detailUri, cancelTokenSource);
    const newTrack = trackHelper(data.songs[0]);
    return newTrack;
  } catch (error) {
    console.log(error);
  }
};

export const fetchLyricsfromId = async (songId, cancelTokenSource) => {
  try {
    const lyricsuri = lyricsURL(songId);
    const data = await getResponse(lyricsuri, cancelTokenSource);
    return data;
  } catch (error) {
    console.log(error);
  }
};
//? convert each song into a track object
export const trackHelper = song => ({
  url: decryptByDES(song.more_info.encrypted_media_url), // Load media from the network
  title: song.title,
  album: song.more_info.album,
  artist: song.more_info.artistMap.primary_artists
    .slice(0, 2)
    .map(artist => artist.name)
    .join(', '),
  // genre: 'Progressive House, Electro House',
  // date: '2014-05-20T07:00:00+00:00', // RFC 3339
  artwork: song.image, // Load artwork from the network
  duration: Number(song.more_info.duration), // Duration in seconds
});
