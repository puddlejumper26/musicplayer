import { NgModule } from '@angular/core';

import { MemberModule } from './member/member.module';
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
    SingerModule,
    MemberModule
  ],
  exports: [
    HomeModule,
    SheetListModule,
    SheetInfoModule,
    SongInfoModule,
    SingerModule,
    MemberModule
  ]
})
export class PagesModule { }
