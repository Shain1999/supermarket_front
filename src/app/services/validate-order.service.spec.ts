import { TestBed } from '@angular/core/testing';

import { ValidateOrderService } from './validate-order.service';

describe('ValidateOrderService', () => {
  let service: ValidateOrderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ValidateOrderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
