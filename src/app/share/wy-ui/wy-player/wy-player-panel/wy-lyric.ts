import { timer } from "rxjs";
import { Subject } from "rxjs/internal/Subject";
import { Subscription } from "rxjs/internal/Subscription";

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
  private pauseStamp: number;

  private timer$: Subscription;
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

  play(startTime = 0, skip = false) {
    if(!this.lines.length) return;
    if(!this.playing) {
      this.playing = true;
    }

    // find which line should for current time
    this.curNum = this.findCurNum(startTime);
    // console.log('play - this.curNum - ', this.curNum);
    this.startStamp = Date.now() - startTime;
    // this.callHandler()

    if(!skip) {
      this.callHandler(this.curNum);
    }

    if(this.curNum < this.lines.length) {
      this.clearTimer();
      // clearTimeout(this.timer);

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

    // replace the following setTimeout
    this.timer$ = timer(delay).subscribe(() => {
      this.callHandler(this.curNum++);
      // still have lyric and still playing
      if(this.curNum < this.lines.length && this.playing) {
        this.playReset();
      }
    })

    // for each line of lyric played, needs to be sent outside, so sent this.curNum, and then after sent, add 1 to this.curNum
    // this.timer = setTimeout(()=>{
    //   this.callHandler(this.curNum++);
    //   // still have lyric and still playing
    //   if(this.curNum < this.lines.length && this.playing) {
    //     this.playReset();
    //   }
    // }, delay);
  }

  private clearTimer() {
    this.timer$ && this.timer$.unsubscribe;
  }

  // i: index
  // here using Subject to send the data, then inside of other component to subscribe this method, to obtain the data.
  // e.g. handleLyric of WyPlayerPanel
  private callHandler(i : number) {
    // to avoid here sends too fast, and dom (handleLyric in PlayerPanel) could not receive data, results in lyrics wouldn't scroll
    if(i > 0) {
      this.handler.next({
        txt: this.lines[i].txt,
        txtCn: this.lines[i].txtCn,
        lineNum: i,
      });
    }
  }

  togglePlay(playing: boolean) {
    const now = Date.now();
    this.playing = playing;
    if(playing) {
      const startTime = (this.pauseStamp || now) - (this.startStamp || now)
      this.play(startTime, true);
    }else {
      this.stop();
      this.pauseStamp = now;
    }
  }

  stop() {
    if(this.playing) {
      this.playing = false;
    }

    this.clearTimer()
    // clearTimeout(this.timer);
  }

  //
  seek(time: number) {
    this.play(time);
  }
}
