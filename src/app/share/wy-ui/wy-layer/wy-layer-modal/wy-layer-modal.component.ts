import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Store, select } from '@ngrx/store';

import { AppStoreModule } from 'src/app/store';
import { getMember, getModalVisible, getModalType } from './../../../../store/selectors/member.selector';

@Component({
  selector: 'app-wy-layer-modal',
  templateUrl: './wy-layer-modal.component.html',
  styleUrls: ['./wy-layer-modal.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WyLayerModalComponent implements OnInit {

  constructor(
    private store$: Store<AppStoreModule>
  ) {
    const appStore$ = this.store$.pipe(select(getMember));
    appStore$.pipe(select(getModalVisible)).subscribe(visib => {
      console.log('WyLayerModalComponent - constructore - visib - ', visib);
    });
    appStore$.pipe(select(getModalType)).subscribe(type => {
      console.log('WyLayerModalComponent - constructore - type - ', type);
    })
  }

  ngOnInit() {
  }

}
