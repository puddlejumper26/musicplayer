import { Component, OnInit, ChangeDetectionStrategy, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

const CODELEN = 4;

@Component({
  selector: 'app-wy-code',
  templateUrl: './wy-code.component.html',
  styleUrls: ['./wy-code.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [{
    provide: NG_VALUE_ACCESSOR, // applied with ControlValueAccessor
    useExisting: forwardRef(() => WyCodeComponent), // to allow to use an Class not defined yet, will be defined in the following
    multi: true, // has multiple dependencies
  }]
})
export class WyCodeComponent implements OnInit, ControlValueAccessor {

  inputArr = [];

  private code: string;

  constructor() {
    this.inputArr = Array(CODELEN).fill('');
  }

  private setValue(code: string) {
    this.code = code;
  }

  private onValueChange(value: string): void {};
  private onTouched(): void {};

  // from outside template to obtain the value, should be like '2312' 4 digits, but string
  writeValue(code: string): void {
    this.setValue(code);
  }
  registerOnChange(fn: (value: string) => void): void {
    this.onValueChange = fn;
  }
  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  ngOnInit() {
  }

}
