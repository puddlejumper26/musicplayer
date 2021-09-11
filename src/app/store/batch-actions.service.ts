import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';

import { PlayState } from 'src/app/store/reducers/player.reducer';
import { AppStoreModule } from 'src/app/store';
import { Song } from '../services/data-types/common.types';
import { getPlayer } from './selectors/player.selector';
import { SetCurrentIndex, SetPlayList, SetSongList } from './actions/player.actions';
import { findIndex, shuffle } from '../utils/array';

@Injectable({
  providedIn: AppStoreModule
})
export class BatchActionsService {

  private playerState: PlayState;

  constructor(
    private store$: Store<AppStoreModule>,
    ) {
    this.store$.pipe(select(getPlayer)).subscribe( res => this.playerState = res);
  }

  //playList
  selectPlayList({ list, index }: { list: Song[], index: number}) {
    this.store$.dispatch(SetSongList({ songList: list }));

      let trueIndex = index;
      let trueList = list.slice();
      if(this.playerState.playMode.type === 'random') {
        trueList = shuffle(list || []);
        trueIndex = findIndex(trueList, list[trueIndex]);
      }
      this.store$.dispatch(SetPlayList({ playList: trueList }));
      this.store$.dispatch(SetCurrentIndex({ currentIndex: trueIndex })); // default to play the first song
  }

  //add song
  insertSong(song: Song, isPlay: boolean) {
    const songList = this.playerState.songList.slice();
    const playList = this.playerState.playList.slice();
    let insertIndex = this.playerState.currentIndex;
    const pIndex = findIndex(playList, song);
    if(pIndex > -1) {
      if(isPlay){
        insertIndex = pIndex;
      }
    }else {
      songList.push(song);
      playList.push(song);
      if(isPlay) {
        insertIndex = songList.length - 1;
      }
      this.store$.dispatch(SetSongList({ songList }));
      this.store$.dispatch(SetPlayList({ playList }));
    }

    if(insertIndex !== this.playerState.currentIndex) {
      this.store$.dispatch(SetCurrentIndex({ currentIndex: insertIndex }));
    }
  }

  deleteSong(song: Song) {
    // console.log('onDeleteSong is called');
    const songList = this.playerState.songList.slice();
    const playList = this.playerState.playList.slice();
    let currentIndex = this.playerState.currentIndex;

    const sIndex = findIndex(songList, song);
    songList.splice(sIndex, 1);

    const pIndex = findIndex(playList, song);
    playList.splice(pIndex, 1);

    // this means the deleted song is ahead of current playing song, so currentIndex should be minus one
    if(currentIndex > pIndex || currentIndex === playList.length) {
      currentIndex--;
    }

    this.store$.dispatch(SetSongList({ songList }));
    this.store$.dispatch(SetPlayList({ playList }));
    this.store$.dispatch(SetCurrentIndex({ currentIndex }));
  }

  clearSong() {
    // console.log('onClearSong is called');
    this.store$.dispatch(SetSongList({ songList: [] }));
    this.store$.dispatch(SetPlayList({ playList: [] }));
    this.store$.dispatch(SetCurrentIndex({ currentIndex: -1 }));
  }
}
