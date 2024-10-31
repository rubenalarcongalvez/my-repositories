import { Component, Input } from '@angular/core';
import { GithubUser } from '../../shared/interfaces/github-user';
import { StyleModule } from '../../shared/style/style.module';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [StyleModule],
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss'
})
export class UserComponent {
  @Input() user?: GithubUser;

  normalizeString(string: string | undefined): string {
    if (string) {
      return String(string.toLowerCase()).normalize("NFD").replace(/[\u0300-\u036f]/g, "").replaceAll(' ', '-');
    } else {
      return '#';
    }
  }

  constructor() {}
}
