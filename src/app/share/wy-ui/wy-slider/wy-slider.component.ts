import { map, pluck } from 'rxjs/internal/operators';
import { Component, ElementRef, Input, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { fromEvent } from 'rxjs/internal/observable/fromEvent';
import { tap } from 'rxjs/internal/operators/tap';

@Component({
  selector: 'app-wy-slider',
  templateUrl: './wy-slider.component.html',
  styleUrls: ['./wy-slider.component.less'],
  // to make the children component could use the styling file in this level
  encapsulation: ViewEncapsulation.None,
})
export class WySliderComponent implements OnInit {
/**
 *  This slider will bind with many mouse events, so we need to obtain the @dom and there are several ways to do it
 * 
 *  @One private el: ElementRef,  so in the noOnInit this.el.nativeElement is the dom of the slider 
 *  @Two with @ViewChild
 */
  // constructor(private el: ElementRef) { }

  @ViewChild('wySlider', {static: true}) private wySlider: ElementRef;
  @Input() wyVertical = false;  // cause we have one slider for song play, one slider for volumn
  private sliderDom: HTMLDivElement;

  constructor() {}

  ngOnInit() {
    // console.log('el:', this.el.nativeElement);
    // console.log('wySlider', this.wySlider.nativeElement);
    this.sliderDom = this.wySlider.nativeElement;
    this.createDraggingObservables();
  }

  /**
   *  @Event we need to bind the following event
   *  @PC mousedown mouseup mousemove   -> @MouseEvent  -> obtain position  | event.pageX | event.pageY
   *  @mobile touchstart touchmove touchend -> @TouchEvent -> obtain position   | event.touchs[0].pageX  | event.touchs[0].pageY
   */
  private createDraggingObservables() {
    const orientField = this.wyVertical ? 'pageY' : 'pageX';

    const mouse = {
      start: "mousedown",
      move: "mousemove",
      end: "mouseup",
      filter: (e: MouseEvent) => e instanceof MouseEvent,
      pluckKey: [orientField],
    }

    const touch = {
      start: "touchstart",
      move: "touchmove",
      end: "touchend",
      filter: (e: TouchEvent) => e instanceof TouchEvent,
      pluckKey: ['touchs','0',orientField]
    }

    [mouse, touch].forEach(source => {
      const {start, move, end, filter, pluckKey} = source;
      fromEvent(this.sliderDom, start)
        .pipe(
          filter(filter),  // filter whether mouse or touch
          tap( (e: Event)=> {
            e.stopPropagation();
            e.preventDefault();
          }),
          pluck(...pluckKey),  // obtain the position, after this step, the position data should be obtained,
          map( (position: Number) => this.findClosestValue(position))
        )
    });
  }

  private findClosestValue() {
    
  }

}
