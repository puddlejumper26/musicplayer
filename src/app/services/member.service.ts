import  queryString from 'query-string';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/internal/operators'

import { SampleBack, SongSheet } from './data-types/common.types';
import { LoginParams } from '../share/wy-ui/wy-layer/wy-layer-login/wy-layer-login.component';
import { recordVal, Signin, User, UserRecord, UserSheet } from './data-types/member.type';
import { ServicesModule, API_CONFIG } from './services.module';

export enum RecordType {
  allData,
  weekData
}

export type LikeSongParams = {
  pid: string;
  tracks: string;
}

const records = ['allData', 'weekData'];

@Injectable({
  /**
   *  ServiceModule will provide with HomeService
   *   same as put HomeService into the provicers inside ServiceModule
   *   cause the second method could be delete when it is not used when Tree shaking
   *
   *   @TreeShaking is to auto delete the module or package in the APP which is imported but not used when generating pacakge
   */
  providedIn: ServicesModule,
})
export class MemberService {

  constructor(
    private http: HttpClient,
    @Inject(API_CONFIG) private uri: string
  ) { }

  login(formValue: LoginParams): Observable<User> {
    const params = new HttpParams({ fromString: queryString.stringify(formValue)});
    return this.http.get(this.uri + 'login/cellphone', {params})
      .pipe(map((res) => res as User))
  }

  getUserDetail(uid: string): Observable<User>{
    // const params = new HttpParams({ fromString: queryString.stringify({uid})});
    const params = new HttpParams().set('uid', uid);
    return this.http.get(this.uri + 'user/detail', {params})
      .pipe(map(res => res as User))
  }

  logout(): Observable<SampleBack> {
    return this.http.get(this.uri + 'logout')
      .pipe(map(res => res as SampleBack))
  }

  // daily sign in
  signin(): Observable<Signin> {
    const params = new HttpParams({ fromString: queryString.stringify({ type: 1})});
    return this.http.get(this.uri + 'daily_signin', { params })
      .pipe(map(res => res as Signin));
  }

  getUserRecord(uid: string, type = RecordType.allData): Observable<recordVal[]> {
    const params = new HttpParams({ fromString: queryString.stringify({ uid, type}) });
    return this.http.get(this.uri + 'user/record', { params })
      .pipe(map((res: UserRecord) => res[records[type]]))
  }

  getUserSheets(uid: string): Observable<UserSheet> {
    const params = new HttpParams({ fromString: queryString.stringify({ uid }) });
    return this.http.get(this.uri + 'user/playlist', { params })
      .pipe(map((res: { playlist: SongSheet[] }) => {
        const list = res.playlist;
        return {
          self: list.filter(item => !item.subscribed),
          subscribed: list.filter(item => item.subscribed)
        }
      }))
  }

  // add liked songs into sheet
  likeSong({ pid, tracks }: LikeSongParams): Observable<number> {
    const params = new HttpParams({ fromString: queryString.stringify({ pid, tracks, op: 'add' })});
    return this.http.get(this.uri + 'playlist/tracks', {params}).pipe(map((res: SampleBack) => res.code))
  }

  likeSheet(id: string, t =1): Observable<number> {
    const params = new HttpParams({ fromString: queryString.stringify( {id, t} )});
    return this.http.get(this.uri + 'playlist/subscribe', {params}).pipe(map((res: SampleBack) => res.code))
  }

  createSheet(name: string): Observable<string> {
    const params = new HttpParams({ fromString: queryString.stringify({ name })});
    return this.http.get(this.uri + 'playlist/create', { params }).pipe(map((res: SampleBack) => res.id.toString() ))
  }

  shareResource(id: string, msg: string, type= 'song'): Observable<number> {
    const params = new HttpParams({ fromString: queryString.stringify({ id, msg, type })});
    return this.http.get(this.uri + 'share/resource', { params }).pipe(map((res: SampleBack) => res.code))
  }
}
