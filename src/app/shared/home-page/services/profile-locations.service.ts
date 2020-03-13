import { Injectable } from '@angular/core';
import { Apollo, QueryRef } from 'apollo-angular';
import { HttpClient } from '@angular/common/http';
import { config } from "@app/configs/app.configs";
@Injectable({
  providedIn: 'root'
})
export class ProfileLocationsService {

  profilesURL: string = config.AIC_ProfilesWiser_Location;
  constructor(private _apollo: Apollo,
    protected http: HttpClient) { }
    getLocations(){
     return this.http.get(this.profilesURL);
    }
  }


