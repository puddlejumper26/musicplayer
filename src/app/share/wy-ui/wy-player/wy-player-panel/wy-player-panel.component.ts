import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';

import { Song } from 'src/app/services/data-types/common.types';

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

  constructor() { }

  ngOnChanges(changes: SimpleChanges): void {
    if(changes['songList']) {
      console.log('ngOnChanges - songList', this.songList);
    };
    if(changes['currentSong']) {
      console.log('ngOnChanges - currentSong', this.currentSong);
    }
  }

  ngOnInit() {
  }

}
