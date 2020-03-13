import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SkillsMatrixListComponent } from './skills-matrix-list.component';

describe('SkillsMatrixListComponent', () => {
  let component: SkillsMatrixListComponent;
  let fixture: ComponentFixture<SkillsMatrixListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SkillsMatrixListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SkillsMatrixListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
