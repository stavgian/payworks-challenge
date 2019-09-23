import { Component, OnInit } from "@angular/core";
import { GithubClientService } from "../github-client.service";
import { ActivatedRoute, Router } from "@angular/router";

import { Repo } from "../models/repo";

@Component({
  selector: "app-organization",
  templateUrl: "./organization.component.html",
  styleUrls: ["./organization.component.scss"]
})
export class OrganizationComponent implements OnInit {
  repoList: Repo[];
  organizationName: string;
  queryParams: any;
  routeParams: any;
  languages: any;
  constructor(
    private github: GithubClientService,
    private activeRoute: ActivatedRoute,
    private router: Router
  ) {
    this.queryParams = this.activeRoute.snapshot.queryParams;
    this.routeParams = this.activeRoute.snapshot.params;
    this.organizationName = this.routeParams.orgName;
  }

  ngOnInit() {
    this.router.routeReuseStrategy.shouldReuseRoute = () => {
      return false;
    };

    this.github.getRepos(this.routeParams.orgName).subscribe(data => {
      this.repoList = data;
      this.repoList.sort((a, b) =>
        a.stargazers_count < b.stargazers_count ? 1 : -1
      );
      this.languages = this.getLanguagesFromResult(data);

      console.log(data);
      console.log("langs", this.languages);
    });

    console.log(this.repoList);
    console.log(this.languages);
  }

  getLanguagesFromResult(result) {
    return new Set(
      result.map(el => {
        return el.language;
      })
    );
  }
}
