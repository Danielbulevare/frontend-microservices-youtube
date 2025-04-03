import { UUID } from 'crypto';

export interface ISaveFavoriteVideo {
  userId?: UUID;
  videoId: string;
  title: string;
  url: string;
}
