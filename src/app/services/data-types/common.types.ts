export type Banner = {
    targetId: number;
    url: string;
    imageUrl: string;
}

export type HotTag = {
    id: number;
    name: string;
    position: number;
}

export type SongSheet = {
    id: number;
    name: string;
    picUrl: string;
    coverImgUrl: string;
    playCount: number;
    tracks: Song[];
    tags: string[];
    createTime: number;
    creator: {
      nickname: string;
      avatarUrl: string;
    };
    description: string;
    subscribedCount: number;
    shareCount: number;
    commentCount: number;
    subscribed: boolean;
    userId: number;
    trackCount: number;
}

export type Singer = {
    picUrl: string;
    id: number;
    name: string;
    albumSize: number;
    alias: string[];
}

export type SingerDetail = {
    artist: Singer;
    hotSongs: Song[];
}

export type Song = {
    id: number;
    name: string;
    url: string;
    ar: Singer[]; //Singer
    al: { id: number; name: string; picUrl: string };
    dt: number; // play duration
}

export type SongUrl = {
    id: number;
    url: string;
}

export type Lyric = {
    // id: number;
    lyric: string;
    tlyric: string;
}

export type SheetList = {
    playList: SongSheet[];
    total: number;
}

export type SearchResult = {
    // playlist?: SongSheet[];
    songs?: Song[];
    // songs: {artist: Singer[]}
}

export interface AnyJson {
  [key: string]: any
}
export interface SampleBack extends AnyJson {
  code: number;
}

