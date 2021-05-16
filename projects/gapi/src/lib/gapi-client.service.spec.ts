import { TestBed } from '@angular/core/testing';

import { GapiClientService } from './gapi-client.service';

describe('GapiClientService', () => {
  let service: GapiClientService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GapiClientService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
