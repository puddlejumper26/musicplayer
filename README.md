<h1 align="center">Music Player</h1>

# Category
[1.0 Purpose](https://github.com/puddlejumper26/musicplayer#10-purpose)
[2.0 Environment & Installation](https://github.com/puddlejumper26/musicplayer#20-enviroment--installation)
    - [2.1 Environment](https://github.com/puddlejumper26/musicplayer#21-environment)
    - [2.2 Installation](https://github.com/puddlejumper26/musicplayer#22-installation)
[3.0 API & Note](https://github.com/puddlejumper26/musicplayer#30-api--note)
    - [3.1.1 Angular [API]](https://github.com/puddlejumper26/musicplayer#311-angular-api)
    - [3.1.2 Angular [Note]](https://github.com/puddlejumper26/musicplayer#312-angular-note)
    - [3.2.1 Angular Material CDK [API]](https://github.com/puddlejumper26/musicplayer#321-angular-material-cdk-api)
    - [3.2.1 Angular Material CDK [Note]](https://github.com/puddlejumper26/musicplayer#321-angular-material-cdk-note)
    - [3.3.1 rxjs [API]](https://github.com/puddlejumper26/musicplayer#331-rxjs-api)
    - [3.3.2 rxjs [Note]](https://github.com/puddlejumper26/musicplayer#332-rxjs-note)
    - [3.4.1 Web && JS [API]](https://github.com/puddlejumper26/musicplayer#341-web--js-api)
    - [3.4.2 Web && JS [Note]](https://github.com/puddlejumper26/musicplayer#342-web--js-note)
    - [3.5.1 NgRx [API]](https://github.com/puddlejumper26/musicplayer#351-ngrx-api)
    - [3.5.2 NgRx [Note]](https://github.com/puddlejumper26/musicplayer#352-ngrx-note)
    - [3.6 Ant Design Angular | BetterScroll](https://github.com/puddlejumper26/musicplayer#36-ant-design-angular--betterscroll)
[4.0 Commands](https://github.com/puddlejumper26/musicplayer#40-commands)
[5.0 Demo](https://github.com/puddlejumper26/musicplayer#50-demo)


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
- `[@showHide]` | `(@showHide.start)` | `(@showHide.done)` | `animations` | `trigger` | `state` | `style` | `transition` | `animate` | `AnimationEvent` | `AnimationEvent.toState`- wy-player.component.ts
- `[ngSwitch]` | `*ngSwitchCase` | `select` | `*ngSwitchDefault` - wy-layer-modal.component.html


## 3.1.2 Angular [Note]

#### `ngSwitch`
- [【WyLayerLogin】ngSwitch 'loginByPhone' | Default](https://github.com/puddlejumper26/musicplayer/commit/5e8ffadbc19f0df6bdd86a503ad722394bae7595)
- ```html
  <ng-container [ngSwitch]="currentModalType">
    <ng-container *ngSwitchCase="'loginByPhone'">
      <ng-content select="[name=login]"></ng-content>
    </ng-container>
    <ng-container *ngSwitchDefault>
      <ng-content></ng-content>
    </ng-container>
  </ng-container>
  ```

#### `HTMLElement` & `nativeElement`
- `nativeElement` - single Property of ElementRef
- `HTMLElement`
- - Interface of Web API(not angular)
- - represents any HTML element
- - ```ts 
    export function getElementOffset(el: HTMLElement): {top: number, left: number} {}
    ```

  

#### Difference between `TemplateRef` & `ElementRef`
- `ElementRef` is simply like document.getElementById('myId') - only able to do some decorations - access basic native element present in DOM.
- ```ts
  class ElementRef<T = any> {
    constructor(nativeElement: T)
    nativeElement: T
  }
  ```
 ~   ~
- `TemplateRef` is an embedded template which you can use in ViewContainerRef.createEmbeddedView to create Embedded View - access DOM element within `<ng-template>`. - Structural directive uses this TemplateRef
- ```html
  <ng-template #dot let-number>
    <i class="dot" [class.active]="activeIndex === number"></i>
  </ng-template>
  ```
- ```ts
  @ViewChild('dot', {static: true}) dotRef: TemplateRef<any>;
  ```
#### wy-player.component.ts
- animation
- [【Player-ShowHide】ng-animation show-hide](https://github.com/puddlejumper26/musicplayer/commit/696b9af9c5241302bf6825b94f6469446088de3d) | [【Player-ShowHide】isLocked logics for lock](https://github.com/puddlejumper26/musicplayer/commit/ddccd0d57874393f90f47039e027567e166a2073) | [【Player-ShowHide】avoiding shaking when mouseenter | mouseleave](https://github.com/puddlejumper26/musicplayer/commit/13c36248f85ef6dcefa2dcf746770f5b22caae3e) | [【WyLayerModal】animation show | hide modal](https://github.com/puddlejumper26/musicplayer/commit/32f40b34e1ec770aefb63b8ca832dd69f31e5881)
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

#### Renderer2
- [【WyLayerModal】responsive modal position when center](https://github.com/puddlejumper26/musicplayer/commit/81aa3fa525be1ba3ab68cb67e7179d8d2dc56749) | [【WyLayerModal】remove listener of resize](https://github.com/puddlejumper26/musicplayer/commit/3e656d59135f88db896a00a3b1fe506c72184a4a)
-  ```ts
  private resizeHandler: () => void; // check the listen method its return to define the type here

  constructor(private rd: Renderer2){}
  ngAfterViewInit(): void {
    this.listenResizeToCenter();
  }
  private listenResizeToCenter() {
    this.resizeHandler = this.rd.listen('window','resize', () => {
      this.keepCenter(modal, modalSize)
    })
  }
  ngOnChanges(changes: SimpleChanges): void {
    if(changes['bindFlag'] && !changes['bindFlag'].firstChange) {
      if(this.bindFlag) {
        this.handleClick = this.rd.listen(this.doc, 'click', evt => {
          const target = evt.target;
          const isContain = this.el.nativeElement.contains(evt.target);
          if(!isContain) {
            this.onClickOutSide.emit(target);
          }
        });
      }
    }
  }
  ngOnDestroy() {
    this.resizeHandler(); // way to remove the listener
  }

## 3.2.1 Angular Material CDK [API]
- `Overlay` | `this.overlay.create()` | `this.overlay.position().flexibleConnectedTo().withPositions().withLockedPosition()` | `scrollStrategy.reposition()` |`hasBackdrop, positionStrategy, scrollStrategy`| `this.overlay.create().backdropClick()` |`this.overlay.create().attach()` | `this.overlay.create().hasAttached` | `this.overlay.create().dispose()` | `new ComponentPortal()` | - `ViewContainerRef` | wy-search.component.ts
- `entryComponents` - wy-search.module.ts
- `private scrollStrategy: BlockScrollStrategy` | `this.scrollStrategy = overlay.scrollStrategies.block()` | `this.scrollStrategy.enable()` | `this.scrollStrategy.disable()` | `OverlayContainer` - wy-layer-modal.component.ts
- `cdkDrag` | `cdkDrapHandle` | `cdkDragBoundary`- wy-layer-modal.component.html

## 3.2.1 Angular Material CDK [Note]

#### `DragDropModule`
- [【WyLayerModal】drag and drop function to modal Angular CDK](https://github.com/puddlejumper26/musicplayer/commit/7c3a5f94e24e0be0b6c3e3899b8571dcdd6b780f)
- ```html
  <div class="m-layer" [@showHide]="showModal" #modalContainer cdkDrag cdkDragBoundary=".cdk-overlay-container">
    <div class="zbar" cdkDragHandle>
      <div class="zttl f-thide">Title</div>
    </div>
    <div class="zcls" title="Close" (click)="hide()"></div>
  </div>
  ```
  ```ts
  imports: [
    DragDropModule,
  ],
  export class WyLayerModule { }
  ``` 

#### `Overlay`
- [【WyLayerModal】close click event on background when modal is open](https://github.com/puddlejumper26/musicplayer/commit/00f3f0cfb1c328a9ad50bc9345e6214e9529ab97) | [【WyLayerModal-NGRX】panel show|hide logics through NGRX](https://github.com/puddlejumper26/musicplayer/commit/892020cefe6d4a14300309d976a33b8bbe98f0b9)
- ```ts
  private overlayRef: OverlayRef;
  private overlayContainerEl: HTMLElement;
  constructor(
    private overlay: Overlay, 
    private viewContainerRef: ViewContainerRef
    private overlayContainerServe: OverlayContainer,
  ) {}

  ngAfterViewInit(){
    this.overlayContainerEl = this.overlayContainerServe.getContainerElement();
  }
  this.overlayContainerEl.style.pointerEvents = 'auto'; // close the click event on background when modal is open
  this.overlayContainerEl.style.pointerEvents = 'none'
  private showOverlayPanel() {
    this.hideOverlayPanel();

    const positionStrategy = this.overlay
                              .position()
                              .flexibleConnectedTo(this.defaultRef)
                              .withPositions([{
                                originX: 'start', // attach host bottom left
                                originY: 'bottom', // attach host bottom left
                                overlayX: 'start', // attach ele top left
                                overlayY: 'top' // attach ele top left
                              }])
                              .withLockedPosition(true);

    this.overlayRef = this.overlay.create({
      // hasBackdrop: true, // create a layer when overlay exists, for control click then hide
      positionStrategy,
      scrollStrategy: this.overlay.scrollStrategies.reposition(), //needs to use with withLockedPosition()
    });

    const panelProtal = new ComponentPortal(WySearchPanelComponent, this.viewContainerRef);
    const panelRef = this.overlayRef.attach(panelProtal);
    panelRef.instance.searchResult = this.searchResult;

    // check whether the extra layer is clicked
    this.overlayRef.backdropClick().subscribe(() => {
      this.hideOverlayPanel()
    })
  }

  private hideOverlayPanel() {
    if(this.overlayRef && this.overlayRef.hasAttached){
      this.overlayRef.dispose();
    }
  }
  ```
#### BlockScrollStrategy
- [【WyLayerModal】block scroll of homepage when modal is open](https://github.com/puddlejumper26/musicplayer/commit/138faa357fd29902b2cce7cfc45ad82e553745f1)
- ```ts
  private overlayRef: OverlayRef;
  private scrollStrategy: BlockScrollStrategy;

  constructor(private overlay: Overlay) {
    this.scrollStrategy = this.overlay.scrollStrategies.block();
  }
  ngOnInit() {
    this.createOverlay();
  }

  private createOverlay() {
    this.overlayRef = this.overlay.create();
    this.overlayRef.overlayElement.appendChild(this.elementRef.nativeElement);
    this.overlayRef.keydownEvents().subscribe(e => this.keydownListener(e));
  }
  this.scrollStrategy.enable();      
  this.scrollStrategy.disable();
  ```

## 3.3.1 rxjs [API]
- `forkJoin` | `combineLatest` - home-resolve.service.ts
- `new Observale(obsever => obsever.next())` | `Observale.create(obsever => obsever.next())` - song.service.ts
- `pluck` | `switchMap` | `mergeMap` | `concatMap` - sheet.service.ts
- `fromEvent` | `filter` | `tap` | `distinctUntilChanged` | `takeUntil` | `mgerge` replaced with `concat`- wy-slider.component.ts
- `Subscription` | `fromEvent` - wy-player.component.ts
- `timer()` - wy-scroll.component.ts | wy-player-panel.component.ts | wy-lyric.ts
- `fromEvent()` | `pluck()` | `debounceTime()` | `distinctUntilChanged()` - wy-search.component.ts 

## 3.3.2 rxjs [Note]

## 3.4.1 Web && JS [API]
- `slice()`| shallow copy - song.service.ts 
- `HTMLDivElement` - wy-slider.component.ts
- `MouseEvent` | `TouchEvent` | `instanceof` | `stopPropagation` | `preventDefault` - wy-slider.component.ts
- `document` | `DOCUMENT (@angular)` | `Document` - wy-slider.component.ts
- `HTMLElement.getBoundingClientRect()` | `HTMLElement.getClientRects()` | `HTMLElement.ownerDocument.defaultView` | `window.pageYOffset` | `window.pageXOffset` - wy-slider-helper.ts
- `bind` - wy-slider.component.ts
- `HTMLAudioElement` | `HTMLAudioElement.currentTime` | ``HTMLAudioElement.volume` | `HTMLAudioElement.buffered()` | `HTMLAudioElement.buffered().end(0)` | `play()` | `pause()` - wy-player.component.ts
- `(canplay)` | `(timeupdate)` | `(ended)` | `(error)`- wy-player.component.html
- `NodeList` - wy-player-panel.component.ts
- `| 0` | `padStart()` - format-time.pipe.ts
- `Date.now()` | `clearTimeout` - wy-lyric.ts
- `(focus)` | `(blur)` - wy-search.component.html
- `(click)` | `(mousedown)` - wy-search-panel.component.html
- `KeyboardEvent` - wy-layer-panel.component.ts

- 

## 3.4.2 Web && JS [Note]

#### `KeyboardEvent` 
- [【WyLayerModal】hide modal when cross or ESCAPE](https://github.com/puddlejumper26/musicplayer/commit/e1c2d72d6f71c133ed8315e44821ba86f5607b6a)
- ```ts
  private keydownListener(evt: KeyboardEvent){
    if(evt.key === 'Escape'){
      this.hide();
    }
  }
#### `Element`
- Base class for all element objects in a `Document`
- e.g. `HTMLElement`, `HTMLDivElement`, `HTMLAudioELement`, `SVGElement` etc

#### `HTMLElement` & `HTMLDivElement`
- `HTMLDivElement` interface extends from `HTMLElement`

#### `Document` & `DOCUMENT (Angular)` & `window` & `Window & `document`
- `Document` 
- - Interface
- - any web page loaded in the browser
- - serves as an entry point into the web page's content - dom tree
- `DOCUMENT` (angular) | `window` | `Window`
- [【WyLayerModal】Document & Window to replace](https://github.com/puddlejumper26/musicplayer/commit/7db2cb359d53fe7626f8f044874a1649b71e899b)
- - ```ts 
    import { WINDOW } from 'src/app/services/services.module';
    constrcutor(@Inject(DOCUMENT) private doc: Document, @Inject(WINDOW) private win: Window,){}
    w: this.win.innerWidth || this.doc.documentElement.clientWidth || this.doc.body.offsetWidth;
    ```
    ```ts
    export const WINDOW = new InjectionToken('WindowToken');
    @NgModule({
      providers: [
        { provide: API_CONFIG, useValue:'http://localhost:3000/'},
        {
          provide: WINDOW,
          useFactory(platformId: Object): Window | Object {
            // whether it is a browser environment
            return isPlatformBrowser(platformId) ? window : {};
          },
          //dependency , PLATFORM_ID is constant, whether the platform is server end or user end
          deps: [PLATFORM_ID]
        }
      ]
    })
    export class ServicesModule { }
    ```
- `document`
- [【WyLayerModal】center modal](https://github.com/puddlejumper26/musicplayer/commit/0d9c0f60b6ec5b80c8210acb4ad4edab308a3a88)
- - ```ts 
    declare var document: Document;
    window.innerWidth || document.documentElement.clientWidth || document.body.offsetWidth;
    ```


#### wy-player.component
- Angular animation
- ```html
  <div
    (mouseenter)="function()"
    (mouseleave)="function()"
  >
  </div>
- <audio>
  <audio
    (error)="function"
  >
  </audio>
  ```

- HTMLAudioElement
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

## 3.5.1 NgRx [API]
- `createAction` | `props` - player.actions.ts
- `createReducer` | `Action` | `on`- player.reducer.ts
- `createSelector` | `createFeatureSelector`- player.selector.ts

## 3.5.2 NgRx [Note]
#### Example
- [Add currentAction](https://github.com/puddlejumper26/musicplayer/commit/5ebdf2487a7d90201b40a28e8fa6bdb377f35db8)
- [Add member](https://github.com/puddlejumper26/musicplayer/commit/57002e31bd210fec9a0caab6e4c6c6171acf07a2)
  - **member.actions.ts**
  - ```ts
    import { createAction, props } from "@ngrx/store";
    import { ModalTypes } from "../reducers/member.reducer";

    export const SetModalVisible = createAction('[member] Set modal visible', props<{ modalVisible: boolean }>());
    export const SetModalType = createAction('[member] Set modal type', props<{ modalType: ModalTypes }>());
    ```
  - **member.reducer.ts**
  - ```ts
    import { SetModalVisible, SetModalType } from './../actions/member.actions';
    import { Action, createReducer, on } from "@ngrx/store";

    // pop up window types
    export enum ModalTypes {
      Register = 'register',
      LoginByPhone = 'loginbyphone',
      Share = 'share',
      Like = 'like',
      Default = 'default',
    }

    export type MemberState = {
        modalVisible: boolean;
        modalType: ModalTypes
    }

    export const initialState: MemberState = {
      modalVisible: false,
      modalType: ModalTypes.Default
    }

    // register 6 actions
    const reducer = createReducer(
        initialState,
        on(SetModalVisible, (state, {modalVisible}) => ({...state, modalVisible})),
        on(SetModalType, (state, {modalType}) => ({...state, modalType}))
    )

    export function memberReducer(state: MemberState, action: Action) {
        return reducer(state, action);
    }
    ```
  - **member.selector.ts**
  - ```ts
    import { createFeatureSelector, createSelector } from '@ngrx/store';

    import { MemberState } from '../reducers/member.reducer';

    const selectMemberStates = (state: MemberState) => state;

    // to obtain the member
    /**
    * @member has to be identical with the index.ts ->     StoreModule.forRoot({member: memberReducer},
    */
    export const getMember = createFeatureSelector<MemberState>('member');

    export const getModalVisible = createSelector(selectMemberStates, (state: MemberState) => state.modalVisible);
    export const getModalType = createSelector(selectMemberStates, (state: MemberState) => state.modalType);
    ```
  - **index.ts (AppStoreModule)**
  - ```ts
    @NgModule({
      declarations: [],
      imports: [
        CommonModule,
        StoreModule.forRoot({member: memberReducer}, {
          runtimeChecks: {
            strictStateImmutability: true,
            strictActionImmutability: true
          }
        }),
        StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production })
      ]
    })
    
    export class AppStoreModule {}
    ```
  - **Application in the component**
  - ```ts
    import { AppStoreModule } from 'src/app/store';
    import { getMember, getModalVisible, getModalType } from './../../../../store/selectors/member.selector';

    constructor(
      private store$: Store<AppStoreModule>
    ) {
      const appStore$ = this.store$.pipe(select(getMember));
      appStore$.pipe(select(getModalVisible)).subscribe(visib => {
        console.log('WyLayerModalComponent - constructore - visib - ', visib);
      });
      appStore$.pipe(select(getModalType)).subscribe(type => {
        console.log('WyLayerModalComponent - constructore - type - ', type);
      })
    }
    ```

## 3.6 Ant Design Angular | BetterScroll
- `[nzSuffix]`| `nz-input-group` | `nz-layout` | `nz-header` | `nz-menu` | `nzTheme` | `nz-menu-item` | `nz-submenu` | `nz-icon` | `nz-footer` | `nzMode` | `nzSuffixIcon` | `nz-Input` - app.component.html
- `[nzDotRender]` - home.component.html
  - `nzBeforeChange` - home.component.html 
- `ScrollBar` | `BScroll.use(ScrollBar)` | `MouseWheel` | `BScroll.use(MouseWheel)` | `bs.refresh()` | `bs.on('scrollEnd, ({y})'` | `bs.scrollToElement.apply()` | `bs.scrollTo.apply()` | - wy-scroll.component.ts
- `nzModalservice.confirm` - wy-player.component.ts
- `nzButtonStyle` | `<nz-radio-group>` | `nz-radio-button` | `<nz-pagination>` | `[nzPageSize]` | `[nzPageIndex]` | `[nzTotal]` | `(nzPageIndexChange)` - sheet-list.component.html
- `<nz-button-group>` | `nz-button` | `nzTheme` | `<nz-tag>` | `[nzData]` | `[nzFrontPagination]` | `nzBordered` | `nzNoResult` | `nzWidth` - sheet-info.component.html 
- `nz-tooltip` | `[nzTooltipTitle]` | `[nzVisible]` | `nzOverlayClassName` - wy-player.component.html

# 4.0 Commands
- `ng g c *** -s -t -c=OnPush -v=None` // -s -t -> inline the css and html

# 5.0 Demo
Homepage
![](https://user-images.githubusercontent.com/80747582/133734382-698c7f59-7565-4c51-8f8d-964b32488b9d.png)
Player Panel
Sheet List(Album Sheet)
Singer List
Singer Detail
Song Detail
Login
