import { Observable } from 'rxjs/internal/Observable';
import { distinctUntilChanged, filter, map, merge, mergeAll, pluck, takeUntil } from 'rxjs/internal/operators';
import { Component, ElementRef, Inject, Input, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { fromEvent } from 'rxjs/internal/observable/fromEvent';
import { tap } from 'rxjs/internal/operators/tap';
import { DOCUMENT } from '@angular/common';

import { SliderEventObserverConfig } from './wy-slider-types';
import { sliderEvent } from './wy-slider-helper';

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
  private dragStart$: Observable<number>;
  private dragMove$: Observable<number>;
  private dragEnd$: Observable<Event>;

  constructor(@Inject(DOCUMENT) private doc: Document) {}

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

    const mouse: SliderEventObserverConfig = {
      start: "mousedown",
      move: "mousemove",
      end: "mouseup",
      filter: (e: MouseEvent) => e instanceof MouseEvent,
      pluckKey: [orientField],
    };

    const touch: SliderEventObserverConfig = {
      start: "touchstart",
      move: "touchmove",
      end: "touchend",
      filter: (e: TouchEvent) => e instanceof TouchEvent,
      pluckKey: ['touchs','0',orientField]
    };

    [mouse, touch].forEach(source => {
      const {start, move, end, filter: filterUnc, pluckKey} = source;
      
      source.startPlucked$ = fromEvent(this.sliderDom, start)
        .pipe(
          filter(filterUnc),  // filter whether mouse or touch
          tap( sliderEvent ),
          pluck(...pluckKey),  // obtain the position, after this step, the position data should be obtained,
          map( (position: number) => this.findClosestValue(position))
      );
      
      /**
       *  @DOCUMENT is better for rendering than @docment
       */
      // source.end$ = fromEvent(document, end);
      source.end$ = fromEvent(this.doc, end);  

      source.moveResolved$ = fromEvent(this.doc, move)
          .pipe(
            filter(filterUnc),  // filter whether mouse or touch
            tap(sliderEvent),
            pluck(...pluckKey),  // obtain the position, after this step, the position data should be obtained,
            distinctUntilChanged(),// above pluck flow value changes, then here continue to emit flow, no change then stop 
            map( (position: number) => this.findClosestValue(position)),
            takeUntil(source.end$) // when the end then the flow also ends
          )
    });

    this.dragStart$ = (mouse.startPlucked$, touch.startPlucked$);
    this.dragMove$ = (mouse.moveResolved$, touch.moveResolved$);
    this.dragEnd$ = (mouse.end$, touch.end$);
  }

  private findClosestValue(position) {
     return null;
  }

}
