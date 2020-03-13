import { Injectable } from '@angular/core';
import { Apollo, QueryRef } from 'apollo-angular';
import {getProfile, getBlog, getProjects, getFetchDetails } from '../store/queries';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class HomeQueryService {
  constructor(
    private _apollo: Apollo,
    private http: HttpClient,
  ) { }


  getProfileQuery(params): QueryRef<any> {
    return this._apollo.watchQuery({
      query: getProfile,
      variables: params
    });
  }
  getBlogQuery(params): QueryRef<any> {
    return this._apollo.watchQuery({
      query: getBlog,
      variables: params
    });
  }
  getProjectQuery(params): QueryRef<any> {
    return this._apollo.watchQuery({
        query: getProjects,
        variables: params
    });
  }
  getFetchDetailsQuery(params): QueryRef<any> {
    return this._apollo.watchQuery({
    query: getFetchDetails,
    variables: params
    });
  }
}