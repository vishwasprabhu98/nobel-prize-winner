import { TestBed } from '@angular/core/testing';

import { NobelWinnersService } from './nobel-winners.service';

describe('NobelWinnersService', () => {
  let service: NobelWinnersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NobelWinnersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
