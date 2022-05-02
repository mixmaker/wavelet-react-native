import axios from 'axios';

export const getResponse = async (url, cancelTokenSource) => {
  const { data } = await axios.get(
    url,
    // `https://wavelet-backend.vercel.app/api?q=${encodeURIComponent(url)}`,
    { cancelToken: cancelTokenSource.token },
  );
  return data;
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
  trackHelper,
} from './base';
