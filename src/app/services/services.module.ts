import { isPlatformBrowser } from '@angular/common';
import { InjectionToken, NgModule, PLATFORM_ID } from '@angular/core';

export const API_CONFIG = new InjectionToken('ApiConfigToken');
export const WINDOW = new InjectionToken('WindowToken');

/**
 * manage all the services
 */
@NgModule({
  declarations: [],
  imports: [
  ],
  providers: [
    { provide: API_CONFIG, useValue:'http://localhost:3000/'},
    {
      provide: WINDOW,
      useFactory(platformId: Object): Window | Object {
        // whether it is a browser environment
        return isPlatformBrowser(platformId) ? window : {};
      },
      //dependency , PLATFORM_ID is constant, whether the platform is server end or user end
      deps: [PLATFORM_ID]
    }
  ]
})
export class ServicesModule { }
