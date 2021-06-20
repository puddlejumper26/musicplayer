import { Component, OnInit } from '@angular/core';
import { Banner } from 'src/app/services/data-types/common.types';
import { HomeService } from 'src/app/services/home.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.less']
})
export class HomeComponent implements OnInit {

  banners: Banner[];
  carouselActiveIndex = 0;

  constructor(
    private homeServe: HomeService
  ) {
    this.homeServe.getBanner().subscribe( banners => {
      this.banners = banners;
    })
  }

  ngOnInit() {
  }

  OnBeforeChange({ to }){
    this.carouselActiveIndex = to
  }

}
