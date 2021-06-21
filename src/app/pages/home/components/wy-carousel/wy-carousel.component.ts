import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output, TemplateRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-wy-carousel',
  templateUrl: './wy-carousel.component.html',
  styleUrls: ['./wy-carousel.component.less'],
/**
 * @OnPush means it will check the status of this component when the input changes
 */
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WyCarouselComponent implements OnInit {
  /**
   *  @static to check whether in the template it is active or not, if there is a @ngIf in the template, then here should be false
   */
  @ViewChild('dot', {static: true}) dotRef: TemplateRef<any>;

  /**
   *  @Input to receive data from parent
   *  @Output with @EventEmitter to send data to parent, notice the EventEmitter is from @angular/core
   */
  @Input() activeIndex = 0;
  @Output() changeSlide = new EventEmitter<'pre' | 'next'>();

  constructor() { }

  ngOnInit() {
  }

  onChangeSlide(type: 'pre' | 'next') {
    this.changeSlide.emit(type);
  }

}
