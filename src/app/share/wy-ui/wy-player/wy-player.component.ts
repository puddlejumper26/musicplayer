import { DOCUMENT } from '@angular/common';
import { Component, OnInit, ViewChild, ElementRef, Inject } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { fromEvent, Subscription } from 'rxjs';

import { AppStoreModule } from 'src/app/store';
import { getCurrentIndex, getPlayer, getPlayMode, getCurrentSong, getPlayList, getSongList } from 'src/app/store/selectors/player.selector';
import { SetCurrentIndex, SetPlayMode, SetPlayList } from './../../../store/actions/player.actions';
import { PlayMode } from './player-types';
import { Song } from 'src/app/services/data-types/common.types';
import { shuffle } from 'src/app/utils/array';


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

@Component({
  selector: 'app-wy-player',
  templateUrl: './wy-player.component.html',
  styleUrls: ['./wy-player.component.less']
})
export class WyPlayerComponent implements OnInit {

  percent = 0;
  volumn = 10;
  bufferOffset = 0;

  songList: Song[];
  playList: Song[];
  currentIndex: number;
  playMode: PlayMode;
  currentSong: Song;
  duration: number;
  currentTime: number;

  //play status
  playing = false;
  // whether ready to play
  songReady = false;

  currentMode: PlayMode;
  modeCount = 0; // record how many time clicked

  showVolumnPanel = false;
  selfClick = false; // whether click the player panel itself

  //show play list panel
  showPanel = false;

  private winClick: Subscription

  @ViewChild('audio', { static: true }) private audio: ElementRef;
  private audioEl: HTMLAudioElement;

  constructor(
    private store$: Store<AppStoreModule>,
    @Inject(DOCUMENT) private doc: Document,
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
    console.log('watchPlayMode - mode -', mode);
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
      const newIndex = list.findIndex(item => item.id === song.id);
      this.store$.dispatch(SetCurrentIndex({ currentIndex: newIndex }));
  }

  private watchCurrentSong(song: Song) {
    if(song) {
      this.currentSong = song;
      this.duration = song.dt / 1000; // to change from minisec -> sec
      // console.log('watchCurrentSong - currentSong -', song);
    }
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
      this.audioEl.currentTime = this.duration * (per / 100);
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
      this.bindDocumentClickListener();
    }else {
      this.unbindDocumentClickListener();
    }
  }

  private bindDocumentClickListener() {
    if(!this.winClick) {
      this.winClick = fromEvent(this.doc, 'click').subscribe(() => {
        // click other parts, not the player part
        if(!this.selfClick) {
          this.showVolumnPanel = false;
          this.showPanel = false;
          this.unbindDocumentClickListener();
        }
        this.selfClick = false;
      })
    }
  }

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
  }

  get picUrl(): string {
    return this.currentSong ? this.currentSong.al.picUrl  : "//s4.music.126.net/style/web2/img/default/default_album.jpg";
  }
}
