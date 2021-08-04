import { Component, OnInit, ViewEncapsulation, ChangeDetectionStrategy, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import BScroll from '@better-scroll/core';

@Component({
  selector: 'app-wy-scroll',
  template: `
    <div class="wy-scroll" #wrap>
      <ng-content></ng-content>
    </div>
  `,
  styles: [`.wy-scroll{width: 100%; height: 100%; overflow: hidden}`],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WyScrollComponent implements OnInit, AfterViewInit {

  private bs: BScroll;

  @ViewChild('wrap', { static: true}) private wrapRef: ElementRef;

  constructor() { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    // init
    this.bs = new BScroll(this.wrapRef.nativeElement);
  }
}
