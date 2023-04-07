import { Database } from '@nozbe/watermelondb';
import SQLiteAdapter from '@nozbe/watermelondb/adapters/sqlite';
import RecentlyPlayed from './recentlyPlayed';
import ResumePlayback from './resumePlayback';
import LikedSongs from './likedSongs';

import schema from './schema';

const adapter = new SQLiteAdapter({
  schema,
});

export const database = new Database({
  adapter,
  modelClasses: [RecentlyPlayed, ResumePlayback, LikedSongs],
});
