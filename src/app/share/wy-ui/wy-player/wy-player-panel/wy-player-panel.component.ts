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

  // we need to use this compnent both for player list and also for lyrics, so @Children
  @ViewChildren(WyScrollComponent) private wyScroll: QueryList<WyScrollComponent>;

  constructor() { }

  ngOnChanges(changes: SimpleChanges): void {
    if(changes['songList']) {
      console.log('ngOnChanges - songList', this.songList);
    };
    if(changes['currentSong']) {
      console.log('ngOnChanges - currentSong', this.currentSong);
    }
    if(changes['show']) {
      if(!changes['show'].firstChange && this.show) {
        // first means the first component
        this.wyScroll.first.refreshScroll();
      }
    }
  }

  ngOnInit() {
  }

}
