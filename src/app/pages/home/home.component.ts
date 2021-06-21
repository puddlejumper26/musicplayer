import { HotTag, SongSheet } from './../../services/data-types/common.types';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Banner } from 'src/app/services/data-types/common.types';
import { HomeService } from 'src/app/services/home.service';
import { NzCarouselComponent } from 'ng-zorro-antd';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.less']
})
export class HomeComponent implements OnInit {

  banners: Banner[];
  hotTags: HotTag[];
  songSheetList: SongSheet[];
  carouselActiveIndex = 0;

  @ViewChild(NzCarouselComponent, { static: true }) private nzCarousel: NzCarouselComponent;

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
      this.songSheetList = sheets;
    })
  }

  ngOnInit() {
  }

  onBeforeChange({ to }){
    this.carouselActiveIndex = to
  }

  onChangeSlide(type: string) {
    this.nzCarousel[type]();
  }
}
