import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';

import { AppStoreModule } from 'src/app/store';
import { getCurrentIndex, getPlayList, getSongList } from 'src/app/store/selectors/player.selector';

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
    // const appStore$ = this.store$.pipe(select(getPlayer));
    // this.store$.pipe(select(getSongList)).subscribe(list => {
    //   console.log('song list', list);
    // });
    // this.store$.pipe(select(getPlayList)).subscribe(list => {
    //   console.log('play list', list);
    // });
    // this.store$.pipe(select(getCurrentIndex)).subscribe(index => {
    //   console.log('current index', index);
    // })
  }

  ngOnInit() {
  }

}
