import  queryString from 'query-string';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/internal/operators'

import { LoginParams } from '../share/wy-ui/wy-layer/wy-layer-login/wy-layer-login.component';
import { User } from './data-types/member.type';
import { ServicesModule, API_CONFIG } from './services.module';

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
    const params = new HttpParams({ fromString: queryString.stringify(uid)});
    return this.http.get(this.uri + 'user/detail', {params})
      .pipe(map(res => res as User))
  }
}
