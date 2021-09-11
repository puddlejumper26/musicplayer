import { SongInfoComponent } from './song-info.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [{
  path: 'songInfo/:id', component: SongInfoComponent, data: { title: 'Song Info'}
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SongInfoRoutingModule { }
