import { Model } from '@nozbe/watermelondb';
import { field, readonly, date } from '@nozbe/watermelondb/decorators';

export default class RecentlyPlayed extends Model {
  static table = 'recentlyPlayed';

  @field('song_id') recentlyPlayed;
  @readonly @date('created_at') createdAt;
}
