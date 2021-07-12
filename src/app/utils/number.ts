import { SliderValue } from './../share/wy-ui/wy-slider/wy-slider-types';

export function limitNumberInRange(val: number, min: number, max: number): number {
    return Math.min(Math.max(val, min), max)
}

export function getPercent(min: number, max: number, val: SliderValue): number {
    return ((val - min) / (max - min)) * 100;
}