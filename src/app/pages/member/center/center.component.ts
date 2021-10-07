import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/internal/operators/map';


@Component({
  selector: 'app-center',
  templateUrl: './center.component.html',
  styleUrls: ['./center.component.less']
})
export class CenterComponent implements OnInit {

  constructor(
    private route: ActivatedRoute
  ) {
    this.route.data.pipe(map(res => res.user )).subscribe(([user, userRecord, userSheet]) => {
      console.log('CenterComponent - user - ', user);
      console.log('CenterComponent - userRecord - ', userRecord);
      console.log('CenterComponent - userSheet - ', userSheet);
    });
  }

  ngOnInit() {
  }

}
