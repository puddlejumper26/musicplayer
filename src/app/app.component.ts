import { SetModalType } from './store/actions/member.actions';
import { isEmptyObject } from 'src/app/utils/tool';
import { Component } from '@angular/core';
import { Store } from '@ngrx/store';

import { User } from './services/data-types/member.type';
import { BatchActionsService } from './store/batch-actions.service';
import { ModalTypes } from './store/reducers/member.reducer';
import { AppStoreModule } from './store/index';
import { SearchResult } from './services/data-types/common.types';
import { SearchService } from './services/search.service';
import { LoginParams } from './share/wy-ui/wy-layer/wy-layer-login/wy-layer-login.component';
import { MemberService } from './services/member.service';
import { NzMessageService } from 'ng-zorro-antd';
import { codeJson } from './utils/base64';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent {
  title = 'musicplayer';
  user: User;
  wyRememberLogin: LoginParams;

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
    private batchActionsServe: BatchActionsService,
    private memberServe: MemberService,
    private messageServe: NzMessageService,
  ) {
    const userId = localStorage.getItem('wyUserId');
    if(userId) {
      this.memberServe.getUserDetail(userId).subscribe(user => {
        this.user = user;
      })
    }

    const wyRememberLogin = localStorage.getItem('wyRememberLogin');
    if(wyRememberLogin) {
      this.wyRememberLogin = JSON.parse(wyRememberLogin);
    }
  }

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

  openModal(type: ModalTypes) {
    this.batchActionsServe.controlModal(true, type);
  }

  onLogin(params: LoginParams) {
    // console.log('AppComponent - onLogin - localstorage - ', localStorage.getItem('wyRememberLogin'))
    // console.log('AppComponent - onLogin - params -', params);
    this.memberServe.login(params).subscribe(user => {
      // console.log('AppComponent - onLogin - user -', user);
      this.user = user;
      //close login modal
      this.batchActionsServe.controlModal(false);
      //pop login success
      this.alertMessage('success', 'Login Successfully!');
      // store user info into browser cache
      localStorage.setItem('wyUserId', user.profile.userId.toString());

      if(params.remember === true) {
        localStorage.setItem('wyRememberLogin', JSON.stringify(codeJson(params)));
      }else {
        localStorage.removeItem('wyRememberLogin');
      }
    }, error => {
      this.alertMessage('error', ('Error code: ' + error.error.code) || 'Login Failed!');
    })
  }

  private alertMessage(type: string, msg: string) {
    this.messageServe.create(type, msg);
  }

  onLogout() {
    this.memberServe.logout().subscribe(res => {
      // localStorage.removeItem('wyRememberLogin');
      localStorage.removeItem('wyUserId');
      this.user= null; //only this will still logged in after refresh
      this.alertMessage('success', 'Already Logged Out')
    }, error => {
      this.alertMessage('error', ('Error code: ' + error.error.code) || 'Log Out Failed!');
    });
  }
}
