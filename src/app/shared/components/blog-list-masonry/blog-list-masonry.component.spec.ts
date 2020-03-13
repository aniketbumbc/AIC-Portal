import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BlogListMasonryComponent } from './blog-list-masonry.component';

describe('BlogListMasonryComponent', () => {
  let component: BlogListMasonryComponent;
  let fixture: ComponentFixture<BlogListMasonryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BlogListMasonryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BlogListMasonryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
