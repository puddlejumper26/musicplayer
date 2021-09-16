import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { SearchResult } from 'src/app/services/data-types/common.types';

@Component({
  selector: 'app-wy-search-panel',
  templateUrl: './wy-search-panel.component.html',
  styleUrls: ['./wy-search-panel.component.less']
})
export class WySearchPanelComponent implements OnInit {

  searchResult: SearchResult

  constructor(
    private router: Router,
  ) {
    // console.log('WySearchPanelComponent - constructor - searchResult -', this.searchResult)
  }

  ngOnInit() {
  }

  toInfo(path: [string, number]) {
    // console.log('WySearchPanelComponent - toInfo - path -', path);
    if(path[1]) {
      this.router.navigate(path);
    }
  }
}
