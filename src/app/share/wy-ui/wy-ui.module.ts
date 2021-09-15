import { NgModule } from '@angular/core';

import { PlayCountPipe } from '../pipes/play-count.pipe';
import { SingleSheetComponent } from './single-sheet/single-sheet.component';
import { WyPlayerModule } from './wy-player/wy-player.module';
import { WySearchModule } from './wy-search/wy-search.module';

@NgModule({
  declarations: [
    SingleSheetComponent,
    PlayCountPipe
  ],
  imports: [
    WyPlayerModule,
    WySearchModule
  ],
  exports: [
    SingleSheetComponent,
    PlayCountPipe,
    WyPlayerModule,
    WySearchModule
  ]
})
export class WyUiModule { }
