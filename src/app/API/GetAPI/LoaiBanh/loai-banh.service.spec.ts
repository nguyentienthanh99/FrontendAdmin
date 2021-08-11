import { TestBed } from '@angular/core/testing';

import { LoaiBanhService } from './loai-banh.service';

describe('LoaiBanhService', () => {
  let service: LoaiBanhService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoaiBanhService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
