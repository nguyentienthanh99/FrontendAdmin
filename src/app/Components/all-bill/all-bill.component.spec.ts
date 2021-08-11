import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllBillComponent } from './all-bill.component';

describe('AllBillComponent', () => {
  let component: AllBillComponent;
  let fixture: ComponentFixture<AllBillComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllBillComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AllBillComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
