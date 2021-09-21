import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { playerReducer } from './reducers/player.reducer';
import { environment } from 'src/environments/environment';
import { memberReducer } from './reducers/member.reducer';

/**
 *  This module could be deleted, just import all these dependencies into AppModule.,
 *   but since this would be needed in multiple component, so this is a cleaner method
 */
@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forRoot({player: playerReducer, member: memberReducer}, {
      runtimeChecks: {
        strictStateImmutability: true,
        strictActionImmutability: true
      }
    }),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production })
  ]
})
export class AppStoreModule { }
