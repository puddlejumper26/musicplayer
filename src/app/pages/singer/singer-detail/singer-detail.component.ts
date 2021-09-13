import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/internal/operators/map';

@Component({
  selector: 'app-singer-detail',
  templateUrl: './singer-detail.component.html',
  styleUrls: ['./singer-detail.component.less']
})
export class SingerDetailComponent implements OnInit {

  constructor(private route: ActivatedRoute) {
    this.route.data.pipe(map(res => res.singerDetail)).subscribe(res => {
      console.log('SingerDetailComponent - constructor - res - ', res)
    })
  }

  ngOnInit() {
  }

}
