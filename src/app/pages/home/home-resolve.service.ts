import { StorageService } from './../../services/storage.service';
import { Injectable } from "@angular/core";
import { Resolve } from "@angular/router";
import { forkJoin, Observable, of } from "rxjs";
import { first, take } from "rxjs/internal/operators";

import { Banner, HotTag, Singer, SongSheet } from "src/app/services/data-types/common.types";
import { HomeService } from "src/app/services/home.service";
import { MemberService } from "src/app/services/member.service";
import { SingerService } from "src/app/services/singer.service";
import { User } from 'src/app/services/data-types/member.type';

type HomeDataType = [Banner[], HotTag[], SongSheet[], Singer[]];

/**
 *  @resover is to render the page before the page is loaded, to make user experience better
 *  when the home.component.ts uses this resolve, we don't need to consider where does the data come from in the home.component
 */
@Injectable()
export class HomeResolverService implements Resolve<HomeDataType> {
    constructor(
        private homeServe: HomeService,
        private singerServe: SingerService,
        private memberServe: MemberService,
        private storageServe: StorageService
    ){}

    resolve(): Observable<HomeDataType> {

        // const userId = this.storageServe.getStorage('wyUserId');
        // let detail$ = of(null);
        // if(userId) {
        //   detail$ = this.memberServe.getUserDetail(userId);
        // }

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
