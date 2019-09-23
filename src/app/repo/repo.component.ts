import { Component, OnInit } from "@angular/core";
import { GithubClientService } from "../github-client.service";
import { ActivatedRoute, Router } from "@angular/router";
import { Repo } from "../models/repo";

@Component({
  selector: "app-repo",
  templateUrl: "./repo.component.html",
  styleUrls: ["./repo.component.scss"]
})
export class RepoComponent implements OnInit {
  queryParams: any;
  routeParams: any;
  orgName: string;
  repoName: string;
  branches: any;
  constructor(
    private github: GithubClientService,
    private activeRoute: ActivatedRoute,
    private router: Router
  ) {
    this.queryParams = this.activeRoute.snapshot.queryParams;
    this.routeParams = this.activeRoute.snapshot.params;
    this.orgName = this.routeParams.orgName;
    this.repoName = this.routeParams.repoName;
  }

  ngOnInit() {
    // this.router.routeReuseStrategy.shouldReuseRoute = () => {
    //   return false;
    // };
    this.github
      .getBranches(this.routeParams.orgName, this.routeParams.repoName)
      .subscribe(data => {
        console.log(data);
        this.branches = data;
      });
  }
}
