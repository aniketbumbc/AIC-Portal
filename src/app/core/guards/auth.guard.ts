import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { KeycloakAuthGuard, KeycloakService } from 'keycloak-angular';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard extends KeycloakAuthGuard implements CanActivate {
  constructor(protected _router: Router, protected keycloakAngular: KeycloakService) {
    super(_router,keycloakAngular);
  }

  isAccessAllowed(_route: ActivatedRouteSnapshot, state: RouterStateSnapshot):Promise<boolean> {
    return new Promise((resolve, reject) => {
      if (!this.authenticated) {
        this.keycloakAngular.login()
          .catch(e => console.error(e));
        return reject(false);
      } else {
        const userRoles = this.keycloakAngular.getUserRoles();
        let role = userRoles.indexOf('admin') !== -1 ? 'admin' : 'employee';
        localStorage.setItem('userRole', role);
      }
      return resolve(true);
    });
  }
}



  // canLoad(route: ActivatedRouteSnapshot): boolean {
  //   return this.checkLogin();
  // }

  // checkLogin(): boolean {
  //   const token = localStorage.getItem('token');
  //   if (!!token) {
  //     return true;
  //   }

    // Navigate to the login page
    // this._router.navigate(['/auth/login']);
    // return false;
//   }
// }

// }
