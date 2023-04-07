import { registerSheet } from 'react-native-actions-sheet';
import SongInfoSheet from './src/components/sheets/SongInfoSheet';
import NowPlayingSheet from './src/components/sheets/NowPlayingSheet';
 
registerSheet("song-info-sheet", SongInfoSheet);
registerSheet("now-playing-sheet", NowPlayingSheet);
 
export {};