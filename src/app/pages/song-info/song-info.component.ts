import { AppStoreModule } from './../../store/index';
import { NzMessageService } from 'ng-zorro-antd';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/internal/operators/map';
import { select, Store } from '@ngrx/store';
import { Subject } from 'rxjs/internal/Subject';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';

import { SongService } from 'src/app/services/song.service';
import { Singer, Song } from 'src/app/services/data-types/common.types';
import { BaseLyricLine, WyLyric } from './../../share/wy-ui/wy-player/wy-player-panel/wy-lyric';
import { BatchActionsService } from 'src/app/store/batch-actions.service';
import { getCurrentSong, getPlayer } from 'src/app/store/selectors/player.selector';
import { findIndex } from 'src/app/utils/array';
import { SetShareInfo } from 'src/app/store/actions/member.actions';

@Component({
  selector: 'app-song-info',
  templateUrl: './song-info.component.html',
  styleUrls: ['./song-info.component.less']
})
export class SongInfoComponent implements OnInit, OnDestroy {

  song: Song;
  currentSong: Song;
  lyric: BaseLyricLine[];

  controlLyric = {
    isExpand: false,
    label: 'More',
    iconFls: 'down'
  };

  private destroy$ = new Subject<void>();

  constructor(
    private route: ActivatedRoute,
    private songServe: SongService,
    private batchActionsServe: BatchActionsService,
    private nzMessageServe: NzMessageService,
    private store$: Store<AppStoreModule>
  ) {
    this.route.data.pipe(map(res => res.songInfo)).subscribe(([song, lyric]) => {
      // console.log('SongInfoComponent - constructor - res -', res);
      this.song = song;
      this.lyric = new WyLyric(lyric).lines;
      // console.log('SongInfoComponent - constructor - lyric -', this.lyric);
    });
    this.listenCurrent();
  }

  ngOnInit() {
  }

  toggleLyric(){
    this.controlLyric.isExpand = !this.controlLyric.isExpand;
    if(this.controlLyric.isExpand) {
      this.controlLyric.label = "Less";
      this.controlLyric.iconFls = "up";
    }else {
      this.controlLyric.label = "More";
      this.controlLyric.iconFls = "down";
    }
  }

  onAddSong(song: Song, isPlay = false) {
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

  private listenCurrent() {
    this.store$.pipe(select(getPlayer), select(getCurrentSong), takeUntil(this.destroy$))
      .subscribe(song => {
        // console.log('SongInfoComponent - listenCurrent - song - ', song);
        this.currentSong = song;
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
    // console.log('WyPlayerComponent - onShareSong - txt -', txt);
    this.store$.dispatch(SetShareInfo({ shareInfo: { id: resource.id.toString(), type, txt } }))
  }

  private makeTxt(type: string, name: string, makeBy: Singer[]): string {
    let makeByStr = makeBy.map(item => item.name).join('/');
    return `${type}: ${name} -- ${makeByStr}`;
  }
}
