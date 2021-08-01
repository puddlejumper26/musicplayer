import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { select, Store } from '@ngrx/store';

import { AppStoreModule } from 'src/app/store';
import { getCurrentIndex, getPlayer, getPlayMode, getCurrentSong, getPlayList, getSongList } from 'src/app/store/selectors/player.selector';
import { SetCurrentIndex } from './../../../store/actions/player.actions';
import { PlayMode } from './player-types';
import { Song } from 'src/app/services/data-types/common.types';

@Component({
  selector: 'app-wy-player',
  templateUrl: './wy-player.component.html',
  styleUrls: ['./wy-player.component.less']
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

  //play status
  playing = false;
  // whether ready to play
  songReady = false;

  @ViewChild('audio', { static: true }) private audio: ElementRef;
  private audioEl: HTMLAudioElement;

  constructor(
    private store$: Store<AppStoreModule>
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

  }

  private watchCurrentSong(song: Song) {
    if(song) {
      this.currentSong = song;
      this.duration = song.dt / 1000; // to change from minisec -> sec
      // console.log('watchCurrentSong - currentSong -', song);
    }
  }

  onPercentChange(per: number) {
    // console.log('onPercentChange - per - ', per);
    this.audioEl.currentTime = this.duration * (per / 100);
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

  // single loop
  private loop() {
    this.audioEl.currentTime = 0;
    this.play();
  }

  get picUrl(): string {
    return this.currentSong ? this.currentSong.al.picUrl  : "//s4.music.126.net/style/web2/img/default/default_album.jpg";
  }
}
