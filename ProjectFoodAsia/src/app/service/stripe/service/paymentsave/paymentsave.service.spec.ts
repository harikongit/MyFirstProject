import { TestBed, inject } from '@angular/core/testing';

import { PaymentsaveService } from './paymentsave.service';

describe('PaymentsaveService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PaymentsaveService]
    });
  });

  it('should be created', inject([PaymentsaveService], (service: PaymentsaveService) => {
    expect(service).toBeTruthy();
  }));
});
