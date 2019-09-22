import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";

@Component({
  selector: "app-search",
  templateUrl: "./search.component.html",
  styleUrls: ["./search.component.scss"]
})
export class SearchComponent implements OnInit {
  submitted = false;
  constructor(private router: Router) {}

  ngOnInit() {}

  onSubmit(s: NgForm) {
    console.log("Search submit", s.value);
    this.router.navigate([`/search/${s.value.organization}`]);
    this.submitted = true;
  }
}
