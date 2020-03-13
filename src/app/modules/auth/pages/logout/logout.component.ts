import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { KeycloakService } from 'keycloak-angular';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss']
})
export class LogoutComponent implements OnInit {

  constructor(private _router: Router, private keycloak: KeycloakService) { }

  ngOnInit() {
    this.logout();
  }

  logout() {
    if (this.keycloak) {
      localStorage.clear();
      this.keycloak.logout()
    }
  }
}
