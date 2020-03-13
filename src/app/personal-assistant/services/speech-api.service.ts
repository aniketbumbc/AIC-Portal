import { Injectable } from '@angular/core';
// import Worker from 'worker-loader/dist/workers';
import Worker from "worker-loader!./Worker.js";
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Subject } from 'rxjs';
import { Observable } from 'rxjs';

function handleContext() {
  (<any>window).voiceSupport = false;
}

let encoder;

const SpeechRecognition =
  (<any>window).SpeechRecognition || (<any>window).webkitSpeechRecognition;
let audiosource;

@Injectable()
export class VoiceService {
  private subject = new Subject();
  recording = false;

  stream = null;
  input = null;
  node = null;
  recognition;
  private context = null;

  constructor(private http: HttpClient) { }

  private getContext() {
    if (!!this.context) return this.context;

    this.context = new ((<any>window).AudioContext ||
      (<any>window).webkitAudioContext ||
      handleContext)();
    return this.context;
  }

  start() {
    this.recording = true;
    // this.subject.next({ text: '', recording: true, support: true });

    if (!!SpeechRecognition) {
      this.recognition = new SpeechRecognition();
      this.recognition.lang = 'en-US';
      this.recognition.interimResults = false;
      this.recognition.maxAlternatives = 1;
      this.recognition.continuous = false;
      this.recognition.start();
      this.recognition.addEventListener('result', e => {
        const last = e.results.length - 1;
        const text = e.results[last][0].transcript;
        this.subject.next({ text: text, recording: false, support: true });
        this.recognition.stop();
        this.recording = false;
      });

      this.recognition.addEventListener('end', e => {
        this.subject.next({ text: '', recording: false, support: true });
      });
    } else if (!!this.getContext()) {
      try {
        encoder = new Worker();

        encoder.onmessage = e => {
          if (e.data.cmd === 'end') {
            const speechSender: any = new FileReader();
            speechSender.addEventListener('loadend', () => {
              gapi.client.speech.speech
                .syncrecognize({
                  config: {
                    encoding: 'flac',
                    sampleRate: 44100
                  },
                  audio: {
                    content: btoa(speechSender.result)
                  }
                })
                .execute(r => {
                  if (r.results && r.results[0]) {
                    this.subject.next({
                      text: r.results[0].alternatives[0].transcript,
                      recording: false,
                      support: true
                    });
                  } else {
                    this.subject.next({
                      text: '',
                      recording: false,
                      support: true
                    });
                  }
                });
            });

            speechSender.readAsBinaryString(e.data.buf);
            encoder.terminate();
            encoder = null;
          } else if (e.data.cmd === 'debug') {
          } else {
          }
        };

        (<any>window).navigator.getUserMedia =
          (<any>window).navigator.getUserMedia ||
          (<any>window).navigator.webkitGetUserMedia ||
          (<any>window).navigator.mozGetUserMedia;

        if ((<any>window).navigator.getUserMedia) {
          (<any>window).navigator.getUserMedia(
            {
              video: false,
              audio: true
            },
            this._gotUserMedia.bind(this),
            this._userMediaFailed.bind(this)
          );
        } else {
          // for non-support browser
          handleContext();
        }
      } catch (err) {
        // when speech error occurs
        this.subject.next({ text: '', recording: false, support: true });
      }
    } else {
      this.subject.next({ text: '', recording: false, support: false });
    }
  }

  getMessage(): Observable<any> {
    return this.subject.asObservable();
  }
  // success event voice permission
  _gotUserMedia(localMediaStream) {
    this.stream = localMediaStream;
    this.input = this.getContext().createMediaStreamSource(this.stream);

    if (this.input.context.createJavaScriptNode) {
      this.node = this.input.context.createJavaScriptNode(4096, 1, 1);
    } else if (this.input.context.createScriptProcessor) {
      this.node = this.input.context.createScriptProcessor(4096, 1, 1);
    } else {
      console.error('Could not create audio node for JavaScript based Audio Processing.');
    }

    const sampleRate = this.getContext().sampleRate;

    encoder.postMessage({
      cmd: 'init',
      config: {
        samplerate: 44100,
        bps: 16,
        channels: 1,
        compression: 5
      }
    });

    this.node.onaudioprocess = function (e) {
      const channelLeft = e.inputBuffer.getChannelData(0);
      encoder.postMessage({
        cmd: 'encode',
        buf: channelLeft
      });
    };

    this.input.connect(this.node);
    this.node.connect(this.getContext().destination);

    // microphone will only work(max) upto this timeout;
    setTimeout(() => {
      this.stop(); // need to stop to get output
    }, 3000);
  }
  // error event voice permission
  _userMediaFailed(code) {
    this.subject.next({ text: '', recording: false, support: false });
  }

  stop() {
    if (!this.recording) {
      return;
    }
    if (!!SpeechRecognition) {
      this.recognition.abort();
    } else {
      const tracks = this.stream.getAudioTracks();

      for (let i = tracks.length - 1; i >= 0; --i) {
        tracks[i].stop();
      }

      this.recording = false;
      encoder.postMessage({
        cmd: 'finish'
      });

      this.input.disconnect();
      this.node.disconnect();
      this.input = this.node = null;
    }
  }

  loadSound(url) {
    this.http.get(url, { responseType: 'arraybuffer' }).subscribe(
      data => {
        this.process(data);
      },
      error => { }
    );
  }

  loadSoundWithBody(url, ssml) {
    const body = {
      text: ssml
    };

    this.http
      .post(url, this.setBody(body), {
        headers: this.setHeaders(),
        responseType: 'arraybuffer'
      })
      .subscribe(
        data => {
          this.process(data);
        },
        error => {
        }
      );
  }

  process(data) {
    audiosource = this.getContext().createBufferSource();
    const self = this;
    // Create Sound Source
    this.getContext().decodeAudioData(data, function (buffer) {
      audiosource.buffer = buffer;
      audiosource.connect(self.getContext().destination);
      audiosource.start(0);
    });
  }

  stopSpeaking() {
    if (audiosource) {
      audiosource.stop(0);
    }
  }

  setHeaders() {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return headers;
  }

  setBody(body: object) {
    return JSON.stringify(body);
  }
}
