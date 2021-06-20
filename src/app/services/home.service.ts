import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/internal/operators'
import { Banner } from './data-types/common.types';
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
export class HomeService {

  constructor(
    private http: HttpClient,
    @Inject(API_CONFIG) private uri: string 
  ) { }

  getBanner(): Observable<Banner[]> {
    return this.http.get(this.uri + 'banner')
      .pipe(map((res: { banners: Banner[]}) => res.banners))
  }
}
