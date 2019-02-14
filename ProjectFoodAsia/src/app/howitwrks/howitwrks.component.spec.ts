import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HowitwrksComponent } from './howitwrks.component';

describe('HowitwrksComponent', () => {
  let component: HowitwrksComponent;
  let fixture: ComponentFixture<HowitwrksComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HowitwrksComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HowitwrksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
