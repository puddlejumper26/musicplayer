import { HttpClient, HttpParams } from "@angular/common/http";
import { Inject, Injectable } from "@angular/core";
import { Observable } from "rxjs/internal/Observable";
import { map, pluck, switchMap } from "rxjs/internal/operators";
import queryString from 'query-string';

import { API_CONFIG, ServicesModule } from "./services.module";
import { SheetList, Song, SongSheet } from 'src/app/services/data-types/common.types';
import { SongService } from "./song.service";

export type SheetParams = {
  offset: number;
  limit: number;
  order: 'new' | 'hot';
  cat: string;
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
export class SheetService {

  constructor(
    private http: HttpClient,
    @Inject(API_CONFIG) private uri: string,
    private songServe: SongService
  ) { }

  /**
   * Obtain sheets
   */
  getSheets(args: SheetParams): Observable<SheetList> {
    const params = new HttpParams({ fromString: queryString.stringify(args)});
    return this.http.get(this.uri + 'top/playlist', {params}).pipe(map(res => res as SheetList));
  }


  /**
     *  here @getSongSheetDetail will only return the albums and all the songs inside, but these songs are without play url
     *  so we need to concat another data, check @songService -> @generateSongList function
     */
  getSongSheetDetail(id: number): Observable<SongSheet> {
    // note here is different from singer.serive, cause here is only one id
    const params = new HttpParams().set('id', id.toString());
    return this.http.get(this.uri + 'playlist/detail', { params })
      .pipe(map((res: { playlist: SongSheet}) => res.playlist))
  }

  playSheet(id: number): Observable<Song[]> {
    return this.getSongSheetDetail(id)
      /**
       *  @pluck we only need the information under tracks in the playsheet, so using pluck to pick it out
       *  @switchMap latten the data into one Observable but only need the @latest
       *  @mergeMap flatten the data into one Observable
       *  @concatMap  flatten the data into one Observable and the order is important
       *      basically here all of them are applicable
       */
      .pipe(pluck('tracks'), switchMap(tracks => this.songServe.getSongList(tracks)) )
  }
}
