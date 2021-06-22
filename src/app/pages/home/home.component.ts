import { Component, OnInit, ViewChild } from '@angular/core';
import { NzCarouselComponent } from 'ng-zorro-antd';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/internal/operators';

import { HotTag, Singer, SongSheet } from './../../services/data-types/common.types';
import { Banner } from 'src/app/services/data-types/common.types';
import { SheetService } from 'src/app/services/sheet.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.less']
})
export class HomeComponent implements OnInit {

  banners: Banner[];
  hotTags: HotTag[];
  songSheetList: SongSheet[];
  singers: Singer[];

  carouselActiveIndex = 0;

  @ViewChild(NzCarouselComponent, { static: true }) private nzCarousel: NzCarouselComponent;

  constructor(
    private sheetServe: SheetService,
    private route: ActivatedRoute
  ) {
    this.route.data.pipe(map( res => res.homeDatas )).subscribe( ([banners, hotTags, songSheetList, singers]) => {
      this.banners = banners;
      this.hotTags = hotTags;
      this.songSheetList = songSheetList;
      this.singers = singers;
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

  onPlaySheet(id: number) {
    this.sheetServe.playSheet(id).subscribe(res => {
      console.log(res);
    })
  }
}
