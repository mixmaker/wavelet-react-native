import storage from './storage';

export const saveRecentlyPlayed = id => {
  if (storage.contains('recentlyPlayed')) {
    const privData = storage.getString('recentlyPlayed');
    const parsedData = JSON.parse(privData);
    // console.log(parsedData);
    !parsedData.includes(id) &&
      storage.set('recentlyPlayed', JSON.stringify([...parsedData, id]));
  } else {
    storage.set('recentlyPlayed', JSON.stringify([id]));
  }
  // id !== undefined &&
  //   (await database.write(async () => {
  //     await recentlyPlayed.create(entry => {
  //       entry.song_id = id;
  //     });
  //   }));
};

export const findLikedSong = async id => {
  try {
    const data = storage.getString('likedSongs');
    return JSON.parse(data).includes(id);
  } catch (error) {
    console.log(error);
  }

  // await database.get('likedSongs').find(id);
};
export const saveLikedSongs = async id => {
  if (storage.contains('likedSongs')) {
    const privData = storage.getString('likedSongs');
    const parsedData = JSON.parse(privData);
    // console.log(parsedData);
    !parsedData.includes(id) &&
      storage.set('likedSongs', JSON.stringify([...parsedData, id]));
  } else {
    storage.set('likedSongs', JSON.stringify([id]));
  }
  // (await database.write(async () => {
  //   await likedSongs.create(entry => {
  //     entry.song_id = id;
  //   });
  // }));
};
export const unLikeSong = async id => {
  const data = storage.getString('likedSongs');
  const parsedData = JSON.parse(data);
  const index = parsedData.indexOf(id);
  if (index > -1) {
    parsedData.splice(index, 1);
    console.log(parsedData);
    storage.set('likedSongs', JSON.stringify(parsedData));
  }
};

// export const saveResumePlayback = async (id, sec) => {
//   sec !== undefined &&
//     id !== undefined &&
//     (await database.write(async () => {
//       await resumePlayback.create(entry => {
//         entry.song_id = id;
//         entry.paused_at = sec;
//       });
//     }));
// };
