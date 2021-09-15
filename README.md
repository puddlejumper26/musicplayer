<h1 align="center">Music Player</h1>

# 1.0 Purpose 
Better Angular Study

# 2.0 Enviroment & Installation
## 2.1 Environment
- Angular 8.3.0
- Angular Cli 8.3.0
- Ng-Zorro-Antd
- NgRx
- Minireset.css
- Netease Cloud Music API (Node.js API Services)
  - https://github.com/Binaryify/NeteaseCloudMusicApi
  - [DOC, in Chinese] https://binaryify.github.io/NeteaseCloudMusicApi/#/?id=neteasecloudmusicapi
  - [How to install](https://github.com/puddlejumper26/musicplayer/issues/1)
- BetterScroll 2.0
  - https://better-scroll.github.io/docs/en-US/ 

## 2.2 Installation
- Install Netease Clould Music API (follow 2.1)
  - run `node app.js`
  - All the API interfaces are running on the `localhost:3000` 
- Clone this repo to local, run the following commands
  - `git clone https://github.com/puddlejumper26/musicplayer.git` 
  - `npm install`
  - `ng serve`
  - open `localhost:4200` to see the app

# 3.0 API && Note
## 3.1 Angular
- `@SkipSelf()` - core.module.ts
- `@Optional()` - core.module.ts
- `Tree Shaking` - home.service.ts
- `InjectionToken` | `isPlatformBrowser()` - services.module.ts
- `@Inject()` - services.module.ts
- `ng-content` - wy-carousel.component.html
- `ng-template` - wy-carousel.component.html
- `@ViewChild( {static: true})` - wy-carousel.component.ts 
- `@Input()` - wy-carousel.component.ts
- `@Output()` - wy-carousel.component.ts
- `new EventEmitter<>()` - wy-carousel.component.ts
- `changeDetection` - wy-carousel.component.ts
  - `ChangeDetectionStrategy.OnPush`
- `@Pipe` - play-count.pipe.ts
- `new HttpParams` | `fromString` | `queryString`- singer.service.ts | sheet.service.ts
- `Resolve` - home-resolve.service.ts
- `encapsulation: ViewEncapsulation.None` - wy-slider.component.ts | wy-scroll.component.ts
- `ElementRef` - wy-slider.component.ts 
- `ngOnChanges` - wy-slider-handle.component.ts | wy-slider-track.component.ts
- `ChangeDetectorRef` | `markForCheck()`- wy-slider.component.ts
- `NG_VALUE_ACCESSOR` | `ngDestroy` | `ControlValueAccessor` `writeValue` `registerOnChange` `registerOnTouched`- wy-slider.component.ts
- `(ngModelChange)` | `DOCUMENT` | `Inject` - wy-player.component.html
- `AfterViewInit` | `ngAfterViewInit` - wy-scroll.component.ts
- `firstChange` | `QueryList` | `first` | `last` - wy-player-panel.component.ts
- `Renderer2` | `Renderer2.listen()` - clickoutside.directive.ts
- `ActivatedRoute.snapshot.queryParamMap` - sheet-list.component.ts
- `ActivatedRouteSnapshot` | `ActivatedRouteSnapshot.paramMap` | `ActivatedRouteSnapshot.paramMap.get()` - sheet-info-resolver.service.ts
- `this.destroy$.next() | this.destroy$.complete()` - sheet-info.component.ts
- `TemplateRef` | `ngTemplateOutlet` - wy-search.component.ts

## 3.2 Angular Material CDK

## 3.3 rxjs
- `forkJoin` | `combineLatest` - home-resolve.service.ts
- `new Observale(obsever => obsever.next())` | `Observale.create(obsever => obsever.next())` - song.service.ts
- `pluck` | `switchMap` | `mergeMap` | `concatMap` - sheet.service.ts
- `fromEvent` | `filter` | `tap` | `distinctUntilChanged` | `takeUntil` | `mgerge` replaced with `concat`- wy-slider.component.ts
- `Subscription` | `fromEvent` - wy-player.component.ts
- `timer()` - wy-scroll.component.ts | wy-player-panel.component.ts | wy-lyric.ts
- `fromEvent()` | `pluck()` | `debounceTime()` | `distinctUntilChanged()` - wy-search.component.ts 

## 3.4 dom && JS
- `slice()`| shallow copy - song.service.ts 
- `HTMLDivElement` - wy-slider.component.ts
- `MouseEvent` | `TouchEvent` | `instanceof` | `stopPropagation` | `preventDefault` - wy-slider.component.ts
- `document` | `DOCUMENT (@angular)` | `Document` - wy-slider.component.ts
- `HTMLElement.getBoundingClientRect()` | `HTMLElement.getClientRects()` | `HTMLElement.ownerDocument.defaultView` | `window.pageYOffset` | `window.pageXOffset` - wy-slider-helper.ts
- `bind` - wy-slider.component.ts
- `HTMLAudioElement` | `HTMLAudioElement.currentTime` | ``HTMLAudioElement.volume` | `HTMLAudioElement.buffered()` | `HTMLAudioElement.buffered().end(0)` | `play()` | `pause()` - wy-player.component.ts
- `(canplay)` | `(timeupdate)` | `(ended)` - wy-player.component.html
- `NodeList` - wy-player-panel.component.ts
- `| 0` | `padStart()` - format-time.pipe.ts
- `Date.now()` | `clearTimeout` - wy-lyric.ts

## 3.5 NgRx
- `createAction` | `props` - player.actions.ts
- `createReducer` | `Action` | `on`- player.reducer.ts
- `createSelector` | `createFeatureSelector`- player.selector.ts

## 3.6 Ant Design Angular | BetterScroll
- `[nzSuffix]`| `nz-input-group` | `nz-layout` | `nz-header` | `nz-menu` | `nzTheme` | `nz-menu-item` | `nz-submenu` | `nz-icon` | `nz-footer` | `nzMode` | `nzSuffixIcon` | `nz-Input` - app.component.html
- `[nzDotRender]` - home.component.html
  - `nzBeforeChange` - home.component.html 
- `ScrollBar` | `BScroll.use(ScrollBar)` | `MouseWheel` | `BScroll.use(MouseWheel)` | `bs.refresh()` | `bs.on('scrollEnd, ({y})'` | `bs.scrollToElement.apply()` | `bs.scrollTo.apply()` | - wy-scroll.component.ts
- `nzModalservice.confirm` - wy-player.component.ts
- `nzButtonStyle` | `<nz-radio-group>` | `nz-radio-button` | `<nz-pagination>` | `[nzPageSize]` | `[nzPageIndex]` | `[nzTotal]` | `(nzPageIndexChange)` - sheet-list.component.html
- `<nz-button-group>` | `nz-button` | `nzTheme` | `<nz-tag>` | `[nzData]` | `[nzFrontPagination]` | `nzBordered` | `nzNoResult` | `nzWidth` - sheet-info.component.html 

# 4.0 Commands
- `ng g c *** -s -t -c=OnPush -v=None` // -s -t -> inline the css and html

# 5.0 Demo
![](https://user-images.githubusercontent.com/80747582/124521982-cbbdc300-ddf1-11eb-94ce-2053cd32376a.png)
