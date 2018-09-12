import { TestBed, inject } from '@angular/core/testing';

import { ResidentsService } from './residents.service';

describe('ResidentsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ResidentsService]
    });
  });

  it('should be created', inject([ResidentsService], (service: ResidentsService) => {
    expect(service).toBeTruthy();
  }));
});
