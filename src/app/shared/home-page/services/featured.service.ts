import { Injectable } from '@angular/core';
import { Apollo, QueryRef } from 'apollo-angular';
import { HttpClient } from '@angular/common/http';
import {newFeaturedBlogs,newFeaturedProjects} from '@app/shared/home-page/store/query/Home.query';

@Injectable({
  providedIn: 'root'
})
export class FeaturedService {

  constructor(private _apollo: Apollo) { }

  getNewFeaturedDataQuery(): QueryRef<any> {
    return this._apollo.use('client2').watchQuery({
    query: newFeaturedBlogs
    });
  }
  getNewFeaturedProjectDataQuery(): QueryRef<any> {
    return this._apollo.use('client2').watchQuery({
    query: newFeaturedProjects
    });
  }
}
