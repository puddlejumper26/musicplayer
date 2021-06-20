import { HomeService } from 'src/app/services/home.service';
import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from '../app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PagesModule } from '../pages/pages.module';
import { ShareModule } from '../share/share.module';
import { ServicesModule } from '../services/services.module';

/**
 *  To manage all the modules and component,  ONLY imported inside app.module.ts
 */
/**
 *    This module could only be installed in AppModule, therefore when it is imported into other modules, 
 *  an Error will be thrown.    
 * 
 *    Decorator 
 * 
 *    @SkipSelf() This is to make the exam will be only made in the parent module, thus the exam will not happen all the time
 *    @Optional() When the module first time injected, there is no CoreModule, therefore would throw an error, and here is used to 
 *                make when the CoreModule is not found, then give the parentModule a value of None  - > will not throw error
 */
@NgModule({
  declarations: [],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    CommonModule,
    ServicesModule,
    PagesModule,
    ShareModule,
    AppRoutingModule,
  ],
  exports: [
    ShareModule,
    AppRoutingModule
  ],
  providers: [
  ]
})
export class CoreModule {
  constructor(@SkipSelf() @Optional() parentModule: CoreModule){
    if(parentModule) {
      throw new Error ('CoreModuel should only be imported by AppModule')
    }
  }
}
