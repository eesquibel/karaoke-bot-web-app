import { InjectionToken } from "@angular/core";
import ClientConfig = gapi.auth2.ClientConfig;

export interface IGapiAuthConfig extends ClientConfig {

}

export const GapiAuthConfig = new InjectionToken<IGapiAuthConfig>('GapiAuthConfig');
