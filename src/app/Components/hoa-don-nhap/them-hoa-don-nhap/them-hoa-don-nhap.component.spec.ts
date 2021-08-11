import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThemHoaDonNhapComponent } from './them-hoa-don-nhap.component';

describe('ThemHoaDonNhapComponent', () => {
  let component: ThemHoaDonNhapComponent;
  let fixture: ComponentFixture<ThemHoaDonNhapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ThemHoaDonNhapComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ThemHoaDonNhapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
