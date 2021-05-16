import { Inject, Injectable, NgZone } from '@angular/core';
import { Observable } from 'rxjs';
import { filter, shareReplay, switchMap } from 'rxjs/operators';
import { GapiAuthConfig, IGapiAuthConfig } from './gapi-auth-config.interface';
import GoogleAuth = gapi.auth2.GoogleAuth;
import GoogleUser = gapi.auth2.GoogleUser;

@Injectable({
  providedIn: 'root'
})
export class GapiAuthService {

  public Auth$: Observable<GoogleAuth>;

  constructor(
    @Inject(GapiAuthConfig) clientConfig: IGapiAuthConfig,
    private zone: NgZone
  ) {
    this.Auth$ = new Observable<GoogleAuth>((subscriber) => {
      gapi.load('auth2', () => {
        gapi.auth2.init(clientConfig).then(auth => zone.run(auth => {
          subscriber.next(auth);
          subscriber.complete();
        }, this, [auth]));
      });
    }).pipe(
      shareReplay(1),
    );
  }

  public SignIn(): Observable<GoogleUser> {
    return this.Auth$.pipe(
      switchMap( auth => new Observable<GoogleUser>((subscriber) => {
        auth.signIn().then( user => this.zone.run( user => {
          subscriber.next(user);
          subscriber.complete();
        }, this, [ user ]));
      })),
      filter(user => user.isSignedIn()),
      shareReplay(1),
    );
  }

}
