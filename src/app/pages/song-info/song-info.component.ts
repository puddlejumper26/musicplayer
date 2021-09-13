import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/internal/operators/map';

import { Song } from 'src/app/services/data-types/common.types';
import { BaseLyricLine, WyLyric } from './../../share/wy-ui/wy-player/wy-player-panel/wy-lyric';

@Component({
  selector: 'app-song-info',
  templateUrl: './song-info.component.html',
  styleUrls: ['./song-info.component.less']
})
export class SongInfoComponent implements OnInit {

  song: Song;
  lyric: BaseLyricLine[];

  constructor(private route: ActivatedRoute) {
    this.route.data.pipe(map(res => res.songInfo)).subscribe(([song, lyric]) => {
      // console.log('SongInfoComponent - constructor - res -', res);
      this.song = song;
      this.lyric = new WyLyric(lyric).lines;
      console.log('SongInfoComponent - constructor - lyric -', this.lyric);
    })
  }

  ngOnInit() {
  }

}
