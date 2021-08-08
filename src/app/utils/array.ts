import { Song } from "../services/data-types/common.types";
import { getRandomInt } from "./number";

export function inArray(arr: any[], target: any): boolean {
    return arr.indexOf(target) !== -1;
}

/**
 *
 *  @T is defined in shuffle<T>, and used as a type to regulate the data
 */
export function shuffle<T>(arr: T[]): T[] {
  const result = arr.slice();
  for(let i = 0; i < result.length; i++) {
    // a random number between 0 and i
    const j = getRandomInt([0, i]);
    console.log('shuffle - j - ', j);
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

export function findIndex(list: Song[], currentSong: Song): number {
  return list.findIndex(item => item.id === currentSong.id);
}
