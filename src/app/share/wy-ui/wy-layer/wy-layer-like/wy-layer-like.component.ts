import { Component, OnInit, ChangeDetectionStrategy, Input, OnChanges, SimpleChanges } from '@angular/core';

import { SongSheet } from 'src/app/services/data-types/common.types';

@Component({
  selector: 'app-wy-layer-like',
  templateUrl: './wy-layer-like.component.html',
  styleUrls: ['./wy-layer-like.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WyLayerLikeComponent implements OnInit, OnChanges {

  @Input() mySheets: SongSheet[];

  constructor() { }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(changes['mySheets']) {
      console.log('WyLayerLikeComponent - ngOnChanges - changes["mySheets"] - ', changes['mySheets'].currentValue);
    }
  }

}
