import { ModuleWithProviders, NgModule, Provider } from '@angular/core';

@NgModule()
export class GapiModule {

  static forRoot(...gapiProviders: Provider[]): ModuleWithProviders<GapiModule> {
    return {
      ngModule: GapiModule,
      providers: [
        ...gapiProviders
      ]
    }
  }

}
