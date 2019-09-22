import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { OrganizationComponent } from "./organization/organization.component";
import { GithubClientService } from "./github-client.service";
import { RepoComponent } from "./repo/repo.component";
import { SearchComponent } from './search/search.component';

@NgModule({
  declarations: [AppComponent, OrganizationComponent, RepoComponent, SearchComponent],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule, FormsModule],
  providers: [GithubClientService],
  bootstrap: [AppComponent]
})
export class AppModule {}
