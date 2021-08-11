import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailPhieuNhapComponent } from './detail-phieu-nhap.component';

describe('DetailPhieuNhapComponent', () => {
  let component: DetailPhieuNhapComponent;
  let fixture: ComponentFixture<DetailPhieuNhapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailPhieuNhapComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailPhieuNhapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
