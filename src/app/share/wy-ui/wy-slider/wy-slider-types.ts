import { Observable } from 'rxjs/internal/Observable';

export type WySliderStyle = {
    width? : string | null;
    height? : string | null;
    left? : string | null;
    bottom? : string | null;
}

export type SliderEventObserverConfig = {
    start: string;
    move: string;
    end: string;
    filter: (e: Event) => boolean;
    pluckKey: string[];
    startPlucked$?: Observable<number>;
    moveResolved$?: Observable<number>;
    end$?: Observable<Event>
}