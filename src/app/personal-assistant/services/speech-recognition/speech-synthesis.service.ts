import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

let voices: Array<SpeechSynthesisVoice>;
let alexaVoice: any;

@Injectable()
export class SpeechSynthesisService {
  chunkLength = 150;
  synthesisCount = 0;

  constructor() {
    if (
      typeof (<any>window).speechSynthesis !== 'undefined' &&
      (<any>window).speechSynthesis.onvoiceschanged !== undefined
    ) {
      speechSynthesis.onvoiceschanged = this.populateVoiceList;
    }
  }

  populateVoiceList() {
    if (typeof (<any>window).speechSynthesis === 'undefined') {
      return;
    }

    voices = (<any>window).speechSynthesis.getVoices();
    alexaVoice = voices.filter(voice => {
      return voice.name === 'Google US English';
    })[0];
  }

  speak(text: string): void {
    const msg = new (<any>window).SpeechSynthesisUtterance();

    msg.default = false;
    msg.lang = 'en-US';
    msg.voice = alexaVoice;
    msg.text = text;

    if (msg.text.length > this.chunkLength) {
      const pattRegex = new RegExp(
        '^[\\s\\S]{' +
          Math.floor(this.chunkLength / 2) +
          ',' +
          this.chunkLength +
          // tslint:disable-next-line:max-line-length
          '}[.!?,]{1}|^[\\s\\S]{1,' +
          this.chunkLength +
          '}$|^[\\s\\S]{1,' +
          this.chunkLength +
          '} '
      ); // to break the long string into smaller chunks so that the synthesis is proper

      // var element = this;
      const arr = [];
      let txt = msg.text;

      while (txt.length > 0) {
        if (txt.match(pattRegex)) {
          arr.push(txt.match(pattRegex)[0]);
          txt = txt.substring(arr[arr.length - 1].length);
        } else {
          // NOT A VALID STRING
          return;
        }
      }
      if (arr.length > 0) {
        for (const j in arr) {
          if (arr.hasOwnProperty(j)) {
            const u = new (<any>window).SpeechSynthesisUtterance(arr[j]);
            (<any>window).speechSynthesis.speak(u);
          }
        }
      }
    } else {
      (<any>window).speechSynthesis.speak(msg);
    }
  }

  speakText(text: string): Observable<string> {
    return Observable.create(observer => {
      this.synthesisCount = this.synthesisCount + 1;
      const msg = new (<any>window).SpeechSynthesisUtterance();
      msg.voice = alexaVoice;
      msg.text = text;

      if (msg.text.length > this.chunkLength) {
        const pattRegex = new RegExp(
          '^[\\s\\S]{' +
            Math.floor(this.chunkLength / 2) +
            ',' +
            this.chunkLength +
            // tslint:disable-next-line:max-line-length
            '}[.!?,]{1}|^[\\s\\S]{1,' +
            this.chunkLength +
            '}$|^[\\s\\S]{1,' +
            this.chunkLength +
            '} '
        ); // to break the long string into smaller chunks so that the synthesis is proper

        // var element = this;
        const arr = [];
        let txt = msg.text;

        while (txt.length > 0) {
          arr.push(txt.match(pattRegex)[0]);
          txt = txt.substring(arr[arr.length - 1].length);
        }
        for (const j in arr) {
          if (arr.hasOwnProperty(j)) {
            const u = new (<any>window).SpeechSynthesisUtterance(arr[j]);

            (<any>window).speechSynthesis.speak(u);
          }
        }
      } else {
        (<any>window).speechSynthesis.speak(msg);
      }

      msg.onend = () => {
        this.synthesisCount = this.synthesisCount - 1;
        if (this.synthesisCount === 0) {
          observer.complete();
        }
      };
    });
  }

  DestroySyntesisObject(): void {
    if ((<any>window).speechSynthesis) {
      (<any>window).speechSynthesis.cancel();
    }
  }
}
