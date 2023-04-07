import { database } from './database';

const recentlyPlayed = database.collections.get('recentlyPlayed');
const likedSongs = database.collections.get('likedSongs');
const resumePlayback = database.collections.get('resumePlayback');

export const observeRecentlyPlayed = () => recentlyPlayed.query().observe();
export const observeLikedSongs = () => likedSongs.query().observe();

export const saveRecentlyPlayed = async id => {
  id !== undefined &&
    (await database.write(async () => {
      await recentlyPlayed.create(entry => {
        entry.song_id = id;
      });
    }));
};

export const findLikedSong = async id =>
  await database.get('likedSongs').find(id);
export const saveLikedSongs = async id => {
  id !== undefined &&
    (await database.write(async () => {
      await likedSongs.create(entry => {
        entry.song_id = id;
      });
    }));
};
export const unLikeSong = async id => {
  const result = await findLikedSong(id);
  await database.write(async () => result.destroyPermanently());
};

export const saveResumePlayback = async (id, sec) => {
  sec !== undefined &&
    id !== undefined &&
    (await database.write(async () => {
      await resumePlayback.create(entry => {
        entry.song_id = id;
        entry.paused_at = sec;
      });
    }));
};
