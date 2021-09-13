import { NgModule } from '@angular/core';

import { SongInfoModule } from './song-info/song-info.module';
import { SheetInfoModule } from './sheet-info/sheet-info.module';
import { HomeModule } from './home/home.module';
import { ShareModule } from '../share/share.module';
import { SheetListModule } from './sheet-list/sheet-list.module';
import { SingerModule } from './singer/singer.module';

/**
 *  manage all the pages
 */
@NgModule({
  declarations: [],
  imports: [
    ShareModule,
    SheetListModule,
    SheetInfoModule,
    HomeModule,
    SongInfoModule,
    SingerModule
  ],
  exports: [
    HomeModule,
    SheetListModule,
    SheetInfoModule,
    SongInfoModule,
    SingerModule
  ]
})
export class PagesModule { }
