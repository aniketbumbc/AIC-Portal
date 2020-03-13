import { Injectable } from '@angular/core';
import { Apollo, QueryRef } from 'apollo-angular';
import {coes,coe } from '../store/query/COE.query';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CoeService {
  constructor(private _apollo: Apollo,
    private http: HttpClient) { }
  getNewCOEQuery(): QueryRef<any>{
    return this._apollo.use('client2').watchQuery({
      query: coes
    })
  }
  getNewCoeSearchQuery(params):QueryRef<any>{
    return this._apollo.use('client2').watchQuery({
      query:coe,
      variables:params
    })
  }
}
