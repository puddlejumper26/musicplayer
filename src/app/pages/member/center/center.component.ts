import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/internal/operators/map';

import { BatchActionsService } from './../../../store/batch-actions.service';
import { User, UserRecord, recordVal, UserSheet } from 'src/app/services/data-types/member.type';
import { SheetService } from 'src/app/services/sheet.service';
import { RecordType, MemberService } from 'src/app/services/member.service';


@Component({
  selector: 'app-center',
  templateUrl: './center.component.html',
  styleUrls: ['./center.component.less']
})
export class CenterComponent implements OnInit {

  user: User;
  records: recordVal[];
  userSheet: UserSheet;
  recordType = RecordType.allData;

  constructor(
    private route: ActivatedRoute,
    private sheetServe: SheetService,
    private batchActionsServe: BatchActionsService,
    private memberServe: MemberService
  ) {
    this.route.data.pipe(map(res => res.user )).subscribe(([user, userRecord, userSheet]) => {
      this.user = user;
      this.records = userRecord.slice(0, 10);
      this.userSheet = userSheet;
    });
  }

  ngOnInit() {
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

}
