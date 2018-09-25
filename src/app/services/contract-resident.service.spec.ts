import { TestBed, inject } from '@angular/core/testing';

import { ContractResidentService } from './contract-resident.service';

describe('ContractResidentService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ContractResidentService]
    });
  });

  it('should be created', inject([ContractResidentService], (service: ContractResidentService) => {
    expect(service).toBeTruthy();
  }));
});
