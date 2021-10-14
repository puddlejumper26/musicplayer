import { SetModalType, SetModalVisible, SetLikeId } from './actions/member.actions';
import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';

import { CurrentActions, PlayState } from 'src/app/store/reducers/player.reducer';
import { AppStoreModule } from 'src/app/store';
import { Song } from '../services/data-types/common.types';
import { getMember } from './selectors/member.selector';
import { getPlayer } from './selectors/player.selector';
import { SetCurrentIndex, SetPlayList, SetSongList, SetCurrentAction } from './actions/player.actions';
import { findIndex, shuffle } from '../utils/array';
import { MemberState, ModalTypes } from './reducers/member.reducer';

@Injectable({
  providedIn: AppStoreModule
})
export class BatchActionsService {

  private playerState: PlayState;
  private memberState: MemberState

  constructor(
    private store$: Store<AppStoreModule>,
    ) {
    this.store$.pipe(select(getPlayer)).subscribe( res => this.playerState = res);
    this.store$.pipe(select(getMember)).subscribe( res => this.memberState = res);
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
      this.store$.dispatch(SetCurrentAction({ currentAction: CurrentActions.Play }));
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
      this.store$.dispatch(SetCurrentAction({ currentAction: CurrentActions.Play }));
    }else {
      this.store$.dispatch(SetCurrentAction({ currentAction: CurrentActions.Add }));
    }
  }

   //add songs
   insertSongs(songs: Song[]) {
    const songList = this.playerState.songList.slice();
    const playList = this.playerState.playList.slice();
    songs.forEach(item => {
      const pIndex = findIndex(playList, item);
      if(pIndex === -1) {
        songList.push(item);
        playList.push(item);
      }
    });
    this.store$.dispatch(SetSongList({ songList }));
    this.store$.dispatch(SetPlayList({ playList }));
    this.store$.dispatch(SetCurrentAction({ currentAction: CurrentActions.Add }));
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
    this.store$.dispatch(SetCurrentAction({ currentAction: CurrentActions.Delete }));
  }

  clearSong() {
    // console.log('onClearSong is called');
    this.store$.dispatch(SetSongList({ songList: [] }));
    this.store$.dispatch(SetPlayList({ playList: [] }));
    this.store$.dispatch(SetCurrentIndex({ currentIndex: -1 }));
    this.store$.dispatch(SetCurrentAction({ currentAction: CurrentActions.Clear }));
  }

  // membership login tab show | hide
  // default is to show
  controlModal(visible = true, modalType = ModalTypes.Default) {
    if(modalType) {
      this.store$.dispatch(SetModalType({ modalType }));
    }
    this.store$.dispatch(SetModalVisible({ modalVisible: visible }));
  }

  likeSong(id: string) {
    this.store$.dispatch(SetModalType({ modalType: ModalTypes.Like }));
    this.store$.dispatch(SetLikeId({ likeId: id }));
  }
}
