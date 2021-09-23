import { SetModalType } from './store/actions/member.actions';
import { isEmptyObject } from 'src/app/utils/tool';
import { Component } from '@angular/core';
import { Store } from '@ngrx/store';

import { ModalTypes } from './store/reducers/member.reducer';
import { AppStoreModule } from './store/index';
import { SearchResult } from './services/data-types/common.types';
import { SearchService } from './services/search.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent {
  title = 'musicplayer';

  menu=[{
    label: 'Find',
    path: '/home'
  }, {
    label: 'List',
    path: '/sheet'
  }]

  searchResult: SearchResult;

  constructor(
    private searchServe: SearchService,
    private store$: Store<AppStoreModule>,
  ) {}

  onSearch(keywords: string) {
    // console.log('AppComponent - onSearch - keywords -', keywords)
    if(keywords) {
      this.searchServe.search(keywords).subscribe(res=>{
        // console.log('AppComponent - onSearch - res -', res)
        this.searchResult = this.hightlightKeyword(keywords, res);
        // console.log('AppComponent - onSearch - searchResult -', this.searchResult)
      })
    }else {
      this.searchResult = {};
    }
  }

  private hightlightKeyword(keywords: string, result: SearchResult): SearchResult {
    if(!isEmptyObject(result)){
      const reg = new RegExp(keywords, 'ig');
      ['artists', 'playlists', 'songs'].forEach(type => {
        if(result[type]) {
          result[type].forEach(item => {
            item.name = item.name.replace(reg, '<span class="highlight">$&</span>')
          });
        }
      })
    }
    return result;
  }

  onChangeModalType(modalType = ModalTypes.Default) {
    // console.log('AppComponent - onChangeModalType - type -', type);
    this.store$.dispatch(SetModalType({ modalType }));
  }
}
