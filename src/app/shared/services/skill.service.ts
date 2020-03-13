import { Injectable } from '@angular/core';

import { ApiService } from '@app/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

const routes = {
  skillMatrix: () => `profileskills`
};

@Injectable({
  providedIn: 'root'
})
export class SkillService {

  constructor(
    private apiService: ApiService,
    private http: HttpClient
  ) { }

  public getSkills(): Observable<any> {
    // return this.apiService.get(routes.skillMatrix());
    return this.http.get('assets/api/reportSkillMatrix.json');
  }
}
