import { WySearchComponent } from './wy-search.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzIconModule, NzInputModule } from 'ng-zorro-antd';


@NgModule({
  declarations: [
    WySearchComponent
  ],
  imports: [
    CommonModule,
    NzInputModule,
    NzIconModule
  ],
  exports: [
    WySearchComponent
  ]
})
export class WySearchModule { }
