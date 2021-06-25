import { Component, Input, OnChanges, OnInit, SimpleChange, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-wy-slider-handle',
  template: `<div class="wy-slider-handle" [ngStyle]="style"></div>`,
})
export class WySliderHandleComponent implements OnInit, OnChanges {

  @Input() wyVertical = false;
  @Input() wyOffset: number;

  style = {};

  constructor() { }
  
  ngOnInit() {
  }
  
  /**
   *  If the slider is for volumn, then -> vertical -> bottom value will move it
   *  If the slider is for song playing, then -> horizontal -> left value will move it
   */
  ngOnChanges(changes: SimpleChanges): void {
    if(changes['wyOffset']) {
      this.style[ this.wyVertical ? 'bottom' : 'left' ] = this.wyOffset + '%';
    }  }

}
