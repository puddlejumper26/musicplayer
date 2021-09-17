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
## 3.1.1 Angular [API]
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
- `[@showHide]` | `(@showHide.start)` | `(@showHide.done)` | `animations` | `trigger` | `state` | `style` | `transition` | `animate` - wy-player.component.ts


## 3.1.2 Angular [Note]
#### wy-player.component.ts
- animation
- [【Player-ShowHide】ng-animation show-hide](https://github.com/puddlejumper26/musicplayer/commit/696b9af9c5241302bf6825b94f6469446088de3d) | [【Player-ShowHide】isLocked logics for lock](https://github.com/puddlejumper26/musicplayer/commit/ddccd0d57874393f90f47039e027567e166a2073) | [【Player-ShowHide】avoiding shaking when mouseenter | mouseleave](https://github.com/puddlejumper26/musicplayer/commit/13c36248f85ef6dcefa2dcf746770f5b22caae3e)

```ts
-----html
  [@showHide]="showPlayer"
  (@showHide.start)="animating = true"
  (@showHide.done)="animating = false"
  (mouseenter)="togglePlayer('show')"
  (mouseleave)="togglePlayer('hide')"
-----ts
    animations: [trigger('showHide', [
    state('show', style({bottom: 0})),
    state('hide', style({bottom: -71})),
    transition('show=>hide', [animate('0.3s')]),
    transition('hide=>show', [animate('0.1s')])
  ])]
``` 
- 
-  

## 3.2.1 Angular Material CDK [API]
- `Overlay` | `this.overlay.create()` | `this.overlay.position().flexibleConnectedTo().withPositions().withLockedPosition()` | `scrollStrategy.reposition()` |`hasBackdrop, positionStrategy, scrollStrategy`| `this.overlay.create().backdropClick()` |`this.overlay.create().attach()` | `this.overlay.create().hasAttached` | `this.overlay.create().dispose()` | `new ComponentPortal()` | - `ViewContainerRef` | wy-search.component.ts
- `entryComponents` - wy-search.module.ts

## 3.2.1 Angular Material CDK [Note]
## 3.3 rxjs
- `forkJoin` | `combineLatest` - home-resolve.service.ts
- `new Observale(obsever => obsever.next())` | `Observale.create(obsever => obsever.next())` - song.service.ts
- `pluck` | `switchMap` | `mergeMap` | `concatMap` - sheet.service.ts
- `fromEvent` | `filter` | `tap` | `distinctUntilChanged` | `takeUntil` | `mgerge` replaced with `concat`- wy-slider.component.ts
- `Subscription` | `fromEvent` - wy-player.component.ts
- `timer()` - wy-scroll.component.ts | wy-player-panel.component.ts | wy-lyric.ts
- `fromEvent()` | `pluck()` | `debounceTime()` | `distinctUntilChanged()` - wy-search.component.ts 

## 3.4 dom && JS [API]
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
- `(focus)` | `(blur)` - wy-search.component.html
- `(click)` | `(mousedown)` - wy-search-panel.component.html
- wy-player.component.html

- 

## 3.4 dom && JS [Note]
#### wy-player.component
- Angular animation
- ```html
  <div
    (mouseenter)="function()"
    (mouseleave)="function()"
  >
  </div>
  ```

- HTMLAudioElement
- 
- ```ts
  @ViewChild('audio', { static: true }) private audio: ElementRef;
  private audioEl: HTMLAudioElement;
  this.audioEl = this.audio.nativeElement;
  const currentTime = this.duration * (per / 100);
    this.audioEl.currentTime = currentTime;
  onVolumnChange(per: number) {
    this.audioEl.volume = per / 100;
  }
  this.currentTime = (<HTMLAudioElement>e.target).currentTime;
    this.percent = (this.currentTime / this.duration) * 100;
  const buffered = this.audioEl.buffered;
  this.audioEl.play();
  this.audioEl.pause();
  ```

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
Homepage
![](https://user-images.githubusercontent.com/80747582/133734382-698c7f59-7565-4c51-8f8d-964b32488b9d.png)
