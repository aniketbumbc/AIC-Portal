import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LocProfilesComponent } from './loc-profiles.component';

describe('LocProfilesComponent', () => {
  let component: LocProfilesComponent;
  let fixture: ComponentFixture<LocProfilesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LocProfilesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LocProfilesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
