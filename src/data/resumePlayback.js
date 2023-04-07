import {Model} from '@nozbe/watermelondb';
import {field, readonly, date} from '@nozbe/watermelondb/decorators';

export default class ResumePlayback extends Model {
  static table = 'resumePlayback';

  @field('song_id') songId;
  @field('paused_at') resumePlayback;
  @readonly @date('created_at') createdAt;
}