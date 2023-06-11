import { MMKV } from 'react-native-mmkv';

const storage = new MMKV();

export default storage;

const storageKeys = [
  'recentlyPlayed',
  'likedSongs',
  'themePreference',
  'audioQuality',
  'playerScrAnm',
];
export { storageKeys };
