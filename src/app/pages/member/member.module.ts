import { NgModule } from '@angular/core';

import { ShareModule } from 'src/app/share/share.module';
import { MemberRoutingModule } from './member-routing.module';
import { CenterComponent } from './center/center.component';
import { RecordsComponent } from './components/records/records.component';
import { RecordDetailComponent } from './record-detail/record-detail.component';


@NgModule({
  declarations: [CenterComponent, RecordsComponent, RecordDetailComponent],
  imports: [
    ShareModule,
    MemberRoutingModule
  ]
})
export class MemberModule { }
