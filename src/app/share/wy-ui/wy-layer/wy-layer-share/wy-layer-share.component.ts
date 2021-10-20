import { Component, OnInit, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { ShareInfo } from 'src/app/store/reducers/member.reducer';

const MAX_MSG = 140;

@Component({
  selector: 'app-wy-layer-share',
  templateUrl: './wy-layer-share.component.html',
  styleUrls: ['./wy-layer-share.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WyLayerShareComponent implements OnInit {
  @Input() shareInfo: ShareInfo;

  @Output() onCancel = new EventEmitter<void>();

  formModel: FormGroup;
  surplusMsgCount = MAX_MSG;

  constructor() {
    this.formModel = new FormGroup({
      msg: new FormControl('', Validators.maxLength(140))
    })
    this.formModel.get('msg').valueChanges.subscribe(msg => {
      // console.log('WyLayerShareComponent - msg -', msg);
      this.surplusMsgCount = MAX_MSG - msg.length;
    })
  }

  ngOnInit() {
  }

  onSubmit() {
    console.log('share: ', this.formModel);
  }
}
