import { TestBed } from '@angular/core/testing';

import { BanhService } from './banh.service';

describe('BanhService', () => {
  let service: BanhService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BanhService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
