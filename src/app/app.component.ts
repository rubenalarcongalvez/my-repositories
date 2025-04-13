import { Component } from '@angular/core';
import { GithubService } from './shared/services/github.service';
import { GlobalModule } from './global.module';
import { RepoComponent } from './components/repo/repo.component';
import { GithubRepo } from './shared/interfaces/github-repo';
import { GithubUser } from './shared/interfaces/github-user';
import { UserComponent } from './components/user/user.component';
import { StyleModule } from './shared/style/style.module';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [GlobalModule, RepoComponent, UserComponent, StyleModule, ReactiveFormsModule],
  providers: [MessageService],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  githubUser?: GithubUser;
  githubRepos: GithubRepo[] = [];
  loadedRepos: boolean = false;

  pinnedRepositories: string[] = [
    'miscellaneous-features',
    'listas-inteligentes',
    'overcooked-level-randomizer',
    'primeng-vs-angular_material',
    'Handy_Utils_Assaultcube',
    'clasificar-juegos'
  ];

  tooManyTries: boolean = false;
  formFilters: FormGroup = this.fb.group({
    featuredFirst: [true],
    filterOption: ['updated_at'],
    filterOptionOrientation: ['desc']
  });
  filterOptions: any[] = [
    { label: 'Created at', value: 'created_at' },
    { label: 'Updated at', value: 'updated_at' }
  ];
  filterOptionsOrientation: any[] = [
    { label: 'Desc.', value: 'desc' },
    { label: 'Asc.', value: 'asc' }
  ];

  constructor(private readonly githubService: GithubService, private fb: FormBuilder, private messageService: MessageService) {
    this.githubService.getUser().subscribe({
      next: (githubUser) => {
        this.githubUser = githubUser;
        this.loadedRepos = false;
      }, error: (err) => {
        console.error(err);
        if (err.message.includes('limit')) {
          this.tooManyTries = true;
        }
      }
    });

    this.githubService.getRepos().subscribe({
      next: (githubRepos) => {
        this.githubRepos = githubRepos;
        this.applyFilters(true);
      }, error: (err) => {
        console.error(err);
        if (err.message.includes('limit')) {
          this.tooManyTries = true;
        }
      }
    }).add(() => {
      this.loadedRepos = true;
    });
  }

  isRepoPinned(repo: GithubRepo): boolean {
    return this.pinnedRepositories?.includes(repo?.name ?? '') ?? false;
  }

  private sortFeaturedFirst() {
    this.githubRepos.sort((a, b) => {
      const isAPinned = this.isRepoPinned(a);
      const isBPinned = this.isRepoPinned(b);
  
      if (isAPinned && !isBPinned) {
        return -1;
      }
      if (!isAPinned && isBPinned) {
        return 1;
      }
      return 0;
    });
  }

  private sortByCreatedAt(ascending: boolean) {
    this.githubRepos.sort((a, b) => {
        const aDate = a?.created_at ? new Date(a.created_at) : new Date(0);
        const bDate = b?.created_at ? new Date(b.created_at) : new Date(0);

        if (ascending) {
            return aDate.getTime() - bDate.getTime();
        } else {
            return bDate.getTime() - aDate.getTime();
        }
    });
  }
  
  private sortByUpdatedAt(ascending: boolean) {
    this.githubRepos.sort((a, b) => {
        const aDate = a?.updated_at ? new Date(a.updated_at) : new Date(0);
        const bDate = b?.updated_at ? new Date(b.updated_at) : new Date(0);

        if (ascending) {
            return aDate.getTime() - bDate.getTime();
        } else {
            return bDate.getTime() - aDate.getTime();
        }
    });
  }

  applyFilters(firstTime: boolean = false) {
    const isAscending = this.formFilters.get('filterOptionOrientation')?.value == 'asc';
    if (this.formFilters.get('filterOption')?.value == 'created_at') {
      this.sortByCreatedAt(isAscending);
    } else {
      this.sortByUpdatedAt(isAscending);
    }

    //This is to put the first ones always the featured if set
    if (this.formFilters.get('featuredFirst')?.value) {
      this.sortFeaturedFirst();
    }

    if (!firstTime) {
      this.messageService.add({ severity: 'info', detail: 'Filter Applied' });
    }
  }
}
