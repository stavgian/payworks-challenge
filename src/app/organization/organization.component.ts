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
  filteredRepoList: Repo[];
  languageFilter: string;
  organizationName: string;
  queryParams: any;
  routeParams: any;
  languages: any;
  constructor(private github: GithubClientService, private activeRoute: ActivatedRoute, private router: Router) {
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
      this.filteredRepoList = data;
      this.languages = this.getLanguagesFromResult(data);

      this.sortResult();
      console.log(data);
      console.log("langs", this.languages);
    });

    console.log(this.repoList);
    console.log(this.languages);
  }

  applyFilters() {
    this.filteredRepoList = this.repoList.filter(el => {
      return el.language == this.languageFilter;
    });
  }

  resetFilters() {
    this.filteredRepoList = Array.from(this.repoList);
  }

  sortResult() {
    console.log("Sort results", this.queryParams);

    if (this.queryParams["sortBy"] === "forks") {
      this.repoList.sort((a, b) => (a.forks_count < b.forks_count ? 1 : -1));
    } else {
      this.repoList.sort((a, b) => (a.stargazers_count < b.stargazers_count ? 1 : -1));
    }
  }

  onLanguageSelect(event) {
    console.log(this.languageFilter);
    console.log(event);
    if (this.languageFilter !== "") {
      this.applyFilters();
    } else {
      this.resetFilters();
    }
  }

  getLanguagesFromResult(result) {
    return new Set(
      result.map(el => {
        return el.language;
      })
    );
  }
}
