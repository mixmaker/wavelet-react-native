import { Model } from '@nozbe/watermelondb';
import { field, readonly, date } from '@nozbe/watermelondb/decorators';

export default class LikedSongs extends Model {
  static table = 'likedSongs';

  @field('song_id') likedSongs;
  @readonly @date('created_at') createdAt;
}
