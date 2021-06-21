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
}

export type Singer = {
    picUrl: string;
    id: number;
    name: string;
    albumSize: number;
}