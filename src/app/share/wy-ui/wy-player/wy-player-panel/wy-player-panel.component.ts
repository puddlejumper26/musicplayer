import { Component, Input, OnChanges, OnInit, Output, EventEmitter, SimpleChanges, ViewChildren, QueryList, Inject } from '@angular/core';
import { Router } from '@angular/router';
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
  @Output() onDeleteSong = new EventEmitter<Song>();
  @Output() onClearSong = new EventEmitter<void>();
  @Output() onToInfo = new EventEmitter<[string, number]>();
  @Output() onLikeSong = new EventEmitter<string>();
  @Output() onShareSong = new EventEmitter<Song>();

  scrollY = 0;
  currentLyric: BaseLyricLine[]
  currentIndex: number;
  currentLineNum: number;

  private lyric: WyLyric;
  private lyricRefs: NodeList;
  private startLine: number = 2;

  // we need to use this compnent both for player list and also for lyrics, so @Children
  @ViewChildren(WyScrollComponent) private wyScroll: QueryList<WyScrollComponent>;

  constructor(
    @Inject(WINDOW) private win: Window,
    private songServe: SongService,
    private router: Router
  ) { }

  ngOnChanges(changes: SimpleChanges): void {
    if(changes['playing']) {
      if(!changes['playing'].firstChange) {
        this.lyric && this.lyric.togglePlay(this.playing);
      }
    }

    if(changes['songList']) {
      // console.log('ngOnChanges - songList', this.songList);
      // default to play the first song
      if(this.currentSong) {
        this.updateCurrentIndex();
      }
    };
    if(changes['currentSong']) {
      // console.log('ngOnChanges - currentSong', this.currentSong);
      if(this.currentSong) {
        this.updateCurrentIndex();
        this.updateLyric();
        if(this.show){
          this.scrollToCurrent();
        }
      }else {
        this.resetLyric();
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
          if (this.lyricRefs) {
            this.scrollToCurrentLyric(0)
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

  private updateCurrentIndex() {
    this.currentIndex = findIndex(this.songList, this.currentSong);
  }

  private updateLyric() {
    this.resetLyric();
    this.songServe.getLyric(this.currentSong.id).subscribe( res => {
      // console.log( res.lrc )
      this.lyric = new WyLyric(res);
      this.currentLyric = this.lyric.lines;
      // console.log('updateLyric -- this.currentLyric - ', this.currentLyric);

      // if EN/CN lyrics then startign from 1, only CN lyric then from line 2 to scroll
      // this logic is to keep the highlight lyric in the middle
      this.startLine = res.tlyric ? 1 : 2;
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
      // console.log('handleLyric - lineNum ---', lineNum);

      if(!this.lyricRefs) {
        // (ul, li) is different from (ul li), log out could see (ul, li) has extra ul
        // which makes the number always 1 bigger than planned
        this.lyricRefs = this.wyScroll.last.el.nativeElement.querySelectorAll('ul li');
        // console.log('handleLyric - this.lyricRefs - ', this.lyricRefs);
      }

      if(this.lyricRefs.length) {
        this.currentLineNum = lineNum;
        if(lineNum > this.startLine) {
          this.scrollToCurrentLyric(300);
        }else {
          this.wyScroll.last.scrollTo(0, 0);
        }
      }
    })
  }

  // reset lyric instance to empty
  // without this, when playing one song, and click another song, the lyric num would continue from previous one
  private resetLyric() {
    if(this.lyric) {
      this.lyric.stop();
      this.lyric = null;
      this.currentLyric = [];
      this.currentLineNum = 0;
      this.lyricRefs = null; //wihtout this then new song lyric would not scroll
    }
  }

  seekLyric(time: number) {
    if(this.lyric) {
      this.lyric.seek(time);
    }
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
      // console.log('scrollToCurrent - this.scrollY - ', this.scrollY);
      // console.log('scrollToCurrent - offsetTop - ', offsetTop);
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

  private scrollToCurrentLyric(speed = 300) {
    const targetLine = this.lyricRefs[this.currentLineNum - this.startLine];
    if(targetLine) {
      this.wyScroll.last.scrollToElement(targetLine, speed, false, false);
    }
  }

  toInfo(evt: MouseEvent, path:[string, number]) {
    evt.stopPropagation();
    this.onToInfo.emit(path);
  }

  likeSong(evt: MouseEvent, id: string) {
    evt.stopPropagation();
    this.onLikeSong.emit(id);
  }

  shareSong(evt: MouseEvent, song: Song) {
    evt.stopPropagation();
    this.onShareSong.emit(song);
  }
}
