import { TestBed } from '@angular/core/testing';

import { NewjoineeService } from './newjoinee.service';

describe('NewjoineeService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NewjoineeService = TestBed.get(NewjoineeService);
    expect(service).toBeTruthy();
  });
});
