import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CenterComponent } from './center/center.component';


const routes: Routes = [
  {
    path: 'member/:id', component: CenterComponent, data: { title: 'Self Center'}
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MemberRoutingModule { }
