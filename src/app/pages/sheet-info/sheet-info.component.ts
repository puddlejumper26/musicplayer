import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/internal/operators/map';

import { SongSheet } from 'src/app/services/data-types/common.types';

@Component({
  selector: 'app-sheet-info',
  templateUrl: './sheet-info.component.html',
  styleUrls: ['./sheet-info.component.less']
})
export class SheetInfoComponent implements OnInit {

  sheetInfo: SongSheet;

  constructor(private route: ActivatedRoute) {
    this.route.data.pipe(map(res => res.sheetInfo)).subscribe(res => {
      console.log('SheetInfoComponent - constructor - route - res -', res);
      this.sheetInfo = res;
    })
  }

  ngOnInit() {
  }

}
