import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BlogListGridComponent } from './blog-list-grid.component';

describe('BlogListGridComponent', () => {
  let component: BlogListGridComponent;
  let fixture: ComponentFixture<BlogListGridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BlogListGridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BlogListGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
