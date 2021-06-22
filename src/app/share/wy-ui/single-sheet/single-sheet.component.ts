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

  playSheet(id: number) {
    this.onPlay.emit(id);
  }
}
