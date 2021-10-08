import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/internal/operators/map';

@Component({
  selector: 'app-record-detail',
  templateUrl: './record-detail.component.html',
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RecordDetailComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
  ) {
    this.route.data.pipe(map(res => res.user )).subscribe(([user, userRecord]) => {
      console.log('RecordDetailComponent - constructor - user - ', user);
      console.log('RecordDetailComponent - constructor - userRecord - ', userRecord);
    });
  }

  ngOnInit() {
  }

}
