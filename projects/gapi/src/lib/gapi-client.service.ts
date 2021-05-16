import { Inject, Injectable, NgZone } from '@angular/core';
import { Observable } from 'rxjs';
import { shareReplay, switchMap } from 'rxjs/operators';
import { GapiClientConfig, IGapiClientConfig } from './gapi-client-config.interface';

@Injectable({
  providedIn: 'root'
})
export class GapiClientService {

  public Client$: Observable<void>;

  public get YouTube$() {
    return this.get('youtube', 'v3');
  }

  private clients: Map<string, Observable<void>> = new Map();

  constructor(
    @Inject(GapiClientConfig) clientConfig: IGapiClientConfig,
    private zone: NgZone
  ) {
    this.Client$ = new Observable<void>((subscriber) => {
      gapi.load('client', () => {
        gapi.client.init(clientConfig).then(() => zone.run(() => {
          subscriber.next();
          subscriber.complete();
        }))
      });
    }).pipe(
      shareReplay(1),
    );
  }

  private get(name: string, version: string): Observable<void> {
    const cid = name + ':' + version;

    if (this.clients.has(cid)) {
      return this.clients.get(cid) as Observable<void>;
    }

    const client$ = this.Client$.pipe(
      switchMap(() => new Observable<void>((subscriber) => {
        gapi.client.load(name, version).then(() => this.zone.run(() => {
          subscriber.next();
          subscriber.complete();
        }, this));
      }).pipe(
        shareReplay(1),
      ))
    );

    this.clients.set(cid, client$);

    return client$;
  }

  public Get<T>(func: PromiseLike<T>): Observable<T> {
    return new Observable<T>((subscriber) => {
      func.then( value => this.zone.run(value => {
        subscriber.next(value);
        subscriber.complete()
      }, undefined, [ value ]));
    });
  }

}

export type SearchResult = gapi.client.youtube.SearchResult;
export const YouTubeSearch = () => gapi.client.youtube.search;
