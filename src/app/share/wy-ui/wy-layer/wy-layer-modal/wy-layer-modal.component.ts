import { Overlay, OverlayRef, BlockScrollStrategy, OverlayKeyboardDispatcher } from '@angular/cdk/overlay';
import { DOCUMENT } from '@angular/common';
import { Component, OnInit, ChangeDetectionStrategy, ElementRef, ChangeDetectorRef, ViewChild, AfterViewInit, Renderer2, Inject } from '@angular/core';
import { Store, select } from '@ngrx/store';

import { WINDOW } from 'src/app/services/services.module';
import { AppStoreModule } from 'src/app/store';
import { BatchActionsService } from 'src/app/store/batch-actions.service';
import { ModalTypes } from 'src/app/store/reducers/member.reducer';
import { getMember, getModalVisible, getModalType } from './../../../../store/selectors/member.selector';

@Component({
  selector: 'app-wy-layer-modal',
  templateUrl: './wy-layer-modal.component.html',
  styleUrls: ['./wy-layer-modal.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WyLayerModalComponent implements OnInit, AfterViewInit {

  showModal = false;

  private visible = false;
  private currentModalType = ModalTypes.Default;
  private overlayRef: OverlayRef;
  private scrollStrategy: BlockScrollStrategy;
  private resizeHandler: () => void; // check the listen method its return to define the type here

  @ViewChild('modalContainer', { static: false }) private modalRef: ElementRef;

  constructor(
    @Inject(DOCUMENT) private doc: Document,
    @Inject(WINDOW) private win: Window,
    private store$: Store<AppStoreModule>,
    private overlay: Overlay,
    private elementRef: ElementRef,
    private overlayKeyboardDispatcher: OverlayKeyboardDispatcher,
    private cdr: ChangeDetectorRef,
    private batchActionsServe: BatchActionsService,
    private rd: Renderer2
  ) {
    const appStore$ = this.store$.pipe(select(getMember));
    appStore$.pipe(select(getModalVisible)).subscribe(visib => {
      console.log('WyLayerModalComponent - constructore - visib - ', visib);
      this.watchModalVisible(visib);
    });
    appStore$.pipe(select(getModalType)).subscribe(type => {
      // console.log('WyLayerModalComponent - constructore - type - ', type);
      this.watchModalType(type);
    });
    this.scrollStrategy = this.overlay.scrollStrategies.block();
  }

  ngAfterViewInit(): void {
    this.listenResizeToCenter();
  }

  private listenResizeToCenter() {
    const modal = this.modalRef.nativeElement;
    const modalSize = this.getHideDomSize(modal);
    // console.log('WyLayerModalComponent - modalSize -', modalSize);
    this.keepCenter(modal, modalSize)
    this.resizeHandler = this.rd.listen('window','resize', () => {
      this.keepCenter(modal, modalSize)
    })
  }

  private getHideDomSize(dom: HTMLElement) {
    // console.log('WyLayerModalComponent - getHideDomSize - dom -', dom);
    return {
      w: dom.offsetWidth,
      h: dom.offsetHeight
    }
  }

  private keepCenter(modal: HTMLElement, size: {w: number, h: number}) {
    const left = (this.getWindowSize().w - size.w) / 2;
    const top = (this.getWindowSize().h - size.h) / 2;
    modal.style.left = left + 'px';
    modal.style.top = top + 'px';
  }

  private getWindowSize() {
    return {
      // w: window.innerWidth || document.documentElement.clientWidth || document.body.offsetWidth,
      // h: window.innerHeight || document.documentElement.clientHeight || document.body.offsetHeight
      w: this.win.innerWidth || this.doc.documentElement.clientWidth || this.doc.body.offsetWidth,
      h: this.win.innerHeight || this.doc.documentElement.clientHeight || this.doc.body.offsetHeight
    }
  }

  ngOnInit() {
    this.createOverlay();
  }

  private createOverlay() {
    this.overlayRef = this.overlay.create();
    this.overlayRef.overlayElement.appendChild(this.elementRef.nativeElement);
    this.overlayRef.keydownEvents().subscribe(e => this.keydownListener(e));
  }

  private keydownListener(evt: KeyboardEvent){
    // console.log('WyLayerModalComponent - keydownListener - evt -', evt);
    if(evt.key === 'Escape'){
      this.hide();
    }
  }

  private watchModalVisible(visib: boolean) {
    if(this.visible !== visib){
      this.visible = visib;
      this.handleVisibleChange(visib);
    }
  }

  private watchModalType(type: ModalTypes) {
    if(this.currentModalType !== type){
      this.currentModalType = type;
    }
  }

  private handleVisibleChange(visib: boolean) {
    // console.log('WyLayerModalComponent - handleVisibleChange - visib -', visib)
    if(visib){
      this.showModal = true;
      this.scrollStrategy.enable();
      this.overlayKeyboardDispatcher.add(this.overlayRef);
      this.listenResizeToCenter();
    }else {
      this.showModal = false;
      this.scrollStrategy.disable();
      this.overlayKeyboardDispatcher.remove(this.overlayRef);
      this.resizeHandler(); // to remove the listener
    }
    this.cdr.markForCheck();
  }

  hide() {
    this.batchActionsServe.controlModal(false);
  }
}
