import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit, ChangeDetectionStrategy, Input, Output, EventEmitter, ChangeDetectorRef, OnChanges, SimpleChanges } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd';
import { interval } from 'rxjs';
import { take } from 'rxjs/internal/operators';

import { ModalTypes } from './../../../../store/reducers/member.reducer';
import { MemberService } from 'src/app/services/member.service';

enum Exist {
  'Exist' = 1,
  'Non-Exist' = -1
}

@Component({
  selector: 'app-wy-layer-register',
  templateUrl: './wy-layer-register.component.html',
  styleUrls: ['./wy-layer-register.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WyLayerRegisterComponent implements OnInit, OnChanges {

  @Input() visible = false;
  @Output() onChangeModalType = new EventEmitter<string | void>();
  @Output() onRegister = new EventEmitter<string>();

  showCode = false;
  formModel: FormGroup;
  timing: number;
  codePass: string | boolean = '';

  constructor(
    private fb: FormBuilder,
    private memberServe: MemberService,
    private cdr: ChangeDetectorRef,
    private messageServe: NzMessageService) {
    this.formModel = this.fb.group({
      phone: ['', [Validators.required, Validators.pattern(/^1\d{10}$/)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    })
  }

  ngOnChanges(changes: SimpleChanges): void {
    const visible = changes['visible'];
    if(visible && !visible.firstChange) {
      this.formModel.markAllAsTouched();
    }
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
      this.cdr.markForCheck();
      interval(1000).pipe(take(60)).subscribe(() => {
        this.timing--;
        this.cdr.markForCheck();
      });
    }, error => {
      this.messageServe.error(error.message)
    }
  )}

  changeType(type = ModalTypes.Default) {
    this.onChangeModalType.emit(type);
    this.showCode = false;
    this.formModel.reset();
  }

  onCheckCode(code: string) {
    this.memberServe.checkCode(this.formModel.get('phone').value, Number(code))
      .subscribe(
        // if the code verification failed, then codepass = false
        // no matter verification falied or not, always markForCheck()
        () => this.codePass = true,
        () => this.codePass = false,
        () => this.cdr.markForCheck()
      )
  }

  onCheckExist(phone: string) {
    this.memberServe.checkExist(Number(phone)).subscribe(res => {
      if(Exist[res] === 'Exist') {
        this.messageServe.error('Account Exists, please Login directly!');
        this.changeType(ModalTypes.LoginByPhone);
      } else {
        this.onRegister.emit(phone);
      }
    })
  }
}
