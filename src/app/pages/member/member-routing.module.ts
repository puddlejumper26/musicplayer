import { RecordDetailComponent } from './record-detail/record-detail.component';
import { CenterResolverService } from './center/center-resolve.service';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CenterComponent } from './center/center.component';
import { RecordResolverService } from './record-detail/record-resolve.service';


const routes: Routes = [
  {
    path: 'member/:id', component: CenterComponent, data: { title: 'Self Center'}, resolve: { user: CenterResolverService }
  },
  {
    path: 'records/:id', component: RecordDetailComponent, data: { title: 'Record Detail'}, resolve: { user: RecordResolverService }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [CenterResolverService, RecordResolverService]
})
export class MemberRoutingModule { }
