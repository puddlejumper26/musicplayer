import { Song, SongSheet } from './common.types';

export type User = {
  level?: number;
  listenSongs?: number;

  profile: {
    userId: number;
    nickname: string;
    avatarUrl: string;
    backgroundUrl: string;
    signature: string;
    gender: number;
    followeds: number;
    follows: number;
    eventCount: number;
  }
}

export type Signin = {
  code: number;
  point?: number;
  msg?: number;
}

export type recordVal = {
  playCount: number;
  score: number;
  song: Song;
}

type recordKeys = 'weekData' | 'allData';

export type UserRecord = {
  [key in recordKeys]: recordVal[];
}

export type UserSheet = {
  self: SongSheet[],
  subscribed: SongSheet[]
}
