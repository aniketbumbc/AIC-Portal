import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { environment } from '@env/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatBotService {

  private socketUrl = `${environment.socketUrl}`;
  private socket: any;

  constructor() {
    //console.log(this.socketUrl);
    this.socket = io(this.socketUrl, {path: '/aic-bot/socket.io/'});
    // this.socket = io(this.socketUrl);
    this.socket.on('connect', () => {
      //console.log(`Socket Connected ${localStorage.getItem('token')}`);
      const data = {
        token: localStorage.getItem('token'),
        email: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')).email : ''
      };
      this.sendMessage('session_data', data);
    });

    this.socket.on('disconnect', () => {
     // console.log('Socket DISConnected');
    });
  }

  /* getMessage() {
    console.log('Threr');
    return this.socket
    .fromEvent<any>('notification')
    .map( data => data );
  } */

  sendMessage(eventName, data) {
    console.log(data);
    this.socket.emit(eventName, data);
  }

  getMessages() {
    console.log('Threr');
    let observable = new Observable(observer => {
      this.socket.on('navigation', (data) => {
        console.log('Here');
        observer.next(data);
      });
      return () => {
        this.socket.disconnect();
      };
    });
    return observable;
  }
}
