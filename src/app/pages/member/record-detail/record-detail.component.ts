import { Component, OnInit, ChangeDetectionStrategy, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { NzMessageService } from 'ng-zorro-antd';
import { map } from 'rxjs/internal/operators/map';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';
import { Subject } from 'rxjs/internal/Subject';

import { Singer, Song } from 'src/app/services/data-types/common.types';
import { recordVal, User } from 'src/app/services/data-types/member.type';
import { MemberService, RecordType } from 'src/app/services/member.service';
import { SheetService } from 'src/app/services/sheet.service';
import { SongService } from 'src/app/services/song.service';
import { AppStoreModule } from 'src/app/store';
import { SetShareInfo } from 'src/app/store/actions/member.actions';
import { BatchActionsService } from 'src/app/store/batch-actions.service';
import { getCurrentSong, getPlayer } from 'src/app/store/selectors/player.selector';
import { findIndex } from 'src/app/utils/array';

@Component({
  selector: 'app-record-detail',
  templateUrl: './record-detail.component.html',
  styles: [`.record-detail .page-wrap { padding: 40px; }`],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RecordDetailComponent implements OnInit, OnDestroy {

  user: User;
  records: recordVal[];
  recordType = RecordType.allData;
  currentSong: Song;
  currentIndex = -1;

  private destroy$ = new Subject();

  constructor(
    private route: ActivatedRoute,
    private sheetServe: SheetService,
    private batchActionsServe: BatchActionsService,
    private memberServe: MemberService,
    private songServe: SongService,
    private nzMessageServe: NzMessageService,
    private store$: Store<AppStoreModule>,
    private cdr: ChangeDetectorRef
  ) {
    this.route.data.pipe(map(res => res.user )).subscribe(([user, userRecord]) => {
      // console.log('RecordDetailComponent - constructor - user - ', user);
      // console.log('RecordDetailComponent - constructor - userRecord - ', userRecord);
      this.user = user;
      this.records = userRecord;
      this.listenCurrentSong();
    });
  }

  ngOnInit() {
  }

  private listenCurrentSong() {
    this.store$.pipe(select(getPlayer), select(getCurrentSong), takeUntil(this.destroy$)).subscribe( song => {
      this.currentSong = song;
      if(song) {
        const songs = this.records.map(item => item.song);
        this.currentIndex = findIndex(songs, song);
      }else {
        this.currentIndex = -1;
      }
      this.cdr.markForCheck();
    })
  }

  onPlaySheet(id: number) {
    this.sheetServe.playSheet(id).subscribe(list => {
      this.batchActionsServe.selectPlayList({ list, index: 0});
    })
  }

  onChangeType(type: RecordType) {
    if(this.recordType !== type) {
      this.recordType = type;
      this.memberServe.getUserRecord(this.user.profile.userId.toString(), type)
        .subscribe(records => {
          this.records = records;
          this.cdr.markForCheck();
        })
    }
  }

  onAddSong([song, isPlay]) {
    if(!this.currentSong || this.currentSong.id !== song.id) {
      this.songServe.getSongList(song)
        .subscribe(list => {
          if(list.length) {
            this.batchActionsServe.insertSong(list[0], isPlay);
          }else {
            this.nzMessageServe.create('warning', 'URL is empty!')
          }
        })
    }
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
