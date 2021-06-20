import { ChangeDetectionStrategy, Component, Input, OnInit, TemplateRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-wy-carousel',
  templateUrl: './wy-carousel.component.html',
  styleUrls: ['./wy-carousel.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WyCarouselComponent implements OnInit {
  /**
   *  @static to check whether in the template it is active or not, if there is a @ngIf in the template, then here should be false
   */
  @ViewChild('dot', {static: true}) dotRef: TemplateRef<any>;

  @Input() activeIndex = 0;

  constructor() { }

  ngOnInit() {
  }

}
