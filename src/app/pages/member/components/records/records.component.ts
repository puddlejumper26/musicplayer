import { Component, OnInit, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';

import { Song } from 'src/app/services/data-types/common.types';
import { recordVal } from 'src/app/services/data-types/member.type';
import { RecordType } from 'src/app/services/member.service';

@Component({
  selector: 'app-records',
  templateUrl: './records.component.html',
  styleUrls: ['./records.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RecordsComponent implements OnInit {

  @Input() records: recordVal[];
  @Input() recordType: RecordType.allData;
  @Input() listenSongs = 0;
  @Input() currentIndex: number;

  @Output() onChangeType = new EventEmitter<RecordType>();
  @Output() onAddSong = new EventEmitter<[Song, boolean]>();
  // @Output() onLikeSong = new EventEmitter<>();
  // @Output() onShareSong = new EventEmitter<>();

  constructor() { }

  ngOnInit() {
  }

}
