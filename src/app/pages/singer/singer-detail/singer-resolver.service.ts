import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve } from "@angular/router";
import { Observable } from "rxjs/internal/Observable";
import { forkJoin } from "rxjs/internal/observable/forkJoin";
import { take } from "rxjs/internal/operators/take";

import { SingerService } from 'src/app/services/singer.service';
import { Singer, SingerDetail } from "src/app/services/data-types/common.types";

type SingerDetailDataModel = [SingerDetail, Singer[]];

@Injectable()
export class SingerResolverService implements Resolve<SingerDetailDataModel> {
  constructor(private singerServe: SingerService) {}
  resolve(route: ActivatedRouteSnapshot): Observable<SingerDetailDataModel> {
    const id = route.paramMap.get('id');
    return forkJoin(
      this.singerServe.getSingerDetail(id),
      this.singerServe.getSimiSinger(id)
    ).pipe(take(1))
  }
}
