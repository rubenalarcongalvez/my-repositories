import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GithubRepo } from '../interfaces/github-repo';
import { GithubUser } from '../interfaces/github-user';

@Injectable({
  providedIn: 'root'
})
export class GithubService {
  private readonly apiUrlUser = 'https://api.github.com/users/rubenalarcongalvez';
  private readonly apiUrlRepos = 'https://api.github.com/users/rubenalarcongalvez/repos';

  constructor(private readonly http: HttpClient) {}

  getUser(): Observable<GithubUser> {
    return this.http.get<GithubUser>(this.apiUrlUser);
  }
  
  getRepos(): Observable<GithubRepo[]> {
    return this.http.get<GithubRepo[]>(this.apiUrlRepos);
  }
}
