import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WyPlayerComponent } from './wy-player.component';
import { WySliderModule } from '../wy-slider/wy-slider.module';
import { FormatTimePipe } from '../../pipes/format-time.pipe';

@NgModule({
  declarations: [WyPlayerComponent, FormatTimePipe],
  imports: [
    CommonModule,
    FormsModule,
    WySliderModule,
  ],
  exports: [
    WyPlayerComponent,
    FormatTimePipe
  ]
})
export class WyPlayerModule { }
