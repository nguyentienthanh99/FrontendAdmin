import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailSaleOffComponent } from './detail-sale-off.component';

describe('DetailSaleOffComponent', () => {
  let component: DetailSaleOffComponent;
  let fixture: ComponentFixture<DetailSaleOffComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailSaleOffComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailSaleOffComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
