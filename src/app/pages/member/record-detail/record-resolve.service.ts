import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs/internal/Observable';
import { forkJoin } from 'rxjs/internal/observable/forkJoin';
import { take } from 'rxjs/internal/operators/take';
import { Injectable } from '@angular/core';

import { MemberService } from 'src/app/services/member.service';
import { recordVal, User } from 'src/app/services/data-types/member.type';

type CenterDataType = [User, recordVal[]];

@Injectable()
export class RecordResolverService implements Resolve<CenterDataType> {
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
      ]).pipe(take(1))
    }else {
      this.router.navigate(['home'])
    }
  }
}
