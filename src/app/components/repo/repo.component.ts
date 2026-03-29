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
  repoImage: string = 'repo_default';

  private static readonly REPOS_WITH_IMAGES = new Set([
    'add-game-to-grouvee',
    'dardos',
    'Handy_Utils_Assaultcube',
    'overcooked-level-randomizer',
    'primeng-vs-angular_material',
    'regalo-misterioso-Angular17',
    'regalos-misteriosos',
    'song-redirect',
    'valentines-day'
  ]);

  ngOnInit() {
    const repoName = this.repo?.name ?? '';
    this.repoImage = RepoComponent.REPOS_WITH_IMAGES.has(repoName) ? repoName : 'repo_default';
  }

  transformToReadableDate(date: string | undefined) {
    if (date) {
      date = date.replace('T', ' at ').replace('Z', '');
    }
    return date;
  }
}
