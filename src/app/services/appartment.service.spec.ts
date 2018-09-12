import { TestBed, inject } from '@angular/core/testing';

import { AppartmentsService } from './appartment.service';

describe('AppartmentService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AppartmentsService]
    });
  });

  it('should be created', inject([AppartmentsService], (service: AppartmentsService) => {
    expect(service).toBeTruthy();
  }));
});
