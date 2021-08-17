import { Subject } from "rxjs/internal/Subject";
import { Lyric } from "src/app/services/data-types/common.types";

// type LyricLine = { txt: string; txtCn: string; time: number};
//[00:34:332]
const timeExp = /\[(\d{2}):(\d{2})\.(\d{2,3})\]/;

export interface BaseLyricLine {
  txt: string;
  txtCn: string;
}

interface LyricLine extends BaseLyricLine {
  time: number;
}
interface Handler extends BaseLyricLine {
  lineNum: number; // current lyric line index
}

export class WyLyric {

  lines: LyricLine[] = [];

  private lrc: Lyric;
  private curNum: number;
  private startStamp: number;
  // playing status
  private playing = false;

  handler = new Subject<Handler>();

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
    // console.log('generLyric - this.lrc.lrc - ', this.lrc.lyric);
    let lines = [];
    if(this.lrc.lyric) {
      lines = this.lrc.lyric.split('\n');
      // console.log('generLyric - lines --', lines);
      lines.forEach(line => this.makeLine(line));
      // console.log('generLyric - lines -- ', this.lines);
    }
  }

  private generTLyric() {

  }

  private makeLine(line: string) {
    // check whether this line has time stamp
    const result = timeExp.exec(line);
    // console.log('makeLine - result ---', result);
    if(result) {
      const txt = line.replace(timeExp, '').trim();
      const txtCn='';
      if(txt) {
        const thirdResult = result[3] || '0';
        const len = thirdResult.length;
        const _thirdResult = len > 2 ? parseInt(thirdResult) : parseInt(thirdResult) * 10;
        const time = Number(result[1]) * 60 * 1000 + Number(result[2]) * 1000 + _thirdResult;
        this.lines.push({txt, txtCn, time});
      }
    }

  }

  play(startTime = 0) {
    if(!this.lines.length) return;
    if(!this.playing) {
      this.playing = true;
    }

    // find which line should for current time
    this.curNum = this.findCurNum(startTime);
    // console.log('play - this.curNum - ', this.curNum);
    this.startStamp = Date.now() - startTime;
    // this.callHandler()

    if(this.curNum < this.lines.length) {
      // continue to play
      this.playReset();
    }
  }

  private findCurNum(time: number): number{
    const index = this.lines.findIndex(item => time <= item.time)
    return index === -1 ? (this.lines.length - 1) : index;
  }

  private playReset() {
    let line =this.lines[this.curNum];
    const delay = line.time - (Date.now() - this.startStamp);
    // for each line of lyric played, needs to be sent outside, so sent this.curNum, and then after sent, add 1 to this.curNum
    setTimeout(()=>{
      this.callHandler(this.curNum++);
      // still have lyric and still playing
      if(this.curNum < this.lines.length && this.playing) {
        this.playReset();
      }
    }, delay);
  }

  // i: index
  private callHandler(i : number) {
    this.handler.next({
      txt: this.lines[i].txt,
      txtCn: this.lines[i].txtCn,
      lineNum: i,
    });
  }
}
