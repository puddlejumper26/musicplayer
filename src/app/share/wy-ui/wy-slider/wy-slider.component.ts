import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-wy-slider',
  templateUrl: './wy-slider.component.html',
  styleUrls: ['./wy-slider.component.less'],
  // to make the children component could use the styling file in this level
  encapsulation: ViewEncapsulation.None,
})
export class WySliderComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
