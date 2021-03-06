import { BatchActionsService } from 'src/app/store/batch-actions.service';
import { DOCUMENT } from '@angular/common';
import { Component, OnInit, ViewChild, ElementRef, Inject } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { fromEvent, Subscription, timer } from 'rxjs';
import { NzModalService } from 'ng-zorro-antd';
import { Router } from '@angular/router';
import { animate, state, style, transition, trigger, AnimationEvent } from '@angular/animations';

import { AppStoreModule } from 'src/app/store';
import { getCurrentIndex, getPlayer, getPlayMode, getCurrentSong, getPlayList, getSongList, getCurrentAction } from 'src/app/store/selectors/player.selector';
import { SetCurrentIndex, SetPlayMode, SetPlayList, SetSongList, SetCurrentAction } from './../../../store/actions/player.actions';
import { PlayMode } from './player-types';
import { Singer, Song } from 'src/app/services/data-types/common.types';
import { findIndex, shuffle } from 'src/app/utils/array';
import { WyPlayerPanelComponent } from './wy-player-panel/wy-player-panel.component';
import { CurrentActions } from 'src/app/store/reducers/player.reducer';
import { SetShareInfo } from 'src/app/store/actions/member.actions';


const modeTypes: PlayMode[] = [{
  type: 'loop',
  label: 'loop'
},{
  type:'random',
  label:'random'
},{
  type:'singleLoop',
  label:'single loop'
}];

enum TipTitles {
  Add = 'Added to the list',
  Play = 'Start to play'
}
@Component({
  selector: 'app-wy-player',
  templateUrl: './wy-player.component.html',
  styleUrls: ['./wy-player.component.less'],
  animations: [trigger('showHide', [
    state('show', style({bottom: 0})),
    state('hide', style({bottom: -71})),
    transition('show=>hide', [animate('0.5s')]),
    transition('hide=>show', [animate('0.1s')])
  ])]
})
export class WyPlayerComponent implements OnInit {

  percent = 0;
  volumn = 60;
  bufferOffset = 0;

  songList: Song[];
  playList: Song[];
  currentIndex: number;
  playMode: PlayMode;
  currentSong: Song;
  duration: number;
  currentTime: number;

  controlTooltip = {
    title: '',
    show: false
  }

  showPlayer = 'hide';
  isLocked = false;
  animating = false; //whether now is animation

  //play status
  playing = false;
  // whether ready to play
  songReady = false;

  currentMode: PlayMode;
  modeCount = 0; // record how many time clicked

  showVolumnPanel = false;

  // selfClick = false; // whether click the player panel itself
  bindFlag = false; // whether bind document.click event

  //show play list panel
  showPanel = false;

  private winClick: Subscription

  @ViewChild('audio', { static: true }) private audio: ElementRef;
  @ViewChild(WyPlayerPanelComponent, { static: false }) private playerPanel: WyPlayerPanelComponent;
  private audioEl: HTMLAudioElement;

  constructor(
    private store$: Store<AppStoreModule>,
    @Inject(DOCUMENT) private doc: Document,
    private nzModalServe: NzModalService,
    private batchActionsServe: BatchActionsService,
    private router: Router
  ) {

    /**
     * here @get the data from the @store
     */
    const appStore$ = this.store$.pipe(select(getPlayer));
    appStore$.pipe(select(getSongList)).subscribe(list => {
      this.watchList(list, 'songList')
    });
    appStore$.pipe(select(getPlayList)).subscribe(list => {
      this.watchList(list, 'playList')
    });
    appStore$.pipe(select(getCurrentIndex)).subscribe(index => {
      this.watchCurrentIndex(index)
    });
    appStore$.pipe(select(getPlayMode)).subscribe(mode => {
      this.watchPlayMode(mode)
    });
    appStore$.pipe(select(getCurrentSong)).subscribe(song => {
      this.watchCurrentSong(song)
    });
    appStore$.pipe(select(getCurrentAction)).subscribe(action => {
      this.watchCurrentAction(action)
    });

    // following is only working under @ngrx/store-devtool@8.3.0
    // const stateArr = [{
    //   type: getSongList,
    //   cb: list => this.watchList(list, 'songList'),
    // }, {
    //   type: getPlayList,
    //   cb: list => this.watchList(list, 'playList'),
    // }, {
    //   type: getCurrentIndex,
    //   cb: index => this.watchCurrentIndex(index),
    // }]

    // stateArr.forEach(item => {
    //   appStore$.pipe(select(item.type)).subscribe(item.cb);
    // })
  }

  ngOnInit() {
    this.audioEl = this.audio.nativeElement;
    // console.log('this.audio.nativeElement - - ', this.audio.nativeElement);
  }

  private watchList(list: Song[], type: string) {
    // console.log('watchList - list', list);
    this[type] = list;
  }

  private watchCurrentIndex(index: number) {
    // console.log('watchCurrentIndex - index', index);
    this.currentIndex = index;
  }

