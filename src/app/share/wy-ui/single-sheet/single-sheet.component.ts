import { SongSheet } from './../../../services/data-types/common.types';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-single-sheet',
  templateUrl: './single-sheet.component.html',
  styleUrls: ['./single-sheet.component.less']
})
export class SingleSheetComponent implements OnInit {

  @Input() sheet: SongSheet;
  @Output() onPlay = new EventEmitter<number>();

  constructor() { }

  ngOnInit() {
  }

  playSheet(evt: MouseEvent, id: number) {
    evt.stopPropagation(); // avoid clicking this icon, then entering the album. we just need this album to be played, stayed in the same page
    this.onPlay.emit(id);
  }

  get coverImg(): string{
    return this.sheet.picUrl || this.sheet.coverImgUrl;
  }
}
