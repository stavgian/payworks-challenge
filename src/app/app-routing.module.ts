import { NgModule, Component } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { OrganizationComponent } from "./organization/organization.component";
import { RepoComponent } from "./repo/repo.component";
import { SearchComponent } from "./search/search.component";

const routes: Routes = [
  { path: "", redirectTo: "/search", pathMatch: "full" },
  { path: "search", component: SearchComponent },
  {
    path: "search/:orgName",
    component: OrganizationComponent,
    children: [{ path: ":repoName", component: RepoComponent }]
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      enableTracing: true
    })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
