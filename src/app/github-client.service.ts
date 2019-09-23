import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { retry, catchError } from "rxjs/operators";

import { Repo } from "./models/repo";

@Injectable({
  providedIn: "root"
})
export class GithubClientService {
  apiURL: string = "https://api.github.com";

  // Http Headers
  httpOptions = {
    headers: new HttpHeaders({
      "Content-Type": "application/json"
    })
  };

  constructor(private http: HttpClient) {}

  getRepos(organization: string, page?: number): Observable<Repo[]> {
    return this.http.get<Repo[]>(`${this.apiURL}/orgs/${organization}/repos`);
  }

  getBranches(organization: string, repo: string, page?: number) {
    return this.http.get(
      `${this.apiURL}/repos/${organization}/${repo}/branches`
    );
  }
}
