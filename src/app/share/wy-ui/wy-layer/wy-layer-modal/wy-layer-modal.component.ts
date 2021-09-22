import { Overlay, OverlayRef, OverlayKeyboardDispatcher } from '@angular/cdk/overlay';
import { Component, OnInit, ChangeDetectionStrategy, ElementRef, ChangeDetectorRef } from '@angular/core';
import { Store, select } from '@ngrx/store';

import { AppStoreModule } from 'src/app/store';
import { ModalTypes } from 'src/app/store/reducers/member.reducer';
import { getMember, getModalVisible, getModalType } from './../../../../store/selectors/member.selector';

@Component({
  selector: 'app-wy-layer-modal',
  templateUrl: './wy-layer-modal.component.html',
  styleUrls: ['./wy-layer-modal.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WyLayerModalComponent implements OnInit {

  showModal = false;

  private visible = false;
  private currentModalType = ModalTypes.Default;
  private overlayRef: OverlayRef;

  constructor(
    private store$: Store<AppStoreModule>,
    private overlay: Overlay,
    private elementRef: ElementRef,
    private overlayKeyboardDispatcher: OverlayKeyboardDispatcher,
    private cdr: ChangeDetectorRef
  ) {
    const appStore$ = this.store$.pipe(select(getMember));
    appStore$.pipe(select(getModalVisible)).subscribe(visib => {
      console.log('WyLayerModalComponent - constructore - visib - ', visib);
      this.watchModalVisible(visib);
    });
    appStore$.pipe(select(getModalType)).subscribe(type => {
      // console.log('WyLayerModalComponent - constructore - type - ', type);
      this.watchModalType(type);
    })
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
      this.overlayKeyboardDispatcher.add(this.overlayRef);
    }else {
      this.showModal = false;
      this.overlayKeyboardDispatcher.remove(this.overlayRef);
    }
    this.cdr.markForCheck();
  }
}
