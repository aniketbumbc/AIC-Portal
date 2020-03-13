import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '@app/core';

@Component({
  selector: 'app-token',
  templateUrl: './token.component.html',
  styleUrls: ['./token.component.scss']
})
export class TokenComponent implements OnInit {
  dots: string;

  constructor(private _router: Router, private _activeRoute: ActivatedRoute, private _authService: AuthService) {
    const token = this._activeRoute.snapshot.queryParamMap['params'].token ? this._activeRoute.snapshot.queryParamMap['params'].token : null;
    const userData = this._activeRoute.snapshot.queryParamMap['params'].data ? JSON.parse(atob(this._activeRoute.snapshot.queryParamMap['params'].data)) : null;
    this.dots = '';
    this.generateDots();
    if (token) {
      localStorage.setItem('token', token);
      if (userData) {
        const user = {
          'id': userData.id,
          'email': userData.email
        };
        localStorage.setItem('user', JSON.stringify(user));
      }
      this._router.navigate(['/home']);
    } else {
      this._router.navigate(['/auth/login']);
    }
  }

  ngOnInit() {
  }

  generateDots() {
    setTimeout(() => {
      if (this.dots.length < 3) {
        this.dots = this.dots + '.';
      } else {
        this.dots = '';
      }
      this.generateDots();
    }, 1000);
  }
}
