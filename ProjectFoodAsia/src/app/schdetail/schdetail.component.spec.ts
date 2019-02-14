import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SchdetailComponent } from './schdetail.component';

describe('SchdetailComponent', () => {
  let component: SchdetailComponent;
  let fixture: ComponentFixture<SchdetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SchdetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SchdetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
