import { Injectable } from "@angular/core";
import { Apollo, QueryRef } from 'apollo-angular';
import { getFetchDetails, newMemberRequest } from './store/queries';
import { HttpClient } from '@angular/common/http';
import { environment } from '@env/environment';

@Injectable()
export class FetchDetailsApi {
    constructor(private _apollo: Apollo, private https: HttpClient) { }
    getFetchDetailsQuery(params): QueryRef<any> {
        return this._apollo.watchQuery({
            query: getFetchDetails,
            variables: params
        });
    }
    newMemberRequest(params) {
        return this._apollo.mutate({
            mutation: newMemberRequest,
            variables: params
        })
    }

    sendToCm(formdata) {
        const token = localStorage.getItem('token');
        if(token){
          const header = {
            "Authorization" : `Bearer ${token}`
          }
          return this.https.post(environment.cmUrl,formdata,{
            headers: header
          });
        }

    }
}