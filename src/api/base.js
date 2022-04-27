const baseURL = "https://www.jiosaavn.com";
const URLstr = "/api.php?_format=json&_marker=0&api_version=4&ctx=web6dot0";
const endpoints = {
  getResults: "__call=search.getResults",
  songDetails: "__call=song.getDetails",
  homeData: "__call=webapi.getLaunchData",
  topSearches: "__call=content.getTopSearches",
  playlistDetails: "__call=playlist.getDetails",
  albumDetails: "__call=content.getAlbumDetails",
  artistResults: "__call=search.getArtistResults",
};

const getURL = (params) => {
  return `${baseURL}${URLstr}&${params}`;
};

export const searchResultsURL = (query) => {
  return getURL(`p=1&q=${query}&n=20&${endpoints.getResults}`);
};

export const songDetailsfromIdURL = (id) => {
  return getURL(`pids=${id}&${endpoints.songDetails}`);
};

export const homeDataURL = () => {
  return getURL(`${endpoints.homeData}`);
};

export const topSearchesURL = () => {
  return getURL(`${endpoints.topSearches}`);
};

export const albumURL = (type, id) => {
  let params;
  if (type === "playlist") {
    params = `${endpoints.playlistDetails}&cc=in&listid=${id}`;
  }
  if (type === "album") {
    params = `${endpoints.albumDetails}&cc=in&albumid=${id}`;
  }
  if (type === "song") {
    params = `pids=${id}&${endpoints.songDetails}`;
  }
  return getURL(params);
};
