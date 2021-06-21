import { WyUiModule } from './wy-ui/wy-ui.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { FormsModule } from '@angular/forms';


/**
 *  store all the project global components and services, therefore it needs to be exported
 */
@NgModule({
  declarations: [],
  imports: [
    NgZorroAntdModule,
    FormsModule,
    CommonModule,
    WyUiModule,
  ],
  exports: [
    CommonModule,
    NgZorroAntdModule,
    FormsModule,
    WyUiModule
  ]
})
export class ShareModule { }
