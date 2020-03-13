import { Injectable } from "@angular/core";
import { Apollo, QueryRef } from "apollo-angular";
import { HttpClient } from "@angular/common/http";
import { environment } from "@env/environment.prod";

@Injectable({
  providedIn: "root"
})
export class SkillsMatrixService {
  constructor(private _apollo: Apollo, private http: HttpClient) {}

  getSkillsMatrix() {
    return this.http.get(environment.skillsMatrix);
  }
}
