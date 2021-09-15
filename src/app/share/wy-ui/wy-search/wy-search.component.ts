import { Component, ElementRef, Input, OnInit, TemplateRef, AfterViewInit, ViewChild } from '@angular/core';

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
    console.log('WySearchComponent - nzInput - ', this.nzInput.nativeElement);

  }

  ngOnInit() {
  }

}
