import { HotTag } from './../../services/data-types/common.types';
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
  hotTags: HotTag[];

  carouselActiveIndex = 0;

  constructor(
    private homeServe: HomeService
  ) {
    this.getBanners();
    this.getHotTags();
    this.getPersonalizedSheetList();
  }

  private getBanners() {
    this.homeServe.getBanner().subscribe( banners => {
      this.banners = banners;
    })
  }

  private getHotTags() {
    this.homeServe.getHotTags().subscribe( hotTags => {
      this.hotTags = hotTags;
    })
  }

  private getPersonalizedSheetList() {
    this.homeServe.getPersonalSheetList().subscribe( sheets => {
      console.log('sheets', sheets);
    })
  }

  ngOnInit() {
  }

  onBeforeChange({ to }){
    this.carouselActiveIndex = to
  }

}
