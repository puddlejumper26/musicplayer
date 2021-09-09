import { NgModule } from '@angular/core';

import { SheetInfoModule } from './sheet-info/sheet-info.module';
import { HomeModule } from './home/home.module';
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
    SheetInfoModule,
    HomeModule
  ],
  exports: [
    HomeModule,
    SheetListModule,
    SheetInfoModule
  ]
})
export class PagesModule { }
