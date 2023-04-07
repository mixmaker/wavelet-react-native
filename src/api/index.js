import axios from 'axios';

export const getResponse = async (url, cancelTokenSource) => {
  try {
    const { data } = await axios.get(
      url,
      // `https://wavelet-backend.vercel.app/api?q=${encodeURIComponent(url)}`,
      { cancelToken: cancelTokenSource?.token },
    );
    return data;
  } catch (err) {
    if (axios.isCancel(err)) return;
    console.log(err);
  }
};

export {
  decryptByDES,
  fetchTopSearches,
  fetchSongDataFromId,
  searchResultsURL,
  songDetailsfromIdURL,
  albumURL,
  topSearchesURL,
  homeDataURL,
  fetchLyricsfromId,
  trackHelper,
  fetchAlbumDetails,
} from './base';
