import { TestBed } from '@angular/core/testing';

import { NobelWinnersService } from './nobel-winners.service';
import { provideHttpClient } from '@angular/common/http';

describe('NobelWinnersService', () => {
  let service: NobelWinnersService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient()
      ]
    });
    service = TestBed.inject(NobelWinnersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
