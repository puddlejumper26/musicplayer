import { NzMessageService } from 'ng-zorro-antd';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { map } from 'rxjs/internal/operators/map';
import { select, Store } from '@ngrx/store';
import { takeUntil } from 'rxjs/internal/operators';
import { Subject } from 'rxjs/internal/Subject';

import { AppStoreModule } from './../../../store/index';
import { Singer, SingerDetail, Song } from 'src/app/services/data-types/common.types';
import { getCurrentSong, getPlayer } from 'src/app/store/selectors/player.selector';
import { SongService } from 'src/app/services/song.service';
import { BatchActionsService } from 'src/app/store/batch-actions.service';
import { findIndex } from 'src/app/utils/array';
import { SetShareInfo } from 'src/app/store/actions/member.actions';

@Component({
  selector: 'app-singer-detail',
  templateUrl: './singer-detail.component.html',
  styleUrls: ['./singer-detail.component.less']
})
export class SingerDetailComponent implements OnInit, OnDestroy {

  singerDetail: SingerDetail;
  simiSingers: Singer[];
  currentSong: Song;
  currentIndex = -1;

  private destroy$ = new Subject<void>();

  constructor(
    private route: ActivatedRoute,
    private store$: Store<AppStoreModule>,
    private songServe: SongService,
    private batchActionsServe: BatchActionsService,
    private nzMessageServe: NzMessageService
    ) {
    this.route.data.pipe(map(res => res.singerDetail)).subscribe(([singerDetail, simiSingers]) => {
      // console.log('SingerDetailComponent - constructor - singerDetail - ', singerDetail)
      // console.log('SingerDetailComponent - constructor - simiSingers - ', simiSingers)
      this.singerDetail = singerDetail;
      this.simiSingers = simiSingers;
    });
    this.listenCurrent();
  }

  ngOnInit() {
  }

  private listenCurrent() {
    this.store$.pipe(select(getPlayer), select(getCurrentSong), takeUntil(this.destroy$))
      .subscribe(song => {
        this.currentSong = song;
        if(this.currentSong) {
          this.currentIndex = findIndex(this.singerDetail.hotSongs, song);
        }else {
          this.currentIndex = -1;
        }
      })
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

  ngOnDestroy(): void {
    this.destroy$.next(); // after this, the flow would be invalid
    this.destroy$.complete(); // also need to be completed
  }

  onLikeSong(id: string) {
    this.batchActionsServe.likeSong(id);
  }

  onShareSong(resource: Song, type = 'song') {
    let txt = this.makeTxt('Song', resource.name, resource.ar);
    this.store$.dispatch(SetShareInfo({ shareInfo: { id: resource.id.toString(), type, txt } }))
  }

  private makeTxt(type: string, name: string, makeBy: Singer[]): string {
    let makeByStr = makeBy.map(item => item.name).join('/');
    return `${type}: ${name} -- ${makeByStr}`;
  }
}
