import { Component, ElementRef, Input, OnInit, TemplateRef, AfterViewInit, ViewChild, Output, EventEmitter, OnChanges, SimpleChanges, ViewContainerRef } from '@angular/core';
import { fromEvent } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/internal/operators';
import { pluck } from 'rxjs/internal/operators/pluck';
import { Overlay, OverlayRef } from '@angular/cdk/overlay';
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
  @ViewChild('search', {static: false}) private defaultRef: ElementRef;

  private overlayRef: OverlayRef;

  constructor(
    private overlay: Overlay,
    private viewContainerRef: ViewContainerRef
  ) { }

  ngOnChanges(changes: SimpleChanges): void {
    if(changes['searchResult'] && !changes['searchResult'].firstChange){
      if(!isEmptyObject(this.searchResult)){
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
    if(this.overlayRef && this.overlayRef.hasAttached){
      this.overlayRef.dispose();
    }
  }

  private showOverlayPanel() {
    this.hideOverlayPanel();

    const positionStrategy = this.overlay
                              .position()
                              .flexibleConnectedTo(this.defaultRef)
                              .withPositions([{
                                originX: 'start', // attach host bottom left
                                originY: 'bottom', // attach host bottom left
                                overlayX: 'start', // attach ele top left
                                overlayY: 'top' // attach ele top left
                              }])
                              .withLockedPosition(true);

    this.overlayRef = this.overlay.create({
      // hasBackdrop: true, // create a layer when overlay exists, for control click then hide
      positionStrategy,
      scrollStrategy: this.overlay.scrollStrategies.reposition(), //needs to use with withLockedPosition()
    });

    const panelProtal = new ComponentPortal(WySearchPanelComponent, this.viewContainerRef);
    const panelRef = this.overlayRef.attach(panelProtal);
    // console.log('WySearchComponent - showOverlayPanel - panelRef - ', panelRef);
    panelRef.instance.searchResult = this.searchResult;
    // console.log('WySearchComponent - showOverlayPanel - panelRef.instance.searchResult', panelRef.instance.searchResult);

    // check whether the extra layer is clicked
    this.overlayRef.backdropClick().subscribe(() => {
      // console.log('Overlay outside clicked');
      this.hideOverlayPanel()
    })
  }

  onBlur() {
    this.hideOverlayPanel();
  }

  // after clicked outside layer, overlay closed, re-focus the input, should show overlay again
  onFocus() {
    if(this.searchResult && !isEmptyObject(this.searchResult)) {
      this.showOverlayPanel();
    }
  }
}
