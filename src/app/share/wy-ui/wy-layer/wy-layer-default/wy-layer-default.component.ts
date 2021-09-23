import { Component, OnInit, ChangeDetectionStrategy, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-wy-layer-default',
  template: `
    <div class="cnzt">
      <div class="select-log">
        <div class="mid-wrap">
          <div class="pic">
            <img src="../../../../../assets/images/platform.png">
          </div>
          <div class="methods">
            <button nz-button nzType="primary" nzSize="large" nzBlock (click)="onChangeModalType.emit('loginByPhone')">Mobile to Register</button>
            <button nz-button nzType="primary" nzSize="large" nzBlock (click)="onChangeModalType.emit('register')">Register</button>
          </div>
        </div>
      </div>
    </div>

  `,
  styleUrls: ['./wy-layer-default.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WyLayerDefaultComponent implements OnInit {

  @Output() onChangeModalType = new EventEmitter<string | void>();

  constructor() { }

  ngOnInit() {
  }

}
