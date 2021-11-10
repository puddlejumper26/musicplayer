import { getMember, getUserId } from './../../store/selectors/member.selector';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NzCarouselComponent } from 'ng-zorro-antd';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs/internal/operators';
import { Store, select } from '@ngrx/store';

import { findIndex, shuffle } from 'src/app/utils/array';
import { HotTag, Singer, SongSheet } from './../../services/data-types/common.types';
import { Banner } from 'src/app/services/data-types/common.types';
import { SheetService } from 'src/app/services/sheet.service';
import { AppStoreModule } from 'src/app/store';
import { PlayMode } from 'src/app/share/wy-ui/wy-player/player-types';
import { PlayState } from 'src/app/store/reducers/player.reducer';
import { getPlayer } from 'src/app/store/selectors/player.selector';
import { SetSongList, SetPlayList, SetCurrentIndex, SetPlayMode } from './../../store/actions/player.actions';
import { BatchActionsService } from 'src/app/store/batch-actions.service';
import { ModalTypes } from 'src/app/store/reducers/member.reducer';
import { User } from 'src/app/services/data-types/member.type';
import { MemberService } from 'src/app/services/member.service';
import { StorageService } from 'src/app/services/storage.service';
import { of } from 'rxjs/internal/observable/of';

const initPlayMode: PlayMode = {
  type: 'loop',
  label: 'loop'
};

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
  user: User;

  carouselActiveIndex = 0;

  private playerState: PlayState;

  @ViewChild(NzCarouselComponent, { static: true }) private nzCarousel: NzCarouselComponent;

  constructor(
    private sheetServe: SheetService,
    private route: ActivatedRoute,
    private router: Router,
    private store$: Store<AppStoreModule>,
    private batchActionsServe: BatchActionsService,
    private memberServe: MemberService,
    private storageServe: StorageService,
  ) {
    this.route.data.pipe(map( res => res.homeDatas )).subscribe( ([banners, hotTags, songSheetList, singers]) => {
      this.banners = banners;
      this.hotTags = hotTags;
      this.songSheetList = songSheetList;
      this.singers = singers;
    })
    // this.store$.pipe(select(getPlayer)).subscribe( res => this.q = res);
    this.store$.pipe(select(getMember)).subscribe(member => {
      // console.log('HomeComponent - Constructor - member - ', member);
      if(member.userId) {
        this.getUserDetail(member.userId);
      }else {
        this.user = null;
      }
    })
  }

  ngOnInit() {
  }

  private getUserDetail(id: string) {
    this.memberServe.getUserDetail(id).subscribe(user => {
      this.user = user;
    })
  }

  onBeforeChange({ to }){
    this.carouselActiveIndex = to
  }

  onChangeSlide(type: string) {
    this.nzCarousel[type]();
  }

  /**
   *  here is to @dispatch and @set the state, and @store the data
   */
  // this will call the reducer(playerReducer) for upddating the state of following parameters such as songList, playList...
  onPlaySheet(id: number) {
    this.sheetServe.playSheet(id).subscribe(list => {

      this.batchActionsServe.selectPlayList({list, index:0});

      // this.store$.dispatch(SetSongList({ songList: list }));
      /**
       *  @method1
       */
      // let trueIndex = 0;
      // let trueList = list.slice();
      // if(this.playerState.playMode.type === 'random') {
      //   trueList = shuffle(list || []);
      //   trueIndex = findIndex(trueList, list[trueIndex]);
      // }
      // this.store$.dispatch(SetPlayList({ playList: trueList }));
      // this.store$.dispatch(SetCurrentIndex({ currentIndex: trueIndex })); // default to play the first song

      /**
       * @method2        reset the play mode to loop when playing an ablum
       */
      // this.store$.dispatch(SetPlayMode({ playMode: initPlayMode }))
    })
  }

  toInfo(id: number) {
    this.router.navigate(['/sheetInfo', id]);
  }

  openModal() {
    this.batchActionsServe.controlModal(true, ModalTypes.Default)
  }
}
