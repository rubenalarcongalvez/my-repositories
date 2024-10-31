import { Component, Input } from '@angular/core';
import { GithubRepo } from '../../shared/interfaces/github-repo';
import { StyleModule } from '../../shared/style/style.module';

@Component({
  selector: 'app-repo',
  standalone: true,
  imports: [StyleModule],
  templateUrl: './repo.component.html',
  styleUrl: './repo.component.scss'
})
export class RepoComponent {
  @Input() repo?: GithubRepo;
  @Input() pinned?: boolean;
  repoImage: string = '';

  ngOnInit() {
    this.repoImage = this.repo?.name ?? '';
  }

  repoImageNotFound() {
    this.repoImage = 'repo_default';
  }

  transformToReadableDate(date: string | undefined) {
    if (date) {
      date = date.replace('T', ' at ').replace('Z', '');
    }
    return date;
  }
}
