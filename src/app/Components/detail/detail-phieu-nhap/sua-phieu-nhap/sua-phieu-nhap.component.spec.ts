import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuaPhieuNhapComponent } from './sua-phieu-nhap.component';

describe('SuaPhieuNhapComponent', () => {
  let component: SuaPhieuNhapComponent;
  let fixture: ComponentFixture<SuaPhieuNhapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SuaPhieuNhapComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SuaPhieuNhapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
