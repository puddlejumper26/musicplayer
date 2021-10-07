import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';

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
  @Input() recordType: RecordType.weekData;
  @Input() listenSongs = 0;

  constructor() { }

  ngOnInit() {
  }

}
