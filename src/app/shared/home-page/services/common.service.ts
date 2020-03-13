import { Injectable } from '@angular/core';
import { Apollo, QueryRef } from 'apollo-angular';
//import{getFetchDetails} from '@app/modules/profile/store/queries/profile.detail.query';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor(private _apollo: Apollo,
    private http: HttpClient) { }

    // getFetchDetailsQuery(params): QueryRef<any> {
    //   return this._apollo.watchQuery({
    //   query: getFetchDetails,
    //   variables: params
    //   });
    // }
}
