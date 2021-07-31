import { Observable } from 'rxjs/internal/Observable';
import { distinctUntilChanged, filter, map, pluck, takeUntil } from 'rxjs/internal/operators';
import { Component, ElementRef, Inject, Input, OnInit, ViewChild, ViewEncapsulation, ChangeDetectionStrategy, ChangeDetectorRef, OnDestroy, forwardRef } from '@angular/core';
import { concat, Subscription } from 'rxjs';
import { fromEvent } from 'rxjs/internal/observable/fromEvent';
import { tap } from 'rxjs/internal/operators/tap';
import { DOCUMENT } from '@angular/common';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

import { SliderEventObserverConfig, SliderValue } from './wy-slider-types';
import { getElementOffset, sliderEvent } from './wy-slider-helper';
import { inArray } from 'src/app/utils/array';
import { getPercent, limitNumberInRange } from 'src/app/utils/number';

@Component({
  selector: 'app-wy-slider',
  templateUrl: './wy-slider.component.html',
  styleUrls: ['./wy-slider.component.less'],
  // to make the children component could use the styling file in this level
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [{
    provide: NG_VALUE_ACCESSOR, // applied with ControlValueAccessor
    useExisting: forwardRef(() => WySliderComponent), // to allow to use an Class not defined yet, will be defined in the following
    multi: true, // has multiple dependencies
  }]
})
export class WySliderComponent implements OnInit, OnDestroy, ControlValueAccessor {
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
  @Input() bufferOffset: SliderValue = 0;

  private sliderDom: HTMLDivElement;
  private isDragging = false;

  private dragStart$: Observable<number>;
  private dragMove$: Observable<number>;
  private dragEnd$: Observable<Event>;

  private dragStart_: Subscription | null;
  private dragMove_: Subscription | null;
  private dragEnd_: Subscription | null;

  value: SliderValue = null;
  offset: SliderValue = null;

  constructor(
    @Inject(DOCUMENT) private doc: Document,
    private cdr: ChangeDetectorRef
    ) {}

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
      // Deconstruction of JSON data
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

    // console.log('【createDraggingObservables】- mouse.startPlucked$ -', mouse.startPlucked$)
    // binding these three observable events
    this.dragStart$ = concat(mouse.startPlucked$, touch.startPlucked$);
    this.dragMove$ = concat(mouse.moveResolved$, touch.moveResolved$);
    this.dragEnd$ = concat(mouse.end$, touch.end$);
  }


  // string[] in order to subscribe multiple events
  /**
   * @bind https://www.jianshu.com/p/ee175cade48b
   */
  private subscribeDrag(events: string[] = ['start', 'move', 'end']) {
    if(inArray(events, 'start') && this.dragStart$ && !this.dragStart_) {
      // console.log('【subscribeDrag】 - this', this);
      // console.log('【subscribeDrag】 - dragStart$', this.dragStart$);
      this.dragStart_ = this.dragStart$.subscribe(this.onDragStart.bind(this));
    }
    if(inArray(events,'move') && this.dragMove$ && !this.dragMove_) {
      this.dragMove_ = this.dragMove$.subscribe(this.onDragMove.bind(this));
    }
    if(inArray(events,'end') && this.dragEnd$ && !this.dragEnd_) {
      this.dragEnd_ = this.dragEnd$.subscribe(this.onDragEnd.bind(this));
    }
  }

  private unsubscribeDrag(events: string[] = ['start', 'move', 'end']) {
    if(inArray(events, 'start') && this.dragStart_) {
      this.dragStart_.unsubscribe();
      this.dragStart_ = null;
    }
    if(inArray(events,'move') && this.dragMove_) {
      this.dragMove_.unsubscribe();
      this.dragMove_ = null;
    }
    if(inArray(events,'end') && this.dragEnd_) {
      this.dragEnd_.unsubscribe();
      this.dragEnd_ = null;
    }
  }

  // @value the position when mouse is pressed
  private onDragStart(value: number) {
    this.toggleDragMoving(true);
    this.setValue(value);
  }
  private onDragMove(value: number) {
    if(this.subscribeDrag) {
      this.setValue(value);
      this.cdr.markForCheck();
    }
  }
  private onDragEnd() {
    this.toggleDragMoving(false);
    this.cdr.markForCheck();
  }

  private toggleDragMoving(movable: boolean) {
    this.isDragging = movable;
    if(movable) {
      this.subscribeDrag(['move', 'end']);
    } else {
      this.unsubscribeDrag(['move', 'end']);
    }
  }

  private setValue(value: SliderValue, needCheck = false) {
    if(needCheck) {
      if(this.isDragging) return; // if the handle is dragging, just return
      this.value = this.formatValue(value);
      this.updateTrackAndHandles();
    }else if(!this.valueEuqal(this.value, value)) {  // During the dragging, the new value could be the same as the current value
      this.value = value;
      this.updateTrackAndHandles();
      console.log('setValue - this.value', this.value);
      this.onValueChange(this.value);
    }
  }

  private formatValue(value: SliderValue): SliderValue {
    let res = value;
    if(this.assertValueValid(value)){
      res = this.wyMin;
    }else {
      res = limitNumberInRange(value, this.wyMin, this.wyMax);
    }
    return res;
  }

  // Whether the input value is NaN
  private assertValueValid(value: SliderValue): boolean {
    return isNaN(typeof value !== 'number' ? parseFloat(value) : value)
  }

  private valueEuqal(valA: SliderValue, valB: SliderValue): boolean {
    if(typeof valA !== typeof valB) {
      return false;
    }
    return valA === valB
  }
  // update the position of the track render and handles
  private updateTrackAndHandles() {
    this.offset = this.getValueToOffset(this.value);
    this.cdr.markForCheck();
  }

  private getValueToOffset(value: SliderValue): SliderValue {
    // console.log('getValueToOffset - value -', value);
    return getPercent(this.wyMin, this.wyMax, value);
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

    // slider current position / slider component total length = (val - min) / (max - min)
    // val = ratio * (max - min) + min
    const ratio = limitNumberInRange((position - sliderStart) / sliderLength, 0, 1);
    const ratioTrue = this.wyVertical ? 1 - ratio : ratio;

    return ratioTrue * (this.wyMax - this.wyMin) + this.wyMin;
  }

  private getSliderLength(): number {
    return this.wyVertical ? this.sliderDom.clientHeight : this.sliderDom.clientWidth;
  }

  private getSliderStartPosition(): number {
    const offset = getElementOffset(this.sliderDom);
    return this.wyVertical ? offset.top : offset.left ;
  }

  private onValueChange(value: SliderValue): void {};
  private onTouched(): void {};

  /**
   *  @ControlValueAccessor and @NG_VALUE_ACCESSOR
   */

  /*
   * read and set value , value here are passed from outside, so need to add value check (needCheck) inside setValue()
   * therefore when there is a value changed inside playerComponent, and binded through <app-wy-slider> inside of playerComponent.html, then here would receive this value
   */
  writeValue(value: SliderValue): void {
    this.setValue(value, true);
  }
  registerOnChange(fn: (value: SliderValue) => void): void {
    this.onValueChange = fn;
  }
  registerOnTouched(fn: () => void): void {
    this.onTouched = fn
  }

  ngOnDestroy(): void {
    this.unsubscribeDrag();
  }
}



/*************************************************************
 *
 * ***********************************************************
 */

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
