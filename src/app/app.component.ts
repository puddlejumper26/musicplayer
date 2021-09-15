import { Component } from '@angular/core';
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

  constructor(private searchServe: SearchService) {}

  onSearch(keywords: string) {
    // console.log('AppComponent - onSearch - keywords -', keywords)
    if(keywords) {
      this.searchServe.search(keywords).subscribe(res=>{
        console.log('AppComponent - onSearch - res -', res)
      })
    }
  }
}
