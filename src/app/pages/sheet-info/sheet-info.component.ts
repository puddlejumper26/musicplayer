import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { map } from 'rxjs/internal/operators/map';

import { AppStoreModule } from 'src/app/store';
import { Song, SongSheet } from 'src/app/services/data-types/common.types';
import { Observable } from 'rxjs/internal/Observable';
import { Subject } from 'rxjs/internal/Subject';
import { takeUntil } from 'rxjs/internal/operators';
import { getCurrentSong, getPlayer } from 'src/app/store/selectors/player.selector';

@Component({
  selector: 'app-sheet-info',
  templateUrl: './sheet-info.component.html',
  styleUrls: ['./sheet-info.component.less']
})
export class SheetInfoComponent implements OnInit, OnDestroy {

  sheetInfo: SongSheet;
  description = {
    short: '',
    long: ''
  }
  controlDesc = {
    isExpand: false,
    label: 'Expand',
    iconCls: 'down'
  }

  private appStore$: Observable<AppStoreModule>;
  private destroy$ = new Subject<void>();

  currentSong: Song;

  constructor(
    private route: ActivatedRoute,
    private store$: Store<AppStoreModule>) {
    this.route.data.pipe(map(res => res.sheetInfo)).subscribe(res => {
      // console.log('SheetInfoComponent - constructor - route - res -', res);
      this.sheetInfo = res;

      if(res.description) {
        this.changeDesc(res.description);
      }
      this.listenCurrent();
    })
  }

  ngOnInit() {
  }

  private listenCurrent() {
    this.store$.pipe(select(getPlayer), select(getCurrentSong), takeUntil(this.destroy$))
      .subscribe(song => {
        console.log('SheetInfoComponent - listenCurrent - song - ', song);
        this.currentSong = song;
      })
  }

  private changeDesc(desc: string) {
    if(desc.length < 90) {
      this.description ={
        short: this.replaceBr('<b>Info: </b>' + desc),
        long: ''
      }
    }else {
      this.description = {
        short: this.replaceBr('<b>Info: </b>' + desc.slice(0, 90)) + '...',
        long: this.replaceBr('<b>Info: </b>' + desc)
      }
    }
  }

  private replaceBr(str: string): string {
    return str.replace(/\n/g, '<br />');
  }

  toggleDesc() {
    this.controlDesc.isExpand = !this.controlDesc.isExpand;
    if(this.controlDesc.isExpand) {
      this.controlDesc.label = 'Less';
      this.controlDesc.iconCls = 'up'
    }else {
      this.controlDesc.label = 'More';
      this.controlDesc.iconCls = 'down'
    }
  }

  onAddSong(song: Song, isPlay = false) {
    // whether added song is current playing song
    if(!this.currentSong || this.currentSong.id !== song.id) {

    }
  }

  ngOnDestroy(): void {
    this.destroy$.next(); // after this, the flow would be invalid
    this.destroy$.complete(); // also need to be completed
  }

}
