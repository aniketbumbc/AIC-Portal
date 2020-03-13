import { Injectable } from '@angular/core';
import { Apollo, QueryRef } from 'apollo-angular';
import{newFeaturedProfiles} from '@app/shared/home-page/store/query/Home.query';
@Injectable({
  providedIn: 'root'
})
export class NewjoineeService {

  constructor(private _apollo: Apollo) { }

  getNewHomeProfilesDataQuery(): QueryRef<any> {
     return this._apollo.use('client2').watchQuery({
    query: newFeaturedProfiles,   
    });
   }
}
