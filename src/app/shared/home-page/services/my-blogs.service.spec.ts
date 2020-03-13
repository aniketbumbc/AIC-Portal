import { TestBed } from '@angular/core/testing';

import { MyBlogsService } from './my-blogs.service';

describe('MyBlogsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MyBlogsService = TestBed.get(MyBlogsService);
    expect(service).toBeTruthy();
  });
});
