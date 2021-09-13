import { SingerDetailComponent } from './singer-detail/singer-detail.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [{
  path: 'singer/:id', component: SingerDetailComponent, data: { title: 'Singer Detail' }
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SingerRoutingModule { }
