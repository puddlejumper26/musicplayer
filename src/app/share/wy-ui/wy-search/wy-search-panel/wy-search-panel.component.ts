import { Component, OnInit } from '@angular/core';

import { SearchResult } from 'src/app/services/data-types/common.types';

@Component({
  selector: 'app-wy-search-panel',
  templateUrl: './wy-search-panel.component.html',
  styleUrls: ['./wy-search-panel.component.less']
})
export class WySearchPanelComponent implements OnInit {

  searchResult: SearchResult

  constructor() {
    console.log('WySearchPanelComponent - constructor - searchResult -', this.searchResult)
  }

  ngOnInit() {
  }

}
