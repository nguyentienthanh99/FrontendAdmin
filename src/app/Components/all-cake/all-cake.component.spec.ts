import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllCakeComponent } from './all-cake.component';

describe('AllCakeComponent', () => {
  let component: AllCakeComponent;
  let fixture: ComponentFixture<AllCakeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllCakeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AllCakeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
