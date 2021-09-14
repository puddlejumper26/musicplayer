import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/internal/operators/map';

import { SingerDetail } from 'src/app/services/data-types/common.types';

@Component({
  selector: 'app-singer-detail',
  templateUrl: './singer-detail.component.html',
  styleUrls: ['./singer-detail.component.less']
})
export class SingerDetailComponent implements OnInit {

  singerDetail: SingerDetail;

  constructor(private route: ActivatedRoute) {
    this.route.data.pipe(map(res => res.singerDetail)).subscribe(res => {
      // console.log('SingerDetailComponent - constructor - res - ', res)
      this.singerDetail = res;
    })
  }

  ngOnInit() {
  }

}
