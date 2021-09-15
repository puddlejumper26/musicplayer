import { HttpClient, HttpParams } from "@angular/common/http";
import { Inject, Injectable } from "@angular/core";
import { Observable } from "rxjs/internal/Observable";
import { map } from "rxjs/internal/operators";

import { API_CONFIG, ServicesModule } from "./services.module";
import { SearchResult } from 'src/app/services/data-types/common.types';

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
export class SearchService {

  constructor(
    private http: HttpClient,
    @Inject(API_CONFIG) private uri: string
  ) { }

  search(keywords: string): Observable<SearchResult> {
    const params = new HttpParams().set('keywords', keywords);
    return this.http.get(this.uri + 'search/suggest', {params})
      .pipe(map((res : {result: SearchResult}) => res.result))
  }
}
