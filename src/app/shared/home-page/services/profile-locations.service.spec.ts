import { TestBed } from '@angular/core/testing';

import { ProfileLocationsService } from './profile-locations.service';

describe('ProfileLocationsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ProfileLocationsService = TestBed.get(ProfileLocationsService);
    expect(service).toBeTruthy();
  });
});
