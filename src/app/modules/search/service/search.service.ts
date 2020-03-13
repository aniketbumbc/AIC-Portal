import { Injectable } from '@angular/core';
import { Apollo, QueryRef } from 'apollo-angular';
import { getSearch, getFetchDetails } from '../store/queries';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '@env/environment';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable()
export class SearchQueryService {
  token = localStorage.getItem('token');
  httpHeaders = new HttpHeaders()
  .append('Authorization', 'bearer '+ this.token)
  private searchData = new BehaviorSubject<any>([]);
  private addProjectData = new BehaviorSubject<any>({});
  private addBlogData = new BehaviorSubject<any>({});

  constructor(
    private _apollo: Apollo,
    private _https: HttpClient
  ) { }

  getSearchQuery(params): QueryRef<any> {
    return this._apollo.watchQuery({
      query: getSearch,
      variables: params
    });
  }
  getFetchDetailsQuery(params): QueryRef<any> {
    return this._apollo.watchQuery({
      query: getFetchDetails,
      variables: params
    });
  }

  getEmployeeSearch(searchContent,pazeSize) {
      let payload = {
        "index": "aic-employee",
        "pageNumber": 1,
        "pageSize": pazeSize,
        "searchContent": searchContent
      }   
    return this._https.post(`${environment.searchURL}search`, payload, {headers: this.httpHeaders})
  }

  getBlogSearch(searchContent,pazeSize) {
    let payload = {
      "index": "aic-blog",
      "pageNumber": 1,
      "pageSize": pazeSize,
      "searchContent": searchContent
    }
    return this._https.post(`${environment.searchURL}search`, payload, {headers: this.httpHeaders})
  }

  getProjectSearch(searchContent,pazeSize) {
    let payload = {
      "index": "aic-project",
      "pageNumber": 1,
      "pageSize": pazeSize,
      "searchContent": searchContent
    }
    return this._https.post(`${environment.searchURL}search`, payload, {headers: this.httpHeaders})
  }

  getCuiresult(url, data) {
    const token = localStorage.getItem('token');
    // const headers = new Headers();
    const headers = { 'Authorization': 'Bearer ' + token };
    return this._https.post(`${environment.cuiUrl}${url}`, data, {
      headers: headers
    });
  }

  getSearchData(): Observable<Array<Object>> {
    return this.searchData.asObservable();
  }

  getAddProjectData(): Observable<Array<Object>> {
    return this.addProjectData.asObservable();
  }

  getAddBlogData(): Observable<Array<Object>> {
    return this.addBlogData.asObservable();
  }

  setSearchData(data) {
    this.searchData.next(data);
  }

  setAddProjectData(data) {
    this.addProjectData.next(data);
  }

  setAddBlogData(data) {
    this.addBlogData.next(data);
  }

}
