import { Injectable } from '@angular/core';
import { Apollo, QueryRef } from 'apollo-angular';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class CommonService {

  public newData = new Subject<any>();
  constructor(private _apollo: Apollo,
    private http: HttpClient) { }
    fetchDetailsData(data){
        this.newData.next(data);
    }
    removeHtml(data){
      return data.replace(/<[^>]*>/gm,'');
     }
    
}
