import { TestBed } from '@angular/core/testing';

import { IsUserConnectedService } from './is-user-connected.service';

describe('IsUserConnectedService', () => {
  let service: IsUserConnectedService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IsUserConnectedService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
