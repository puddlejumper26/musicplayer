import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { ShareInfo } from 'src/app/store/reducers/member.reducer';

@Component({
  selector: 'app-wy-layer-share',
  templateUrl: './wy-layer-share.component.html',
  styleUrls: ['./wy-layer-share.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WyLayerShareComponent implements OnInit {
  @Input() shareInfo: ShareInfo;

  formModel: FormGroup

  constructor() {
    this.formModel = new FormGroup({
      msg: new FormControl('', Validators.maxLength(140))
    })
  }

  ngOnInit() {
  }

  onSubmit() {
    console.log('share: ', this.formModel);
  }
}
