import { TestBed } from '@angular/core/testing';

import { GapiAuthService } from './gapi-auth.service';

describe('GapiAuthService', () => {
  let service: GapiAuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GapiAuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
