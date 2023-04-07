import { appSchema, tableSchema } from '@nozbe/watermelondb';

export default appSchema({
  version: 2,
  tables: [
    tableSchema({
      name: 'recentlyPlayed',
      columns: [
        { name: 'song_id', type: 'string', isIndexed: true },
        { name: 'created_at', type: 'number' },
      ],
    }),
    tableSchema({
      name: 'likedSongs',
      columns: [
        { name: 'song_id', type: 'string', isIndexed: true },
        { name: 'created_at', type: 'number' },
      ],
    }),
    tableSchema({
      name: 'resumePlayback',
      columns: [
        { name: 'song_id', type: 'string' },
        { name: 'paused_at', type: 'number' },
        { name: 'created_at', type: 'number' },
      ],
    }),
  ],
});
