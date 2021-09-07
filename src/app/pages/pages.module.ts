import { HomeModule } from './home/home.module';
import { NgModule } from '@angular/core';
import { ShareModule } from '../share/share.module';
import { SheetListModule } from './sheet-list/sheet-list.module';

/**
 *  manage all the pages
 */
@NgModule({
  declarations: [],
  imports: [
    ShareModule,
    SheetListModule,
    HomeModule
  ],
  exports: [
    HomeModule,
    SheetListModule
  ]
})
export class PagesModule { }
