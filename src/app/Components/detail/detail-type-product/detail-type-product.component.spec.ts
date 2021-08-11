import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailTypeProductComponent } from './detail-type-product.component';

describe('DetailTypeProductComponent', () => {
  let component: DetailTypeProductComponent;
  let fixture: ComponentFixture<DetailTypeProductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailTypeProductComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailTypeProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
