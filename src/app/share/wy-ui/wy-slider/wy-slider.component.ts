import { Observable } from 'rxjs/internal/Observable';
import { distinctUntilChanged, filter, map, merge, mergeAll, pluck, takeUntil } from 'rxjs/internal/operators';
import { Component, ElementRef, Inject, Input, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { fromEvent } from 'rxjs/internal/observable/fromEvent';
import { tap } from 'rxjs/internal/operators/tap';
import { DOCUMENT } from '@angular/common';

import { SliderEventObserverConfig } from './wy-slider-types';
import { getElementOffset, sliderEvent } from './wy-slider-helper';
import { inArray } from 'src/app/utils/array';

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
 *  @One constructor(private el: ElementRef){},  so in the noOnInit this.el.nativeElement is the dom of the slider 
 *  @Two with @ViewChild
 */
  // constructor(private el: ElementRef) { }

  @ViewChild('wySlider', {static: true}) private wySlider: ElementRef;
  @Input() wyVertical = false;  // cause we have one slider for song play, one slider for volumn
  @Input() wyMin = 0;
  @Input() wyMax = 100;
  
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
    this.subscribeDrag(['start']);
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
          tap( sliderEvent ), // tap(_ => console.log('executed')), not 
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

    // binding these three observable events
    this.dragStart$ = (mouse.startPlucked$, touch.startPlucked$);
    this.dragMove$ = (mouse.moveResolved$, touch.moveResolved$);
    this.dragEnd$ = (mouse.end$, touch.end$);
  }

  
  // string[] in order to subscribe multiple events
  /**
   * @bind https://www.jianshu.com/p/ee175cade48b
   */
  private subscribeDrag(events: string[] = ['start', 'move', 'end']) {
    if(inArray(events, 'start') && this.dragStart$) {
      this.dragStart$.subscribe(this.onDragStart.bind(this)); 
      console.log('subscribeDrag', this);
    }
    if(inArray(events,'move') && this.dragMove$) {
      this.dragMove$.subscribe(this.onDragMove.bind(this));
    }
    if(inArray(events,'end') && this.dragEnd$) {
      this.dragEnd$.subscribe(this.onDragEnd.bind(this));
    }
  }

  // @value the position when mouse is pressed
  private onDragStart(value: number) {

  }
  private onDragMove(value: number) {

  }
  private onDragEnd() {

  }

  /**
   *  to convert the distance that mouse moved to the value we need
   * 
   *  position / total length of slider[sliderLength] = (val - min) / (max - min)  ==> here we need to find out the val 
   */ 
  private findClosestValue(position: number): number {
    // obtain total length
    const sliderLength = this.getSliderLength();
    
    // obtain slider (left, up) position
    const sliderStart = this.getSliderStartPosition();

    return null;
  }

  private getSliderLength(): number {
    return this.wyVertical ? this.sliderDom.clientHeight : this.sliderDom.clientWidth;
  }

  private getSliderStartPosition(): number {
    const offset = getElementOffset(this.sliderDom);
    return this.wyVertical ? offset.top : offset.left ;    
  }
}





/**
@bind
this.x = 9;
var module = {
  x: 81,
  getX: function() { return this.x; }
};

module.getX(); // 81

var retrieveX = module.getX;  
retrieveX();  // 9  global scope

var boundGetX = retrieveX.bind(module);
boundGetX(); // 81 bind to use module inside data to replace the global scope
 
 */
