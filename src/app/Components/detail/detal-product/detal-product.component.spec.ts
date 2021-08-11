import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalProductComponent } from './detal-product.component';

describe('DetalProductComponent', () => {
  let component: DetalProductComponent;
  let fixture: ComponentFixture<DetalProductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetalProductComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetalProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
