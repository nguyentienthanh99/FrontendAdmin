import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KMHetHanComponent } from './km-het-han.component';

describe('KMHetHanComponent', () => {
  let component: KMHetHanComponent;
  let fixture: ComponentFixture<KMHetHanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KMHetHanComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(KMHetHanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
