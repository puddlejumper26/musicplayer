import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve } from "@angular/router";

import { SingerService } from 'src/app/services/singer.service';
import { SingerDetail } from "src/app/services/data-types/common.types";
import { Observable } from "rxjs/internal/Observable";

@Injectable()
export class SingerResolverService implements Resolve<SingerDetail> {
  constructor(private singerServe: SingerService) {}
  resolve(route: ActivatedRouteSnapshot): Observable<SingerDetail> {
    const id = route.paramMap.get('id');
    return this.singerServe.getSingerDetail(id);
  }
}
