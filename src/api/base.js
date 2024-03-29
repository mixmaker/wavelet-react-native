import { getResponse } from './';

import CryptoJS from 'crypto-js';
import { decodeHtml } from '../contexts/GlobalState';

const baseURL = 'https://www.jiosaavn.com';
const URLstr = '/api.php?_format=json&_marker=0&api_version=4&ctx=web6dot0';
const endpoints = {
  homeData: '__call=webapi.getLaunchData',
  topSearches: '__call=content.getTopSearches',
  fromToken: '__call=webapi.get',
  featuredRadio: '__call=webradio.createFeaturedStation',
  artistRadio: '__call=webradio.createArtistStation',
  entityRadio: '__call=webradio.createEntityStation',
  radioSongs: '__call=webradio.getSong',
  songDetails: '__call=song.getDetails',
  playlistDetails: '__call=playlist.getDetails',
  albumDetails: '__call=content.getAlbumDetails',
  getResults: '__call=search.getResults',
  albumResults: '__call=search.getAlbumResults',
  artistResults: '__call=search.getArtistResults',
  playlistResults: '__call=search.getPlaylistResults',
  getReco: '__call=reco.getreco',
  getAlbumReco: '__call=reco.getAlbumReco',
  artistOtherTopSongs: '__call=search.artistOtherTopSongs',
};

const getURL = params => {
  return `${baseURL}${URLstr}&${params}`;
};

//decrypt encrypted media url
export function decryptByDES(ciphertext) {
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

export const artistResultsURL = query => {
  return getURL(`p=1&q=${query}&n=20&${endpoints.artistResults}`);
};
export const albumResultsURL = query => {
  return getURL(`p=1&q=${query}&n=20&${endpoints.albumResults}`);
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

export const fetchSearchResults = async (q, cancelTokenSource) => {
  try {
    const songResultsUrl = searchResultsURL(q);
    const artistResultsUrl = artistResultsURL(q);
    const albumResultsUrl = albumResultsURL(q);
    const songResults = await getResponse(songResultsUrl, cancelTokenSource);
    const artistResults = await getResponse(
      artistResultsUrl,
      cancelTokenSource,
    );
    const albumResults = await getResponse(albumResultsUrl, cancelTokenSource);
    return {
      artistResults: artistResults?.results,
      albumResults: albumResults?.results,
      songResults: songResults?.results,
    };
  } catch (error) {
    console.log(error);
  }
};

export const fetchAlbumDetails = async (type, id, cancelTokenSource) => {
  try {
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
  } catch (error) {
    console.log(error);
  }
};

export const fetchSongDataFromId = async (songId, cancelTokenSource) => {
  try {
    const detailUri = songDetailsfromIdURL(songId);
    const data = await getResponse(detailUri, cancelTokenSource);
    const newTrack = trackHelper(data.songs[0], songId);
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
  id: song.id,
  url: decryptByDES(song.more_info.encrypted_media_url), // Load media from the network
  title: decodeHtml(song.title),
  album: decodeHtml(song.more_info.album),
  artist: song.more_info.artistMap.primary_artists
    .slice(0, 2)
    .map(artist => artist.name)
    .join(', '),
  // genre: 'Progressive House, Electro House',
  // date: '2014-05-20T07:00:00+00:00', // RFC 3339
  artwork: song.image, // Load artwork from the network
  duration: Number(song.more_info.duration), // Duration in seconds
});

export const fetchTopSearches = async cancelTokenSource => {
  try {
    const uri = topSearchesURL();
    const data = await getResponse(uri, cancelTokenSource);
    return data;
  } catch (error) {
    console.log(error);
  }
};
