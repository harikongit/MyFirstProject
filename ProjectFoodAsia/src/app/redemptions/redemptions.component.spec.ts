import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RedemptionsComponent } from './redemptions.component';

describe('RedemptionsComponent', () => {
  let component: RedemptionsComponent;
  let fixture: ComponentFixture<RedemptionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RedemptionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RedemptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
