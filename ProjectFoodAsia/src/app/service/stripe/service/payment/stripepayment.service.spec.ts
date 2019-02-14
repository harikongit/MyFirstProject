import { TestBed, inject } from '@angular/core/testing';

import { StripepaymentService } from './stripepayment.service';

describe('StripepaymentService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [StripepaymentService]
    });
  });

  it('should be created', inject([StripepaymentService], (service: StripepaymentService) => {
    expect(service).toBeTruthy();
  }));
});
