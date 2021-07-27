import { Action, createReducer, on } from "@ngrx/store";

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
    on(SetPlaying, (state, {playing}) => ({...state, playing})), // will return new state , so when the onPlaySheet(homeComponent) is called, new value will be given
    on(SetPlayList, (state, {playList}) => ({...state, playList})),
    on(SetSongList, (state, {songList}) => ({...state, songList})),
    on(SetPlayMode, (state, {playMode}) => ({...state, playMode})),
    on(SetCurrentIndex, (state, {currentIndex}) => ({...state, currentIndex})),
)

export function playerReducer(state: PlayState, action: Action) {
    return reducer(state, action);
}