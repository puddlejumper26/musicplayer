import { createSelector } from '@ngrx/store';

import { PlayState } from './../reducers/player.reducer';

const selectPlayerStates = (state: PlayState) => state;

export const getPlaying = createSelector(selectPlayerStates, (state: PlayState) => state.playing);
export const getPlayList = createSelector(selectPlayerStates, (state: PlayState) => state.playList);
export const getSongList = createSelector(selectPlayerStates, (state: PlayState) => state.songList);
export const getPlayMode = createSelector(selectPlayerStates, (state: PlayState) => state.playMode);
export const getCurrentIndex = createSelector(selectPlayerStates, (state: PlayState) => state.currentIndex);

export const getCurrentSong = createSelector(selectPlayerStates, ({ playList, currentIndex }: PlayState) => playList[currentIndex]);