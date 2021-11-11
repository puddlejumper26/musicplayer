import { takeUntil } from 'rxjs/internal/operators';
import { Component, OnInit, ChangeDetectionStrategy, forwardRef, ViewChild, AfterViewInit, ElementRef, OnDestroy } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { fromEvent, Subject } from 'rxjs';

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
export class WyCodeComponent implements OnInit, ControlValueAccessor, AfterViewInit, OnDestroy {

  @ViewChild('codeWrap', { static: true }) private codeWrap: ElementRef;
  inputEl: HTMLElement[];

  inputArr = [];
  result: string[] = [];
  currentFocusIndex = 0;

  private code: string;
  private destory$ = new Subject();

  constructor() {
    this.inputArr = Array(CODELEN).fill('');
  }

  ngAfterViewInit(): void {
    this.inputEl = this.codeWrap.nativeElement.getElementsByClassName('item') as HTMLElement[];
    // console.log('-----> WyCodeComponent - ngAfterViewInit - this.inputEl - ', this.inputEl)
    // the first element to have focus automatically
    this.inputEl[0].focus();
    for(let a= 0; a < this.inputEl.length; a++) {
      const item = this.inputEl[a];
      fromEvent(item, 'keyup').pipe(takeUntil(this.destory$)).subscribe((event: KeyboardEvent) => this.listenKeyup(event));
      fromEvent(item, 'click').pipe(takeUntil(this.destory$)).subscribe(() => this.currentFocusIndex = a);
    }
  }

  private listenKeyup(event: KeyboardEvent) {
    const target = event.target as HTMLInputElement;
    const value = target.value;
    const isBackSpace = event.code === 'Backspace';
    if(/\D/.test(value)) {
      target.value = '';
      this.result[this.currentFocusIndex] = '';
    } else if(value) {
      this.result[this.currentFocusIndex] = value; // give the input value to current input
      this.currentFocusIndex = (this.currentFocusIndex + 1) % CODELEN; // jump to next input
      this.inputEl[this.currentFocusIndex].focus(); // re-focus
    }else if(isBackSpace) {
      this.result[this.currentFocusIndex] = '';
      this.currentFocusIndex = Math.max(this.currentFocusIndex - 1, 0);
      this.inputEl[this.currentFocusIndex].focus();
    }
    this.checkResult(this.result);
    // console.log('----->WyCodeComponent - listenKeyup - this.result - ', this.result);
  }

  private checkResult(result: string[]) {
    const codeStr = result.join('');
    this.setValue(codeStr);
  }

  private setValue(code: string) {
    this.code = code;
    // output the code
    this.onValueChange(code);
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

  ngOnDestroy(): void {
    this.destory$.next();
    this.destory$.complete();
  }

}
