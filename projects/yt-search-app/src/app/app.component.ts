import { Component } from '@angular/core';
import { GapiAuthService, GapiClientService, SearchResult, YouTubeSearch } from 'gapi';
import { ReplaySubject, Subject } from 'rxjs';
import { switchMap } from 'rxjs/operators';

const searchDefaults = {
  part: 'snippet',
  type: 'Video',
  maxResults: 10,
};

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public Items$: Subject<SearchResult[]> = new ReplaySubject(1);
  public User$: Subject<any> = new ReplaySubject(1);

  constructor(
    private authService: GapiAuthService,
    private clientService: GapiClientService,
  ) {
  }

  public Login(): void {
    this.authService.SignIn().subscribe({
      next: user => {
        this.User$.next({
          Name: user.getBasicProfile().getName(),
          Email: user.getBasicProfile().getEmail(),
        });
      }
    });
  }

  public Search(search: any): void {
    this.clientService.YouTube$.pipe(
      switchMap(() => this.clientService.Get(YouTubeSearch().list({
        ...searchDefaults,
        q: `"${search}" karaoke`,
        type: 'Video',
        maxResults: 10,
      })))
    )
    .subscribe(({ result }) => {
      this.Items$.next(result.items);
    });
  }

}
