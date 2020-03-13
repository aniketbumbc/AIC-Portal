import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FblogComponent } from './fblog.component';

describe('FblogComponent', () => {
  let component: FblogComponent;
  let fixture: ComponentFixture<FblogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FblogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FblogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
