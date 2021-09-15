import { HttpClient, HttpParams } from "@angular/common/http";
import { Inject, Injectable } from "@angular/core";
import { Observable } from "rxjs/internal/Observable";
import { map } from "rxjs/internal/operators";

import { API_CONFIG, ServicesModule } from "./services.module";
import { Lyric, Song, SongUrl } from 'src/app/services/data-types/common.types';

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
export class SongService {

  constructor(
    private http: HttpClient,
    @Inject(API_CONFIG) private uri: string
  ) { }

  getSongUrl(ids: string): Observable<SongUrl[]> {
    // note here is different from singer.serive, cause here is only one id
    const params = new HttpParams().set('id', ids);
    return this.http.get(this.uri + 'song/url', { params })
      .pipe(map((res: { data: SongUrl[] }) => res.data))
  }

  /**
   * @slice here is to shallow copy, avoid contaiminate the original data
   */
  // cause it could play one song or entire album
  getSongList(songs: Song | Song[]): Observable<Song[]> {
    const songArr = Array.isArray(songs) ? songs.slice() : [songs];
    // To make an array through all potential ids
    const ids = songArr.map(item => item.id).join(',');

    //
    /** cause the return should be a flow, so here to create a flow
     *
     *  @create and @new
     *
     *  return new Observable(observer => {
     */
    // return Observable.create(observer => {
    //   this.getSongUrl(ids).subscribe(urls => {
    //     observer.next(this.generateSongList(songArr, urls));
    //   })
    // })

    // we could use this to replace the method above. Due to the this.getSongUrl(ids) returns a flow
    return this.getSongUrl(ids).pipe(map(urls => this.generateSongList(songArr, urls)));
  }

  private generateSongList(songs: Song[], urls: SongUrl[]): Song[] {
    const result = [];
    songs.forEach(song => {
      const url = urls.find(url => url.id === song.id).url;
      if(url) {
        // console.log('songService - generateSongList - song -', song);
        // console.log('songService - generateSongList - url -', url);
        result.push({ ...song, url });
        // console.log('songService - generateSongList - result -', result)
      }
    });
    return result;
  }

  getSongDetail(ids: string): Observable<Song>{
    const params = new HttpParams().set('ids', ids);
    return this.http.get(this.uri + 'song/detail', {params})
      .pipe(map((res: {songs : Song}) => res.songs[0]))
  }

  getLyric(id: number): Observable<Lyric> {
      const params = new HttpParams().set('id', id.toString());
      return this.http.get(this.uri + 'lyric', { params })
        .pipe(map((res: { [ key: string ]: { lyric: string }}) => { // here for res is to define the type of data
          try{
            return {
              lyric: res.lrc.lyric,
              tlyric: res.tlyric.lyric
            }
          }catch(err){
            return {
              lyric: '',
              tlyric: ''
            }
          }
        }));
  }
}
