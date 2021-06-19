import { HomeModule } from './home/home.module';
import { NgModule } from '@angular/core';
import { ShareModule } from '../share/share.module';

/**
 *  manage all the pages
 */
@NgModule({
  declarations: [],
  imports: [
    ShareModule,
    HomeModule
  ],
  exports: [
    HomeModule
  ]
})
export class PagesModule { }