  private watchPlayMode(mode: PlayMode) {
    // console.log('watchPlayMode - mode -', mode);
    this.currentMode = mode;

    if(this.songList) {
      // always using @slice() to store the copy
      let list = this.songList.slice();
      if(mode.type === 'random') {
        list = shuffle(this.songList);
      }
      // console.log('watchPlayMode - list -', list);

      // current playing song should not be changed when shuffling songList
      this.updateCurrentIndex(list, this.currentSong);
      this.store$.dispatch(SetPlayList({ playList: list }));
    }
  }

  // to find the current playing song's index in the new songList after shuffled
  private updateCurrentIndex(list: Song[], song: Song) {
    // console.log('updateCurrentIndex - Song - ', song);

    if(song) {
      // console.log('updateCurrentindex - song.id - ', song.id);
      const newIndex = findIndex(list, song);
      this.store$.dispatch(SetCurrentIndex({ currentIndex: newIndex }));
    }
  }

  private watchCurrentSong(song: Song) {
    this.currentSong = song;
    if(song) {
      this.duration = song.dt / 1000; // to change from minisec -> sec
      // console.log('watchCurrentSong - currentSong -', song);
    }
  }

  private watchCurrentAction(action: CurrentActions) {
    const title = TipTitles[CurrentActions[action]];
    // console.log('WyPlayerComponent - watchCurrentAction - CurrentActions[action] -', CurrentActions[action]);
    if(title) {
      this.controlTooltip.title = title;
      if(this.showPlayer === 'hide') {
        this.togglePlayer('show')
      }else {
        this.showTooltip();
      }
    }
    this.store$.dispatch(SetCurrentAction({ currentAction: CurrentActions.Other })); // restore the status
  }


  onAnimateDone(event: AnimationEvent) {
    this.animating = false;
    /*
    * @toState === show => animation is from `hide` to `show`
    * @toState === hide => animation is from `show` to `hide`
    */
  //  console.log('WyPlayerComponent - onAnimation - event.toState - ', event.toState);
   if(event.toState === 'show' && this.controlTooltip.title) {
     this.showTooltip();
    }
  }

  private showTooltip() {
    this.controlTooltip.show = true;
    timer(1500).subscribe(()=> {
      this.controlTooltip = {
        title: '',
        show: false
      }
    })
  }

  changeMode() {
    // console.log('changeMode - this.modeCount - ', this.modeCount);
    const temp = modeTypes[++this.modeCount % 3];
    // console.log('changeMode - this.modeCount++ % 3 - ', ++this.modeCount % 3);
    // console.log('changeMode - temp - ', temp);

    // here to sent the mode data, and @appStore$.pipe(select(getPlayMode)).subscribe will obtain(subscribe) this data
    this.store$.dispatch(SetPlayMode({ playMode: temp }));
  }

  onPercentChange(per: number) {
    // console.log('onPercentChange - per - ', per);
    if(this.currentSong){
      const currentTime = this.duration * (per / 100);
      this.audioEl.currentTime = currentTime;
      if(this.playerPanel) {
        this.playerPanel.seekLyric(currentTime * 1000); // here needs to pass a time stamp
      }
    }
  }

  onVolumnChange(per: number) {
    this.audioEl.volume = per / 100;
  }

  onTimeUpdate(e: Event) {
    // console.log('onTimeUpdate - time', (<HTMLAudioElement>e.target).currentTime); // <== to obtain the current time through consertation
    this.currentTime = (<HTMLAudioElement>e.target).currentTime;
    this.percent = (this.currentTime / this.duration) * 100;

    /**
     * @end with vaule 0 means where the buffer ends, is a number
     */
    const buffered = this.audioEl.buffered;
    if(buffered.length && this.bufferOffset < 100) {
      this.bufferOffset = (buffered.end(0) / this.duration) * 100;
    }
  }

  // play / pause
  onToggle() {
    if(!this.currentSong) {
      if(this.playList.length) {
        this.updateIndex(0);
      }
    }else {
      if(this.songReady) {
        this.playing = !this.playing;
        if(this.playing) {
          this.audioEl.play();
        }else{
          this.audioEl.pause();
        }
      }
    }
  }

  toggleListPanel() {
    if(this.songList.length){
      this.togglePanel('showPanel')
    }
  }

  toggleVolPanel(evt: MouseEvent) {
    evt.stopPropagation();
    this.togglePanel('showVolumnPanel');
  }

  private togglePanel(type: string) {
    this[type] = !this[type];
    if(this.showVolumnPanel || this.showPanel) {
      this.bindFlag = true;
    }else {
      this.bindFlag = false;
    }
  }

  togglePlayer(type: string) {
    if(!this.isLocked && !this.animating) {
      this.showPlayer = type;
    }
  }

