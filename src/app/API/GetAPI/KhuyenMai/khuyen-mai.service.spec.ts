import { TestBed } from '@angular/core/testing';

import { KhuyenMaiService } from './khuyen-mai.service';

describe('KhuyenMaiService', () => {
  let service: KhuyenMaiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(KhuyenMaiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
