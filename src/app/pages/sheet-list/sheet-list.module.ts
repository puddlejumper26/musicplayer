import { NgModule } from '@angular/core';

import { ShareModule } from 'src/app/share/share.module';
import { SheetListRoutingModule } from './sheet-list-routing.module';
import { SheetListComponent } from './sheet-list.component';


@NgModule({
  declarations: [SheetListComponent],
  imports: [
    ShareModule,
    SheetListRoutingModule
  ]
})
export class SheetListModule { }
