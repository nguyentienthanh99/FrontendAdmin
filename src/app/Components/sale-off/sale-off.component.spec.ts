import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SaleOffComponent } from './sale-off.component';

describe('SaleOffComponent', () => {
  let component: SaleOffComponent;
  let fixture: ComponentFixture<SaleOffComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SaleOffComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SaleOffComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
