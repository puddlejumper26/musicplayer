import { Lyric } from "src/app/services/data-types/common.types";

export class WyLyric {

  private lrc: Lyric;

  constructor(lrc: Lyric) {
    this.lrc = lrc;
    this.init();
  }

  private init() {
    if(this.lrc.tlyric) {
      // means it is an english song, with both english and chinese lyrics
      this.generTLyric();
    }else {
      this.generLyric();
    }
  }

  private generLyric() {
    console.log('generLyric - this.lrc.lrc - ', this.lrc.lyric);

  }

  private generTLyric() {

  }
}
