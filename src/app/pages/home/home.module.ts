import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzCarouselModule } from 'ng-zorro-antd/carousel';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { WyCarouselComponent } from './components/wy-carousel/wy-carousel.component';


@NgModule({
  declarations: [HomeComponent, WyCarouselComponent],
  imports: [
    CommonModule,
    HomeRoutingModule,
    NzCarouselModule
  ]
})
export class HomeModule { }
