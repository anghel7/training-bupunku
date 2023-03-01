import { TestBed } from '@angular/core/testing';

import { SpecieService } from './specie.service';

describe('SpecieService', () => {
  let service: SpecieService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SpecieService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
