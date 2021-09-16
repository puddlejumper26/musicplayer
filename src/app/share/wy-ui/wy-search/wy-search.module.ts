import { WySearchComponent } from './wy-search.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzIconModule, NzInputModule } from 'ng-zorro-antd';
import { OverlayModule } from '@angular/cdk/overlay';

import { WySearchPanelComponent } from './wy-search-panel/wy-search-panel.component';


@NgModule({
  declarations: [
    WySearchComponent,
    WySearchPanelComponent
  ],
  entryComponents: [WySearchPanelComponent], //https://material.angular.io/cdk/portal/overview#componentportal
  imports: [
    CommonModule,
    NzInputModule,
    NzIconModule,
    OverlayModule,
  ],
  exports: [
    WySearchComponent
  ]
})
export class WySearchModule { }
