import axios from 'axios';

export const getResponse = async (url, cancelTokenSource) => {
  const {data} = await axios.get(
    `https://wavelet-backend.vercel.app/api?q=${encodeURIComponent(url)}`,
    {cancelToken: cancelTokenSource.token},
  );
  return data;
};

export const makeMediaurl = url => {
  return url
    .replace('preview.saavncdn.com', 'aac.saavncdn.com')
    .replace('_96_p', '_320');
};

export {
  searchResultsURL,
  songDetailsfromIdURL,
  albumURL,
  topSearchesURL,
  homeDataURL,
} from './base';
