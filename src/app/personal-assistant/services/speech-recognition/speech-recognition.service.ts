import { Injectable, NgZone } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import * as _ from 'lodash';


interface IWindow extends Window {
  webkitSpeechRecognition: any;
  SpeechRecognition: any;
}

@Injectable()
export class SpeechRecognitionService {
  speechRecognition: any;


  constructor(private zone: NgZone) {
    // console.log('constructor');
    // const { webkitSpeechRecognition }: IWindow = <IWindow>window;
    // this.speechRecognition = new webkitSpeechRecognition();
  }

  record(): Observable<string> {

    const { webkitSpeechRecognition }: IWindow = <IWindow>window;
    this.speechRecognition = new webkitSpeechRecognition();

    return Observable.create(observer => {
      this.speechRecognition.continuous = false;
      this.speechRecognition.interimResults = true;
      this.speechRecognition.lang = 'en-us';
      this.speechRecognition.maxAlternatives = 1;

      this.speechRecognition.onresult = speech => {
        let term = '';
        if (speech.results) {

          const result = speech.results[speech.resultIndex];
          const transcript = result[0].transcript;
          if (result.isFinal) {
            // console.log(result[0].confidence);
            if (result[0].confidence < 0.6) {
              // console.log('Unrecognized result - Please try again');
              // term = 'Sorry. I don\'t understand.';
              this.zone.run(() => {
                observer.next(result[0].confidence);
              });
            } else {
              term = _.trim(transcript);
              // console.log('Did you say? -> ' + term + ' , If not then say something else...');

              this.zone.run(() => {
                observer.next(term);
              });
            }
          }
        }
        // this.zone.run(() => {
        //   observer.next(term);
        // });
      };

      this.speechRecognition.onsoundstart = function() {
        // console.log('Some sound is being received');
      };

      this.speechRecognition.onerror = error => {
        observer.error(error);
      };

      this.speechRecognition.onend = () => {
        // console.log('end');
        observer.complete();
      };

      this.speechRecognition.start();
        // console.log('Say something - We are listening !!!');
    });
  }

  DestroySpeechObject() {
    if (this.speechRecognition) {
      // console.log('abort');
      this.speechRecognition.abort();
    }


    // this.speechRecognition.abort();
    // console.log(this.speechRecognition);


  }

  getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

}
