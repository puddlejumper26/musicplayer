import { Component, OnInit, ChangeDetectionStrategy, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-wy-layer-login',
  templateUrl: './wy-layer-login.component.html',
  styleUrls: ['./wy-layer-login.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WyLayerLoginComponent implements OnInit {

  @Output() onChangeModalType = new EventEmitter<string | void>();

  formModel: FormGroup;

  constructor(
    private fb: FormBuilder
  ) {
    this.formModel = this.fb.group({
      phone: ['aaaaa'],
      password: ['bbbbbbb'],
      remember: [false],
    })
  }

  ngOnInit() {
  }

  onSubmit() {
    console.log('WyLayerLoginComponent - onSubmit - this.formModel.value -', this.formModel.value);
  }

}
