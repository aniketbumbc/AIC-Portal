import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  constructor() { }

  getToken() {
    return localStorage.getItem('token');
  }
}
