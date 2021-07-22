import { state } from "@angular/animations";
import { createReducer, on } from "@ngrx/store";

import { Song } from "src/app/services/data-types/common.types";
import { PlayMode } from "src/app/share/wy-ui/wy-player/player-types";

import { SetCurrentIndex, SetPlaying, SetPlayList, SetPlayMode, SetSongList } from './../actions/player.actions';


export type PlayState = {
    // play status
    playing: boolean;

    // play mode
    playMode: PlayMode;

    // Song List
    songList: Song[];

    //play list
    playList: Song[];

    //current playing index
    currentIndex: number;
}

export const initialState: PlayState = {
    playing: false,
    songList: [],
    playList: [],
    playMode: {type: 'loop', label: 'loop'},
    currentIndex: -1,
}

// register 5 actions
const reducer = createReducer(
    initialState,
    on(SetPlaying, (state, {playing}) => ({...state, playing})),
    on(SetPlayList, (state, {list}) => ({...state, playList: list})),
    on(SetSongList, (state, {list}) => ({...state, songList: list})),
    on(SetPlayMode, (state, {mode}) => ({...state, playMode: mode})),
    on(SetCurrentIndex, (state, {index}) => ({...state, currentIndex: index})),
)