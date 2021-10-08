import { Component, OnInit, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';

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

  @Output() onChangeType = new EventEmitter<RecordType>();

  constructor() { }

  ngOnInit() {
  }

}
