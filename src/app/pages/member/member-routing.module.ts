import { CenterResolverService } from './center/center-resolve.service';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CenterComponent } from './center/center.component';


const routes: Routes = [
  {
    path: 'member/:id', component: CenterComponent, data: { title: 'Self Center'}, resolve: { user: CenterResolverService }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [CenterResolverService]
})
export class MemberRoutingModule { }
