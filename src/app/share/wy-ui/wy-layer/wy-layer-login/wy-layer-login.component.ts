import { Component, OnInit, ChangeDetectionStrategy, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

export type LoginParams = {
  phone: string;
  password: string;
  remember: boolean;
}

@Component({
  selector: 'app-wy-layer-login',
  templateUrl: './wy-layer-login.component.html',
  styleUrls: ['./wy-layer-login.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WyLayerLoginComponent implements OnInit {

  @Output() onChangeModalType = new EventEmitter<string | void>();
  @Output() onLogin = new EventEmitter<LoginParams>();

  formModel: FormGroup;

  constructor(
    private fb: FormBuilder
  ) {
    this.formModel = this.fb.group({
      phone: ['15079010174', [Validators.required, Validators.pattern(/^1\d{10}$/)]],
      password: ['LYC6809915TC', [Validators.required, Validators.minLength(6)]],
      remember: [false],
    })
  }

  ngOnInit() {
  }

  onSubmit() {
    // console.log('WyLayerLoginComponent - onSubmit - this.formModel.value -', this.formModel.value);
    this.onLogin.emit(this.formModel.value)
  }

}
