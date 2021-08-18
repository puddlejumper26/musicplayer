import { Component, Input, OnChanges, OnInit, Output, EventEmitter, SimpleChanges, ViewChildren, QueryList, Inject } from '@angular/core';
import { timer } from 'rxjs';

import { Song } from 'src/app/services/data-types/common.types';
import { WINDOW } from 'src/app/services/services.module';
import { SongService } from 'src/app/services/song.service';
import { findIndex } from 'src/app/utils/array';
import { WyScrollComponent } from './../wy-scroll/wy-scroll.component';
import { BaseLyricLine, WyLyric } from './wy-lyric';

@Component({
  selector: 'app-wy-player-panel',
  templateUrl: './wy-player-panel.component.html',
  styleUrls: ['./wy-player-panel.component.less']
})
export class WyPlayerPanelComponent implements OnInit, OnChanges {

  @Input() playing: boolean;
  @Input() songList: Song[];
  @Input() currentSong: Song;
  @Input() show: boolean;

  @Output() onClose = new EventEmitter<void>();
  @Output() onChangeSong = new EventEmitter<Song>();

  scrollY = 0;
  currentLyric: BaseLyricLine[]
  currentIndex: number;
  currentLineNum: number;

  private lyric: WyLyric;

  // we need to use this compnent both for player list and also for lyrics, so @Children
  @ViewChildren(WyScrollComponent) private wyScroll: QueryList<WyScrollComponent>;

  constructor(@Inject(WINDOW) private win: Window, private songServe: SongService) { }

  ngOnChanges(changes: SimpleChanges): void {
    if(changes['playing']) {
      if(!changes['playing'].firstChange && this.playing) {
        this.lyric.play();
      }
    }

    if(changes['songList']) {
      // console.log('ngOnChanges - songList', this.songList);
      // default to play the first song
      this.currentIndex = 0;
    };
    if(changes['currentSong']) {
      // console.log('ngOnChanges - currentSong', this.currentSong);
      if(this.currentSong) {
        this.currentIndex = findIndex(this.songList, this.currentSong);
        this.updateLyric();
        if(this.show){
          this.scrollToCurrent();
        }
      }else {

      }
    }
    if(changes['show']) {
      if(!changes['show'].firstChange && this.show) {
        // first means the first component
        this.wyScroll.first.refreshScroll();
        // otherwise the lyric panel wouldn't scroll
        this.wyScroll.last.refreshScroll();

        this.win.setTimeout(() => {
          if(this.currentSong) {
            this.scrollToCurrent(0);
          }
        }, 80);

        // timer to replace the setTimeout(), after 80 secs to send a flow
        // timer(80).subscribe(() => {
        //   if(this.currentSong) {
        //     this.scrollToCurrent(0);
        //   }
        // })

        // setTimeout(() => {
        //   if(this.currentSong) {
        //     this.scrollToCurrent(0);
        //   }
        // }, 80);
      }
    }
  }

  ngOnInit() {}

  private updateLyric() {
    this.songServe.getLyric(this.currentSong.id).subscribe( res => {
      // console.log( res.lrc )
      this.lyric = new WyLyric(res);
      this.currentLyric = this.lyric.lines;
      console.log('updateLyric -- this.currentLyric - ', this.currentLyric);
      this.handleLyric();
      // at the beginning, the lyric always from the top
      this.wyScroll.last.scrollTo(0, 0);
      if(this.playing) {
        this.lyric.play();
      }
    });
  }

  private handleLyric() {
    this.lyric.handler.subscribe(({lineNum}) => {
      console.log('handleLyric - lineNum ---', lineNum);
      this.currentLineNum = lineNum;
    })
  }

  private scrollToCurrent(speed = 300) {
    const songListRefs = this.wyScroll.first.el.nativeElement.querySelectorAll('ul li');
    // console.log('scrollToCurrent - songListRefs - ', songListRefs);
    if(songListRefs.length) {
      // current play li
      const currentLi = <HTMLElement>songListRefs[this.currentIndex || 0];
      //offsetTop of current playing song
      const offsetTop = currentLi.offsetTop;
      const offsetHeight = currentLi.offsetHeight;
      console.log('scrollToCurrent - this.scrollY - ', this.scrollY);
      console.log('scrollToCurrent - offsetTop - ', offsetTop);
      //downwards play songs, to keep the song in the view
      if((offsetTop - Math.abs(this.scrollY)) > offsetHeight * 5) {
        this.wyScroll.first.scrollToElement(currentLi, speed, false, true);
      }
      //upwards play songs, to keep the song in the view
      if(offsetTop < Math.abs(this.scrollY)) {
        this.wyScroll.first.scrollToElement(currentLi, speed, false, true);
      }
    }
  }
}
