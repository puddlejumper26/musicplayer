import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WySliderComponent } from './wy-slider.component';


@NgModule({
  declarations: [WySliderComponent],
  imports: [
    CommonModule
  ],
  exports: [WySliderComponent]
})
export class WySliderModule { }
