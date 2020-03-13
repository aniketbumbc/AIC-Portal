import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpResponse } from '@angular/common/http';
import { NgxSpinnerService } from 'ngx-spinner';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { environment } from '@env/environment';
@Injectable({
  providedIn: 'root'
})
export class LoaderInterceptor implements HttpInterceptor {
  constructor(private ngxSpinnerService: NgxSpinnerService, private _router: Router) { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const re = /\/api\/pams/gi;
    const re1 = /autocomplete/gi;
    if (req.url.search(re) === -1 && req.url.search(re1) === -1) {
      if (req.body !== null && req.body.variables) {
        if (['blog','Project', 'employees'].indexOf(req.body.operationName) > -1) {
          if (req.body.variables.limit < 12 && req.body.variables.start < 10) {
            this.showLoader();
          } else if (req.body.variables.limit < 12 && req.body.variables.start === undefined) {
            this.showLoader();
          }
        } else if (req.body.variables.start >= 10) {
          this.hideLoader();
        } else if (['getClientName', 'employee'].indexOf(req.body.operationName) > -1) {
          this.hideLoader();
        } else {
          this.showLoader();
        }

      }
      return next.handle(req).pipe(tap((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse) {
          if (event.body.hasOwnProperty('errors')) {
            this._router.navigate([environment.hostUrl]);
          }
          this.hideLoader();
        }
      },
        (err: any) => {
          this.hideLoader();
        }));
    } else {
      return next.handle(req).pipe(tap((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse) {
          this.hideLoader();
        }
      },
        (err: any) => {
          this.hideLoader();
        }));
    }
  }
  private showLoader(): void {
    this.ngxSpinnerService.show();
  }
  private hideLoader(): void {
    this.ngxSpinnerService.hide();
  }
}
