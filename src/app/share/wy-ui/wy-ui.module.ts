import { NgModule } from '@angular/core';

import { PlayCountPipe } from '../pipes/play-count.pipe';
import { SingleSheetComponent } from './single-sheet/single-sheet.component';
import { WyPlayerModule } from './wy-player/wy-player.module';
import { WySearchModule } from './wy-search/wy-search.module';
import { WyLayerModule } from './wy-layer/wy-layer.module';

@NgModule({
  declarations: [
    SingleSheetComponent,
    PlayCountPipe,
  ],
  imports: [
    WyPlayerModule,
    WySearchModule,
    WyLayerModule
  ],
  exports: [
    SingleSheetComponent,
    PlayCountPipe,
    WyPlayerModule,
    WySearchModule,
    WyLayerModule
  ]
})
export class WyUiModule { }
