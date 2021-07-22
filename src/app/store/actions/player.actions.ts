import { createAction, props } from "@ngrx/store";

import { PlayMode } from './../../share/wy-ui/wy-player/player-types';
import { Song } from "src/app/services/data-types/common.types";

export const SetPlaying = createAction('[player] Set playing', props<{ playing: boolean }>());
export const SetPlayList = createAction('[player] Set playList', props<{ list: Song[] }>());
export const SetSongList = createAction('[player] Set songList', props<{ list: Song[] }>());
export const SetPlayMode = createAction('[player] Set playMode', props<{ mode: PlayMode }>());
export const SetCurrentIndex = createAction('[player] Set currentIndex', props<{ index: number }>());