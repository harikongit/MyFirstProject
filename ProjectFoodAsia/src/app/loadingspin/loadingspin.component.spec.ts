import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadingspinComponent } from './loadingspin.component';

describe('LoadingspinComponent', () => {
  let component: LoadingspinComponent;
  let fixture: ComponentFixture<LoadingspinComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoadingspinComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoadingspinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
