import { getPlayer, getCurrentSong } from 'src/app/store/selectors/player.selector';
import { NzMessageService } from 'ng-zorro-antd';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/internal/operators/map';
import { select, Store } from '@ngrx/store';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';
import { Subject } from 'rxjs/internal/Subject';

import { findIndex } from 'src/app/utils/array';
import { AppStoreModule } from 'src/app/store';
import { SongService } from 'src/app/services/song.service';
import { BatchActionsService } from './../../../store/batch-actions.service';
import { User, UserRecord, recordVal, UserSheet } from 'src/app/services/data-types/member.type';
import { SheetService } from 'src/app/services/sheet.service';
import { RecordType, MemberService } from 'src/app/services/member.service';
import { Song } from 'src/app/services/data-types/common.types';


@Component({
  selector: 'app-center',
  templateUrl: './center.component.html',
  styleUrls: ['./center.component.less']
})
export class CenterComponent implements OnInit, OnDestroy {

  user: User;
  records: recordVal[];
  userSheet: UserSheet;
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
    private store$: Store<AppStoreModule>
  ) {
    this.route.data.pipe(map(res => res.user )).subscribe(([user, userRecord, userSheet]) => {
      this.user = user;
      this.records = userRecord.slice(0, 10);
      this.userSheet = userSheet;
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
        .subscribe(records => this.records = records.slice(0, 10))
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
}
