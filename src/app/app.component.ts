import { Component } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { NzMessageService } from 'ng-zorro-antd';

import { SetModalType, SetModalVisible, SetUserId } from './store/actions/member.actions';
import { isEmptyObject } from 'src/app/utils/tool';
import { StorageService } from './services/storage.service';
import { User } from './services/data-types/member.type';
import { BatchActionsService } from './store/batch-actions.service';
import { ModalTypes } from './store/reducers/member.reducer';
import { AppStoreModule } from './store/index';
import { SearchResult, SongSheet } from './services/data-types/common.types';
import { SearchService } from './services/search.service';
import { LoginParams } from './share/wy-ui/wy-layer/wy-layer-login/wy-layer-login.component';
import { MemberService } from './services/member.service';
import { codeJson } from './utils/base64';
import { getLikeId, getMember } from './store/selectors/member.selector';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent {
  title = 'musicplayer';
  user: User;
  wyRememberLogin: LoginParams;
  mySheets: SongSheet[];

  likeId: string;

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
    private storageServe: StorageService
  ) {
    const userId = this.storageServe.getStorage('wyUserId');
    if(userId) {
      this.store$.dispatch(SetUserId({ userId: userId }));
      this.memberServe.getUserDetail(userId).subscribe(user => {
        this.user = user;
      })
    }

    const wyRememberLogin = this.storageServe.getStorage('wyRememberLogin');
    if(wyRememberLogin) {
      try{
        this.wyRememberLogin = JSON.parse(wyRememberLogin);
      }
      catch(error){
        this.alertMessage('warn', error);
        console.log(error)
      }
    }

    this.listenStates();
  }

  private listenStates() {
    const appStore$ = this.store$.pipe(select(getMember));
    appStore$.pipe(select(getLikeId)).subscribe(id => {
      this.watchLikeId(id)
    });
  }

  private watchLikeId(id: string) {
    if(id) {
      this.likeId = id;
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

  //obtain current user songsheet
  onLoadMySheets() {
    if(this.user){
      this.memberServe.getUserSheets(this.user.profile.userId.toString()).subscribe(userSheet => {
        this.mySheets = userSheet.self;
        this.store$.dispatch(SetModalVisible({ modalVisible: true }))
      })
    } else {
      this.openModal(ModalTypes.Default)
    }
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
      // localStorage.setItem('wyUserId', user.profile.userId.toString());
      this.storageServe.setStorage({
        key: 'wyUserId',
        value: user.profile.userId.toString()
      })

      this.store$.dispatch(SetUserId({ userId: user.profile.userId.toString() }));

      if(params.remember === true) {
        // localStorage.setItem('wyRememberLogin', JSON.stringify(codeJson(params)));
        this.storageServe.setStorage({
          key: 'wyRememberLogin',
          value: JSON.stringify(codeJson(params))
        })
      }else {
        // localStorage.removeItem('wyRememberLogin');
        this.storageServe.removeStorage('wyRememberLogin');
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
      // localStorage.removeItem('wyUserId');
      this.storageServe.removeStorage('wyUserId')
      this.store$.dispatch(SetUserId({ userId: '' }));
      this.user= null; //only this will still logged in after refresh
      this.alertMessage('success', 'Already Logged Out')
    }, error => {
      this.alertMessage('error', ('Error code: ' + error.error.code) || 'Log Out Failed!');
    });
  }
}
