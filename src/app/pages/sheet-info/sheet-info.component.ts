import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { map } from 'rxjs/internal/operators/map';
import { NzMessageService } from 'ng-zorro-antd';

import { SongService } from 'src/app/services/song.service';
import { AppStoreModule } from 'src/app/store';
import { Song, SongSheet } from 'src/app/services/data-types/common.types';
import { Observable } from 'rxjs/internal/Observable';
import { Subject } from 'rxjs/internal/Subject';
import { takeUntil } from 'rxjs/internal/operators';
import { getCurrentSong, getPlayer } from 'src/app/store/selectors/player.selector';
import { BatchActionsService } from 'src/app/store/batch-actions.service';
import { findIndex } from 'src/app/utils/array';
import { ModalTypes } from 'src/app/store/reducers/member.reducer';

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

  currentIndex = -1;
  currentSong: Song;

  constructor(
    private route: ActivatedRoute,
    private store$: Store<AppStoreModule>,
    private songServe: SongService,
    private batchActionsServe: BatchActionsService,
    private nzMessageServe: NzMessageService) {
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
        if(this.currentSong) {
          this.currentIndex = findIndex(this.sheetInfo.tracks, song);
        }else {
          this.currentIndex = -1;
        }
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
      this.songServe.getSongList(song)
        .subscribe(list => {
          if(list.length){
            this.batchActionsServe.insertSong(list[0], isPlay);
          }else {
            this.nzMessageServe.create('warning', 'Source is empty, please try another one!');
          }
        })
    }
  }

  onAddSongs(songs: Song[], isPlay = false) {
    this.songServe.getSongList(songs).subscribe(list => {
      if(list.length) {
        if(isPlay){
          this.batchActionsServe.selectPlayList({list, index: 0})
        }else {
          this.batchActionsServe.insertSongs(list);
        }
      }
    })
  }

  onLikeSong(id: string) {
    this.batchActionsServe.controlModal(true, ModalTypes.Like)
  }

  ngOnDestroy(): void {
    this.destroy$.next(); // after this, the flow would be invalid
    this.destroy$.complete(); // also need to be completed
  }

}
