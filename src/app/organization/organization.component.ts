import { Component, OnInit } from "@angular/core";
import { GithubClientService } from "../github-client.service";
import { ActivatedRoute } from "@angular/router";

import { Repo } from "../models/repo";

@Component({
  selector: "app-organization",
  templateUrl: "./organization.component.html",
  styleUrls: ["./organization.component.scss"]
})
export class OrganizationComponent implements OnInit {
  repoList: any;
  organizationName: string;
  queryParams: any;
  routeParams: any;
  constructor(
    private github: GithubClientService,
    private activeRoute: ActivatedRoute
  ) {
    this.queryParams = this.activeRoute.snapshot.queryParams;
    this.routeParams = this.activeRoute.snapshot.params;
    this.organizationName = this.routeParams.orgName;
  }

  ngOnInit() {
    this.github.getRepos(this.routeParams.orgName).subscribe(data => {
      console.log(data);
      this.repoList = data;
    });

    console.log(this.repoList);
  }
}
