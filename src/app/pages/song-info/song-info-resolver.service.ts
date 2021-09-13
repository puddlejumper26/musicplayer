import { forkJoin } from 'rxjs';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Injectable } from "@angular/core";

import { SongService } from 'src/app/services/song.service';
import { Lyric, Song } from 'src/app/services/data-types/common.types';
import { Observable } from 'rxjs/internal/Observable';
import { take } from 'rxjs/internal/operators';

type SongDataModel = [Song, Lyric];

@Injectable()
export class SongInfoResolverService implements Resolve<SongDataModel> {
  constructor(private songServe: SongService) {}
  resolve(route: ActivatedRouteSnapshot): Observable<SongDataModel> {
    const id = route.paramMap.get('id');
    return forkJoin([
      this.songServe.getSongDetail(id),
      this.songServe.getLyric(Number(id))
    ]).pipe(take(1));
  }
}
