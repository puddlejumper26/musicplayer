import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs/internal/Observable';
import { forkJoin } from 'rxjs/internal/observable/forkJoin';
import { take } from 'rxjs/internal/operators/take';
import { Injectable } from '@angular/core';

import { MemberService } from 'src/app/services/member.service';
import { recordVal, User, UserSheet } from 'src/app/services/data-types/member.type';

type CenterDataType = [User, recordVal[], UserSheet];

@Injectable()
export class CenterResolverService implements Resolve<CenterDataType> {
  constructor(
    private memberServe: MemberService,
    private router: Router
  ) {}

  resolve(route: ActivatedRouteSnapshot): Observable<CenterDataType> {
    const uid = route.paramMap.get('id');
    if(uid) {
      return forkJoin([
        this.memberServe.getUserDetail(uid),
        this.memberServe.getUserRecord(uid),
        this.memberServe.getUserSheets(uid),
      ]).pipe(take(1))
    }else {
      this.router.navigate(['home'])
    }
  }
}
