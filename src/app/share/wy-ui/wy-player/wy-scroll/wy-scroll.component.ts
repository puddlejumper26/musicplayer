import { Component, OnInit, ViewEncapsulation, ChangeDetectionStrategy, ViewChild, ElementRef, AfterViewInit, Input, OnChanges, SimpleChanges, Output, EventEmitter } from '@angular/core';
import BScroll from '@better-scroll/core';
import ScrollBar from '@better-scroll/scroll-bar';
BScroll.use(ScrollBar);
import MouseWheel from '@better-scroll/mouse-wheel'
BScroll.use(MouseWheel);

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
export class WyScrollComponent implements OnInit, AfterViewInit, OnChanges {

  private bs: BScroll;

  @Input() data: any[];
  @Input() refreshDelay = 50;
  @Output() onScrollEnd = new EventEmitter<number>();

  @ViewChild('wrap', { static: true}) private wrapRef: ElementRef;

  constructor(readonly el: ElementRef) { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    // without refresh, the after init this value is 0, so scroll would not work
    // console.log('ngAfterViewInit - this.wrapRef.nativeElement.offsetHeight -', this.wrapRef.nativeElement.offsetHeight);

    // init
    this.bs = new BScroll(this.wrapRef.nativeElement, {
      scrollbar: {
        interactive: true,
      },
      mouseWheel: {}
    });
    this.bs.on('scrollEnd', ({y}) => this.onScrollEnd.emit(y));
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(changes['data']) {
      this.refreshScroll();
    }
  }

  scrollToElement(...args) {
    this.bs.scrollToElement.apply(this.bs, args);
  }

  private refresh() {
    this.bs.refresh();
  }

 /**
  *  @ngOnChanges and @wyPlayerPanel - @ngOnChanges will call this refresh
  *  public refresh method, and refresh has to be after init, so need @setTimeout
  */
  refreshScroll() {
    setTimeout(() => {
      this.refresh();
    }, this.refreshDelay);
  }
}
