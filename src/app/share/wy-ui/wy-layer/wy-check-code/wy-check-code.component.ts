import { Component, OnInit, ChangeDetectionStrategy, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-wy-check-code',
  templateUrl: './wy-check-code.component.html',
  styleUrls: ['./wy-check-code.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WyCheckCodeComponent implements OnInit, OnChanges {

  private phoneHideStr = '';

  @Input() timing : number;
  @Input() codePass = false;
  @Input()
  set phone(phone: string) {
    const arr = phone.split('');
    arr.splice(3, 4, '****');
    this.phoneHideStr = arr.join('');
  }
  get phone() {
    return this.phoneHideStr;
  }

  @Output() onCheckCode = new EventEmitter<string>();

  formModel: FormGroup;

  constructor() {
    this.formModel = new FormGroup({
      code: new FormControl('', [Validators.required, Validators.pattern(/\d{4}/)])
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(changes['timing']) {

    }
  }

  ngOnInit() {
  }

  onSubmit() {
    if(this.formModel.valid) {
      this.onCheckCode.emit(this.formModel.value.code);
    }
  }


}
