import { Component, OnInit, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-wy-check-code',
  templateUrl: './wy-check-code.component.html',
  styleUrls: ['./wy-check-code.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WyCheckCodeComponent implements OnInit {

  private phoneHideStr = '';

  @Input() phone;

  formModel: FormGroup;

  constructor() {
    this.formModel = new FormGroup({
      code: new FormControl('', [Validators.required, Validators.pattern(/\d{4}/)])
    });
  }

  ngOnInit() {
  }

  onSubmit() {

  }

}
