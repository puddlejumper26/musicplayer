import { getMember, getLikeId } from './../../../../store/selectors/member.selector';
import { Component, OnInit, ChangeDetectionStrategy, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Store, select } from '@ngrx/store';

import { SongSheet } from 'src/app/services/data-types/common.types';
import { AppStoreModule } from 'src/app/store';

@Component({
  selector: 'app-wy-layer-like',
  templateUrl: './wy-layer-like.component.html',
  styleUrls: ['./wy-layer-like.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WyLayerLikeComponent implements OnInit, OnChanges {

  @Input() mySheets: SongSheet[];
  @Input() likeId: string;

  constructor() {}

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(changes['mySheets']) {
      // console.log('WyLayerLikeComponent - ngOnChanges - changes["mySheets"] - ', changes['mySheets'].currentValue);
    }
    if(changes['likeId']) {
      // console.log('WyLayerLikeComponent - ngOnChanges - changes["likeId"] - ', changes['likeId'].currentValue);
    }
  }

  onLike(id: string) {
  }

}
