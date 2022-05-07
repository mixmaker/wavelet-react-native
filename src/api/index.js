import axios from 'axios';

export const getResponse = async (url, cancelTokenSource) => {
  try {
    const { data } = await axios.get(
      url,
      // `https://wavelet-backend.vercel.app/api?q=${encodeURIComponent(url)}`,
      { cancelToken: cancelTokenSource.token },
    );
    return data;
  } catch (err) {
    if (axios.isCancel(err)) return;
    console.log(err);
  }
};

export const makeMediaurl = url => {
  return url
    .replace('preview.saavncdn.com', 'aac.saavncdn.com')
    .replace('_96_p', '_320');
};

export {
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
