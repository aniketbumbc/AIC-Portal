import { Injectable } from '@angular/core';

import { ApiService } from '@app/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';



const routes = {
  blogList: (category: string, pageLength: number, pageOffset: number, tag: string) => `listdemos?category=${category}&pageLength=${pageLength}&pageOffset=${pageOffset}&tag=${tag}`
};

@Injectable({
  providedIn: 'root'
})
export class BlogService {

  constructor(
    private apiService: ApiService,
    private http: HttpClient
  ) { }

  public getBlog(category: string, pageLength: number, pageOffset: number, tag: string): Observable<any> {
    // return this.apiService.get(routes.blogList(category, pageLength, pageOffset, tag));
    return this.http.get('assets/api/presentation.json');
  }
}
