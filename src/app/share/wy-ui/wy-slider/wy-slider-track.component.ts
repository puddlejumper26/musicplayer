import { WySliderStyle } from './wy-slider-types';
import { ChangeDetectionStrategy, Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-wy-slider-track',
  template: `<div class="wy-slider-track" [class.buffer]="wyBuffer" [ngStyle]="style"></div>`,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WySliderTrackComponent implements OnInit, OnChanges {

  @Input() wyVertical = false;
  @Input() wyLength: number;
  @Input() wyBuffer = false;

  style: WySliderStyle = {};

  constructor() { }
  
  ngOnInit() {
  }
  
  /**
   *  If the slider is for volumn, then -> vertical -> height value is its length
   *  If the slider is for song playing, then -> horizontal -> width value is its length
  */
  ngOnChanges(changes: SimpleChanges): void {
    if(changes['wyLength']) {
      if(this.wyVertical) {
        this.style.height = this.wyLength + '%';
        this.style.left = null;   // just to avoid bug
        this.style.width = null;
      }else {
        this.style.width = this.wyLength + '%';
        this.style.bottom = null;
        this.style.height = null;
      }
    }
  }
}
