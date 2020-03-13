import { TestBed } from '@angular/core/testing';

import { MyProjectsService } from './my-projects.service';

describe('MyProjectsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MyProjectsService = TestBed.get(MyProjectsService);
    expect(service).toBeTruthy();
  });
});
