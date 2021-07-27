import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';

import { AppStoreModule } from 'src/app/store';
import { getCurrentIndex, getPlayer, getPlayList, getSongList } from 'src/app/store/selectors/player.selector';
import { Song } from 'src/app/services/data-types/common.types';

@Component({
  selector: 'app-wy-player',
  templateUrl: './wy-player.component.html',
  styleUrls: ['./wy-player.component.less']
})
export class WyPlayerComponent implements OnInit {
  sliderValue = 35;
  bufferOffset = 45;

  constructor(
    private store$: Store<AppStoreModule>
  ) {

    /**
     * here @get the data from the @store
     */
    const appStore$ = this.store$.pipe(select(getPlayer));
    appStore$.pipe(select(getSongList)).subscribe(list => {
      console.log('song list', list);
      this.watchList(list, 'songList')
    });
    appStore$.pipe(select(getPlayList)).subscribe(list => {
      console.log('play list', list);
      this.watchList(list, 'playList')
    });
    appStore$.pipe(select(getCurrentIndex)).subscribe(index => {
      console.log('current index', index);
      this.watchCurrentIndex(index)
    })

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

  }

  private watchCurrentIndex(index: number) {
    console.log('watchCurrentIndex - index', index);
  }
}
