import { Component, OnInit, ChangeDetectionStrategy, Output, EventEmitter, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { codeJson } from 'src/app/utils/base64';

export type LoginParams = {
  phone: string;
  password: string;
  remember: boolean;
}

const defaultLoginParams: LoginParams = {
  phone: '',
  password: '',
  remember: false,
}

@Component({
  selector: 'app-wy-layer-login',
  templateUrl: './wy-layer-login.component.html',
  styleUrls: ['./wy-layer-login.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WyLayerLoginComponent implements OnInit, OnChanges {
  @Input() wyRememberLogin: LoginParams;
  @Input() visible = false;
  @Output() onChangeModalType = new EventEmitter<string | void>();
  @Output() onLogin = new EventEmitter<LoginParams>();

  formModel: FormGroup;

  constructor(
    private fb: FormBuilder
  ) {
    this.setModel(defaultLoginParams);
  }

  ngOnChanges(changes: SimpleChanges) {
    const userLoginParams = changes['wyRememberLogin'];
    const visible = changes['visible'];
    if(userLoginParams) {
      let phone = '';
      let password = '';
      let remember = false;

      if(userLoginParams.currentValue) {
        const value = codeJson(userLoginParams.currentValue, 'decode');
        phone = value.phone;
        password = value.password;
        remember = value.remember;
      }
      this.setModel({phone, password, remember});
    }

    if(visible && !visible.firstChange) {
      this.formModel.markAllAsTouched();
    }
  }

  private setModel({phone, password, remember}) {
    this.formModel = this.fb.group({
      phone: [phone, [Validators.required, Validators.pattern(/^1\d{10}$/)]],
      password: [password, [Validators.required, Validators.minLength(6)]],
      remember: [remember],
    })
  }

  ngOnInit() {
  }

  onSubmit() {
    // console.log('WyLayerLoginComponent - onSubmit - this.formModel.value -', this.formModel.value);
    this.onLogin.emit(this.formModel.value)
  }

}
