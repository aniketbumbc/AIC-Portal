import { TestBed } from '@angular/core/testing';

import { CommonHomeService } from './common-home.service';

describe('CommonHomeService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CommonHomeService = TestBed.get(CommonHomeService);
    expect(service).toBeTruthy();
  });
});
