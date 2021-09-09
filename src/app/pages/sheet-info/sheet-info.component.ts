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
  description = {
    short: '',
    long: ''
  }
  controlDesc = {
    isExpand: false,
    label: 'Expand',
    iconCls: 'down'
  }

  constructor(private route: ActivatedRoute) {
    this.route.data.pipe(map(res => res.sheetInfo)).subscribe(res => {
      // console.log('SheetInfoComponent - constructor - route - res -', res);
      this.sheetInfo = res;

      if(res.description) {
        this.changeDesc(res.description);
      }
    })
  }

  ngOnInit() {
  }

  private changeDesc(desc: string) {
    if(desc.length < 90) {
      this.description ={
        short: this.replaceBr('<b>Info: </b>' + desc),
        long: ''
      }
    }else {
      this.description = {
        short: this.replaceBr('<b>Info: </b>' + desc.slice(0, 90)) + '...',
        long: this.replaceBr('<b>Info: </b>' + desc)
      }
    }
  }

  private replaceBr(str: string): string {
    return str.replace(/\n/g, '<br />');
  }

  toggleDesc() {
    this.controlDesc.isExpand = !this.controlDesc.isExpand;
    if(this.controlDesc.isExpand) {
      this.controlDesc.label = 'Less';
      this.controlDesc.iconCls = 'up'
    }else {
      this.controlDesc.label = 'More';
      this.controlDesc.iconCls = 'down'
    }
  }
}
