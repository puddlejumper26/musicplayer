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
    playCount: number;
    tracks: Song[];
}

export type Singer = {
    picUrl: string;
    id: number;
    name: string;
    albumSize: number;
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
