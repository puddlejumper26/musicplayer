import { HomeResolverService } from './home-resolve.service';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent, data: {title: 'Find'}, resolve: {homeDatas: HomeResolverService}}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers:[HomeResolverService]
})
export class HomeRoutingModule { }