  // private bindDocumentClickListener() {
  //   if(!this.winClick) {
  //     this.winClick = fromEvent(this.doc, 'click').subscribe(() => {
  //       // click other parts, not the player part
  //       if(!this.selfClick) {
  //         this.showVolumnPanel = false;
  //         this.showPanel = false;
  //         this.unbindDocumentClickListener();
  //       }
  //       this.selfClick = false;
  //     })
  //   }
  // }

  private unbindDocumentClickListener() {
    if(this.winClick) {
      this.winClick.unsubscribe();
      this.winClick = null;
    }
  }

  onPrev(index: number) {
    if(!this.songReady) return;
    if(this.playList.length === 1){
      this.loop();
    }else{
      const newIndex = index <0 ? this.playList.length-1 : index;
      this.updateIndex(newIndex)
    }
  }

  onNext(index: number) {
    if(!this.songReady) {
      return;
    }else {
      if(this.playList.length === 1) {
        this.loop()
      }else {
        const newIndex = index >= this.playList.length ? 0 : index;
        this.updateIndex(newIndex);
      }
    }
  }

  private updateIndex(index: number) {
    this.store$.dispatch(SetCurrentIndex({ currentIndex: index }));
    this.songReady = false;
  }

  onCanPlay() {
    this.songReady = true;
    this.play();
  }

  private play() {
    this.audioEl.play();
    this.playing = true;
  }

  onEnded() {
    this.playing = false;
    if(this.currentMode.type === 'singleLoop') {
      this.loop()
    }else {
      this.onNext(this.currentIndex + 1);
    }
  }

  // single loop
  private loop() {
    this.audioEl.currentTime = 0;
    this.play();
    // lyrics also need to be played from start
    if(this.playerPanel) {
      this.playerPanel.seekLyric(0)
    }
  }

  get picUrl(): string {
    return this.currentSong ? this.currentSong.al.picUrl  : "//s4.music.126.net/style/web2/img/default/default_album.jpg";
  }

  onChangeSong(song: Song) {
    // console.log('onChangeSong is called');
    this.updateCurrentIndex(this.playList, song);
  }

  onDeleteSong(song: Song) {
    // console.log('onDeleteSong is called');
    this.batchActionsServe.deleteSong(song);

    // const songList = this.songList.slice();
    // const playList = this.playList.slice();
    // let currentIndex = this.currentIndex;

    // const sIndex = findIndex(songList, song);
    // songList.splice(sIndex, 1);

    // const pIndex = findIndex(playList, song);
    // playList.splice(pIndex, 1);

    // // this means the deleted song is ahead of current playing song, so currentIndex should be minus one
    // if(currentIndex > pIndex || currentIndex === playList.length) {
    //   currentIndex--;
    // }

    // this.store$.dispatch(SetSongList({ songList }));
    // this.store$.dispatch(SetPlayList({ playList }));
    // this.store$.dispatch(SetCurrentIndex({ currentIndex }));
  }

  onClearSong() {
    // console.log('onClearSong is called');

    this.nzModalServe.confirm({
      nzTitle: 'Confirm to empty Song List',
      nzOnOk: () => {
        this.batchActionsServe.clearSong();
        // this.store$.dispatch(SetSongList({ songList: [] }));
        // this.store$.dispatch(SetPlayList({ playList: [] }));
        // this.store$.dispatch(SetCurrentIndex({ currentIndex: -1 }));
      }
    })
  }

  onClickOutSide(target: HTMLElement) {
    // console.log('WyPlayerComponent - onClickOutSide is called');
    // console.log('WyPlayerComponent - onClickOutSide - target.dataset', target.dataset)
    // here dataset.act - act is defined in WyPlayerPanel template data-act="delete", so any string would work
    // e.g. data-haha='eeee'  => if(target.dataset.haha) {...}
    if(target.dataset.act!=="delete") {
      this.showVolumnPanel = false;
      this.showPanel = false;
      this.bindFlag = false;
    }
  }

  toInfo(path: [string, number]) {
    if(path[1]){
      this.showPanel = false;
      this.showVolumnPanel = false;
      this.router.navigate(path);
    }
  }

  // Error when playing
  onError() {
    // console.log('WyPlayerComponent - onError - this.currentSong - ', this.currentSong);
    this.playing = false;
    this.bufferOffset = 0;
  }

  onShareSong(resource: Song, type = 'song') {
    let txt = this.makeTxt('Song', resource.name, resource.ar);
    // console.log('WyPlayerComponent - onShareSong - txt -', txt);
    this.store$.dispatch(SetShareInfo({ shareInfo: { id: resource.id.toString(), type, txt } }))
  }

  private makeTxt(type: string, name: string, makeBy: Singer[]): string {
    let makeByStr = makeBy.map(item => item.name).join('/');
    return `${type}: ${name} -- ${makeByStr}`;
  }

  onLikeSong(id: string) {
    this.batchActionsServe.likeSong(id);
  }
}
