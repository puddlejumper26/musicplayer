import { Injectable } from "@angular/core";
import { Resolve } from "@angular/router";
import { forkJoin, Observable } from "rxjs";
import { first, take } from "rxjs/internal/operators";

import { Banner, HotTag, Singer, SongSheet } from "src/app/services/data-types/common.types";
import { HomeService } from "src/app/services/home.service";
import { SingerService } from "src/app/services/singer.service";

type HomeDataType = [Banner[], HotTag[], SongSheet[], Singer[]];

/**
 *  @resover is to render the page before the page is loaded, to make user experience better
 *  when the home.component.ts uses this resolve, we don't need to consider where does the data come from in the home.component
 */
@Injectable()
export class HomeResolverService implements Resolve<HomeDataType> {
    constructor(private homeServe: HomeService,
        private singerServe: SingerService,){}

    resolve(): Observable<HomeDataType> {
        /**
         * @forJoin  send an array composed by the lastest observable datas when all flows finish
         * @combineLatest send an array composed by the lastest observable datas, as soon as any flow  finishes, its data would be sent
         */
        return forkJoin([
            this.homeServe.getBanner(),
            this.homeServe.getHotTags(),
            this.homeServe.getPersonalSheetList(),
            this.singerServe.getEnterSinger(),
        ]).pipe(take(1));
    }
}