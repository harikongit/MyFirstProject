import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BenefReviewComponent } from './benef-review.component';

describe('BenefReviewComponent', () => {
  let component: BenefReviewComponent;
  let fixture: ComponentFixture<BenefReviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BenefReviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BenefReviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
