import { Injectable } from '@angular/core';
import { Apollo, QueryRef } from 'apollo-angular';
import { HttpClient } from '@angular/common/http';
import {newPersonalBlogs} from '../store/query/Home.query';


@Injectable({
  providedIn: 'root'
})
export class MyBlogsService {

  constructor(private _apollo: Apollo,
    private http: HttpClient) {}

    getNewPersonalBlogsQuery(params): QueryRef<any> {
      return this._apollo.use('client2').watchQuery({
      query: newPersonalBlogs,
      variables: params
      });
    } 
  
}

