import { Component, ElementRef, Input, OnInit, TemplateRef, AfterViewInit, ViewChild, Output, EventEmitter, OnChanges, SimpleChanges, ViewContainerRef } from '@angular/core';
import { fromEvent } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/internal/operators';
import { pluck } from 'rxjs/internal/operators/pluck';
import { Overlay } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';

import { SearchResult } from 'src/app/services/data-types/common.types';
import { isEmptyObject } from 'src/app/utils/tool';
import { WySearchPanelComponent } from './wy-search-panel/wy-search-panel.component';

@Component({
  selector: 'app-wy-search',
  templateUrl: './wy-search.component.html',
  styleUrls: ['./wy-search.component.less']
})
export class WySearchComponent implements OnInit, AfterViewInit, OnChanges {

  @Input() customView: TemplateRef<any>;
  @Input() searchResult: SearchResult;
  @Output() onSearch = new EventEmitter<string>();
  @ViewChild('nzInput', {static: false}) private nzInput: ElementRef;

  constructor(
    private overlay: Overlay,
    private viewContainerRef: ViewContainerRef
  ) { }

  ngOnChanges(changes: SimpleChanges): void {
    if(changes['searchResult'] && !changes['searchResult'].firstChange){
      if(isEmptyObject(this.searchResult)){
        this.hideOverlayPanel();
      }else {
        this.showOverlayPanel();
      }
    };
  }

  ngAfterViewInit(): void {
    // console.log('WySearchComponent - ngAfterViewInit - nzInput - ', this.nzInput.nativeElement);
    fromEvent(this.nzInput.nativeElement, 'input')
      .pipe(
        debounceTime(300), // request frequency less than 300 would be ignored
        distinctUntilChanged(), // same resulte would trigger once
        pluck('target', 'value'))
      .subscribe((value: string) => {
        // console.log('WySearchComponent - ngAfterViewInit - value -', value);
        this.onSearch.emit(value);
      })
  }

  ngOnInit() {
  }

  private hideOverlayPanel() {

  }

  private showOverlayPanel() {
    const overlayRef = this.overlay.create();
    const panelProtal = new ComponentPortal(WySearchPanelComponent, this.viewContainerRef);
    const panelRef = overlayRef.attach(panelProtal);
  }

}
