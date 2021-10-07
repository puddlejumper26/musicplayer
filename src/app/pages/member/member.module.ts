import { NgModule } from '@angular/core';

import { ShareModule } from 'src/app/share/share.module';
import { MemberRoutingModule } from './member-routing.module';
import { CenterComponent } from './center/center.component';


@NgModule({
  declarations: [CenterComponent],
  imports: [
    ShareModule,
    MemberRoutingModule
  ]
})
export class MemberModule { }
