import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/internal/operators/map';

import { BatchActionsService } from './../../../store/batch-actions.service';
import { User, UserRecord, recordVal, UserSheet } from 'src/app/services/data-types/member.type';
import { SheetService } from 'src/app/services/sheet.service';


@Component({
  selector: 'app-center',
  templateUrl: './center.component.html',
  styleUrls: ['./center.component.less']
})
export class CenterComponent implements OnInit {

  user: User;
  userRecord: recordVal[];
  userSheet: UserSheet

  constructor(
    private route: ActivatedRoute,
    private sheetServe: SheetService,
    private batchActionsServe: BatchActionsService,
  ) {
    this.route.data.pipe(map(res => res.user )).subscribe(([user, userRecord, userSheet]) => {
      this.user = user;
      this.userRecord = userRecord;
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

}
