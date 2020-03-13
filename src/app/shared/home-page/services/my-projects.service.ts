import { Injectable } from '@angular/core';
import { Apollo, QueryRef } from 'apollo-angular';
import { HttpClient } from '@angular/common/http';
import {newPersonalProjects} from '../../home-page/store/query/Home.query';


@Injectable({
  providedIn: 'root'
})
export class MyProjectsService {

  constructor(private _apollo: Apollo,
    private http: HttpClient) {}

    getRelatedNewProjectsQuery(params): QueryRef<any> {
      return this._apollo.use('client2').watchQuery({
      query: newPersonalProjects,
      variables: params
      });
    }  
}

