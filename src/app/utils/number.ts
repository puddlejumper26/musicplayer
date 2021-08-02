import { SliderValue } from './../share/wy-ui/wy-slider/wy-slider-types';

export function limitNumberInRange(val: number, min: number, max: number): number {
    return Math.min(Math.max(val, min), max)
}

export function getPercent(min: number, max: number, val: SliderValue): number {
    return ((val - min) / (max - min)) * 100;
}

// get a random number(Int) between min and max, min and max could also be taken
export function getRandomInt(range: [number, number]): number {
  const randomNum = Math.floor(Math.random() * (range[1] - range[0] + 1) + range[0])
  return randomNum; // without +1 then could not return range[1]
}
