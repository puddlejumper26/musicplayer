import { Component, OnInit, ChangeDetectionStrategy, Input, OnChanges, SimpleChanges, Output, EventEmitter } from '@angular/core';

import { SongSheet } from 'src/app/services/data-types/common.types';
import { LikeSongParams } from 'src/app/services/member.service';

@Component({
  selector: 'app-wy-layer-like',
  templateUrl: './wy-layer-like.component.html',
  styleUrls: ['./wy-layer-like.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WyLayerLikeComponent implements OnInit, OnChanges {

  @Input() mySheets: SongSheet[];
  @Input() likeId: string;

  @Output() onLikeSong = new EventEmitter<LikeSongParams>();

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

  onLike(pid: string) {
    this.onLikeSong.emit({ pid, tracks: this.likeId });
  }

}
