import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FprojectComponent } from './fproject.component';

describe('FprojectComponent', () => {
  let component: FprojectComponent;
  let fixture: ComponentFixture<FprojectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FprojectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FprojectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
