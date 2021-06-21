import { ShareModule } from './../../share/share.module';
import { NgModule } from '@angular/core';
import { NzCarouselModule } from 'ng-zorro-antd/carousel';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { WyCarouselComponent } from './components/wy-carousel/wy-carousel.component';


@NgModule({
  declarations: [HomeComponent, WyCarouselComponent],
  imports: [
    HomeRoutingModule,
    NzCarouselModule,
    ShareModule
  ]
})
export class HomeModule { }
