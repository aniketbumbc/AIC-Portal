import { TestBed } from '@angular/core/testing';

import { ProfileQueryService } from './profile.service';

describe('ProfileQueryService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ProfileQueryService = TestBed.get(ProfileQueryService);
    expect(service).toBeTruthy();
  });
});
