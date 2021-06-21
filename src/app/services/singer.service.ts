import { HttpClient, HttpParams } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/internal/operators'
import { Singer } from './data-types/common.types';
import { ServicesModule, API_CONFIG } from './services.module';
import queryString from 'query-string';

type SingerParams = {
  offset: number; // split pages
  limit: number; // how many on each page
  type?: string;
  area?: string;
}

const defaultParams: SingerParams = {
  offset: 0,
  limit: 9,
  type: '2',
  area: '96'
}

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
export class SingerService {

  constructor(
    private http: HttpClient,
    @Inject(API_CONFIG) private uri: string 
  ) { }

  getEnterSinger(args: SingerParams = defaultParams): Observable<Singer[]> {
    const params = new HttpParams({ fromString: queryString.stringify(args) });
    return this.http.get(this.uri + 'artist/list', { params })
      .pipe(map((res: { artists: Singer[]}) => res.artists))
  }
}
