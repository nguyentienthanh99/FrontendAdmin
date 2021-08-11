import { TestBed } from '@angular/core/testing';

import { HoaDonNhapService } from './hoa-don-nhap.service';

describe('HoaDonNhapService', () => {
  let service: HoaDonNhapService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HoaDonNhapService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
