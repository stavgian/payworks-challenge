import { TestBed, getTestBed } from "@angular/core/testing";
import { HttpClientTestingModule, HttpTestingController } from "@angular/common/http/testing";

import { GithubClientService } from "./github-client.service";
import { Repo } from "./models/repo";

describe("GithubClientService", () => {
  let injector: TestBed;
  let service: GithubClientService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [GithubClientService]
    });
    injector = getTestBed();
    service = injector.get(GithubClientService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  describe("#getRepos", () => {
    it("should return an Observable<Repo[]>", () => {
      const testOrganisation = "payworks";
      const dummyResponseData: [Repo] = [
        {
          name: "MPBSignatureViewController",
          stargazers_count: 5,
          forks_count: 5,
          language: "Javascript"
        }
      ];
      service.getRepos(testOrganisation).subscribe(repos => {
        expect(repos.length).toBe(1);
        expect(repos).toEqual(dummyResponseData);
      });

      const req = httpMock.expectOne(`${service.apiURL}/orgs/payworks/repos`);
      expect(req.request.method).toBe("GET");
      req.flush(dummyResponseData);
    });
  });
});
