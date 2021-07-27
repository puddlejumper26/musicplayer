import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';

import { AppStoreModule } from 'src/app/store';
import { getCurrentIndex, getPlayer, getPlayMode, getCurrentSong, getPlayList, getSongList } from 'src/app/store/selectors/player.selector';
import { PlayMode } from './player-types';
import { Song } from 'src/app/services/data-types/common.types';

@Component({
  selector: 'app-wy-player',
  templateUrl: './wy-player.component.html',
  styleUrls: ['./wy-player.component.less']
})
export class WyPlayerComponent implements OnInit {
  sliderValue = 35;
  bufferOffset = 45;

  songList: Song[];
  playList: Song[];
  currentIndex: number;
  playMode: PlayMode;
  currentSong: Song;

  constructor(
    private store$: Store<AppStoreModule>
  ) {

    /**
     * here @get the data from the @store
     */
    const appStore$ = this.store$.pipe(select(getPlayer));
    appStore$.pipe(select(getSongList)).subscribe(list => {
      this.watchList(list, 'songList')
    });
    appStore$.pipe(select(getPlayList)).subscribe(list => {
      this.watchList(list, 'playList')
    });
    appStore$.pipe(select(getCurrentIndex)).subscribe(index => {
      this.watchCurrentIndex(index)
    });
    appStore$.pipe(select(getPlayMode)).subscribe(mode => {
      this.watchPlayMode(mode)
    });
    appStore$.pipe(select(getCurrentSong)).subscribe(song => {
      this.watchCurrentSong(song)
    });

    // following is only working under @ngrx/store-devtool@8.3.0
    // const stateArr = [{
    //   type: getSongList,
    //   cb: list => this.watchList(list, 'songList'),
    // }, {
    //   type: getPlayList,
    //   cb: list => this.watchList(list, 'playList'),
    // }, {
    //   type: getCurrentIndex,
    //   cb: index => this.watchCurrentIndex(index),
    // }]

    // stateArr.forEach(item => {
    //   appStore$.pipe(select(item.type)).subscribe(item.cb);
    // })
  }

  ngOnInit() {
  }

  private watchList(list: Song[], type: string) {
    console.log('watchList - list', list);
    this[type] = list;
  }

  private watchCurrentIndex(index: number) {
    console.log('watchCurrentIndex - index', index);
    this.currentIndex = index;
  }

  private watchPlayMode(mode: PlayMode) {

  }

  private watchCurrentSong(song: Song) {
    if(song) {
      this.currentSong = song;
      console.log('watchCurrentSong - -', song);
    }
  }
}
