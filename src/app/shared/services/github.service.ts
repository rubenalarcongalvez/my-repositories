import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { concatMap } from 'rxjs/operators';
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
    return this.getAllReposRecursive(1, []);
  }

  private getAllReposRecursive(page: number, accumulated: GithubRepo[]): Observable<GithubRepo[]> {
    return this.http.get<GithubRepo[]>(`${this.apiUrlRepos}?per_page=100&page=${page}&sort=updated`).pipe(
      concatMap((repos) => {
        if (repos.length === 0) {
          return of([...accumulated]);
        }
        return this.getAllReposRecursive(page + 1, [...accumulated, ...repos]);
      })
    );
  }
}
