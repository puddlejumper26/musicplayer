import { Component, Input, OnChanges, OnInit, Output, EventEmitter, SimpleChanges, ViewChildren, QueryList } from '@angular/core';

import { Song } from 'src/app/services/data-types/common.types';
import { WyScrollComponent } from './../wy-scroll/wy-scroll.component';

@Component({
  selector: 'app-wy-player-panel',
  templateUrl: './wy-player-panel.component.html',
  styleUrls: ['./wy-player-panel.component.less']
})
export class WyPlayerPanelComponent implements OnInit, OnChanges {

  @Input() songList: Song[];
  @Input() currentSong: Song;
  @Input() currentIndex: number;
  @Input() show: boolean;

  @Output() onClose = new EventEmitter<void>();
  @Output() onChangeSong = new EventEmitter<Song>();

  scrollY = 0;

  // we need to use this compnent both for player list and also for lyrics, so @Children
  @ViewChildren(WyScrollComponent) private wyScroll: QueryList<WyScrollComponent>;

  constructor() { }

  ngOnChanges(changes: SimpleChanges): void {
    if(changes['songList']) {
      // console.log('ngOnChanges - songList', this.songList);
    };
    if(changes['currentSong']) {
      // console.log('ngOnChanges - currentSong', this.currentSong);
      if(this.currentSong) {
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
      }
    }
  }

  ngOnInit() {}

  private scrollToCurrent() {
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
      if((offsetTop - Math.abs(this.scrollY)) > 215) {
        this.wyScroll.first.scrollToElement(currentLi, 300, false, true);
      }
      //upwards play songs, to keep the song in the view
      if(offsetTop < Math.abs(this.scrollY)) {
        this.wyScroll.first.scrollToElement(currentLi, 300, false, true);
      }
    }
  }
}
