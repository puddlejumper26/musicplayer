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
