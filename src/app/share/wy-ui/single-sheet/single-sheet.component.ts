import { SongSheet } from './../../../services/data-types/common.types';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-single-sheet',
  templateUrl: './single-sheet.component.html',
  styleUrls: ['./single-sheet.component.less']
})
export class SingleSheetComponent implements OnInit {

  @Input() sheet: SongSheet;

  constructor() { }

  ngOnInit() {
  }

}
