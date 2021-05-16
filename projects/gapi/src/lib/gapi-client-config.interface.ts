import { InjectionToken } from "@angular/core";

export interface IGapiClientConfig {
    /**
     * The API Key to use.
     */
    apiKey?: string;
    /**
     * An array of discovery doc URLs or discovery doc JSON objects.
     */
    discoveryDocs?: string[];
    /**
     * The app's client ID, found and created in the Google Developers Console.
     */
    clientId?: string;
    /**
     * The scopes to request, as a space-delimited string.
     */
    scope?: string,

    hosted_domain?: string;
};

export const GapiClientConfig = new InjectionToken<IGapiClientConfig>('GapiClientConfig');
