import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { GapiAuthConfig, GapiClientConfig, IGapiAuthConfig, IGapiClientConfig } from 'gapi';
import { GapiModule } from 'projects/gapi/src/public-api';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    GapiModule.forRoot({
      provide: GapiAuthConfig,
      useValue: <IGapiAuthConfig>{
        client_id: '360016100741-8aq7856g950lv9r3ehrstlb9k4npi519.apps.googleusercontent.com',
        fetch_basic_profile: true,
        scope: 'https://www.googleapis.com/auth/youtube.readonly'
      }
    }, {
      provide: GapiClientConfig,
      useValue: <IGapiClientConfig>{
        apiKey: 'AIzaSyBzVr6v71R0Xzg_muMTCBBKJirh9KJyzqI',
        clientId: 'karaoke-dashboard',
      }
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
