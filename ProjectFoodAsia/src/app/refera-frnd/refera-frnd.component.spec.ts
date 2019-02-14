import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReferaFrndComponent } from './refera-frnd.component';

describe('ReferaFrndComponent', () => {
  let component: ReferaFrndComponent;
  let fixture: ComponentFixture<ReferaFrndComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReferaFrndComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReferaFrndComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
