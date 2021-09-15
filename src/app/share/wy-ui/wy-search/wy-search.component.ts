import { Component, ElementRef, Input, OnInit, TemplateRef, AfterViewInit, ViewChild } from '@angular/core';
import { fromEvent } from 'rxjs';
import { pluck } from 'rxjs/internal/operators/pluck';

@Component({
  selector: 'app-wy-search',
  templateUrl: './wy-search.component.html',
  styleUrls: ['./wy-search.component.less']
})
export class WySearchComponent implements OnInit, AfterViewInit {

  @Input() customView: TemplateRef<any>;
  @ViewChild('nzInput', {static: false}) private nzInput: ElementRef;

  constructor() { }

  ngAfterViewInit(): void {
    console.log('WySearchComponent - ngAfterViewInit - nzInput - ', this.nzInput.nativeElement);
    fromEvent(this.nzInput.nativeElement, 'input').pipe(pluck('target', 'value'))
      .subscribe(res => {
        console.log('WySearchComponent - ngAfterViewInit - res -', res)
      })
  }

  ngOnInit() {
  }

}
