import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd';
import { interval } from 'rxjs';
import { take } from 'rxjs/internal/operators';

import { MemberService } from 'src/app/services/member.service';

@Component({
  selector: 'app-wy-layer-register',
  templateUrl: './wy-layer-register.component.html',
  styleUrls: ['./wy-layer-register.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WyLayerRegisterComponent implements OnInit {

  @Input() visible = false;
  @Output() onChangeModalType = new EventEmitter<string | void>();

  showCode = false;
  formModel: FormGroup;
  timing: number;
  codePass = false;

  constructor(
    private fb: FormBuilder,
    private memberServe: MemberService,
    private messageServe: NzMessageService) {
    this.formModel = this.fb.group({
      phone: ['', [Validators.required, Validators.pattern(/^1\d{10}$/)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    })
  }

  ngOnInit() {
  }

  onSubmit() {
    // console.log('WyLayerRegisterComponent - onSubmit - ', this.formModel);
    if(this.formModel.valid) {
      this.sendCode();
    }
  }

  sendCode() {
    this.memberServe.sendCode(this.formModel.get('phone').value).subscribe(() => {
      this.timing = 60;
      if(!this.showCode) {
        this.showCode = true;
      }
      interval(1000).pipe(take(60)).subscribe(() => this.timing--);
    }, error => {
      this.messageServe.error(error.message)
    }
  )}

  changeType() {
    this.onChangeModalType.emit('default');
    this.showCode = false;
    this.formModel.reset();
  }

  onCheckCode(code: string) {
    this.memberServe.checkCode(this.formModel.get('phone').value, Number(code))
      .subscribe(
        () => this.codePass = true,
        () => this.codePass = false
      )
  }
}
