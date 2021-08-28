import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'playCount'
})
export class PlayCountPipe implements PipeTransform {

  transform(value: number): number | string {
    if(value > 1000000) {
      return Math.floor(value / 1000000) + 'M';
    }else if(value > 1000 && value < 1000000){
      return Math.floor(value / 1000) + 'K';
    }else {
      return value;
    }
  }
}
