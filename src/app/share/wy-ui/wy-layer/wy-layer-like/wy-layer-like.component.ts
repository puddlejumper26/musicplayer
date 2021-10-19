import { Component, OnInit, ChangeDetectionStrategy, Input, OnChanges, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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
  @Input() visible: boolean;

  @Output() onLikeSong = new EventEmitter<LikeSongParams>();
  @Output() onCreateSheet = new EventEmitter<string>();

  creating = false;
  formModel: FormGroup;

  constructor(private fb: FormBuilder) {
    this.formModel = this.fb.group({
      sheetName: ['', [Validators.required]]
    });
  }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(changes['mySheets']) {
      // console.log('WyLayerLikeComponent - ngOnChanges - changes["mySheets"] - ', changes['mySheets'].currentValue);
    }
    if(changes['likeId']) {
      // console.log('WyLayerLikeComponent - ngOnChanges - changes["likeId"] - ', changes['likeId'].currentValue);
    }
    if(changes['visible']) {
      // console.log('WyLayerLikeComponent - ngOnChanges - changes["visible"] - ', changes['visible'].currentValue);
      if(!changes['visible']) {
        this.formModel.get('sheetName').reset();
        this.creating = false;
      }
    }
  }

  onLike(pid: string) {
    this.onLikeSong.emit({ pid, tracks: this.likeId });
  }

  onSubmit() {
    // console.log('WyLayerLikeComponent - onSubmit - this.formModel.value - ', this.formModel.value);
    this.onCreateSheet.emit(this.formModel.get('sheetName').value)
  }

}
