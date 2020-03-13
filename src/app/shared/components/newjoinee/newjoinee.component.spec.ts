import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewjoineeComponent } from './newjoinee.component';

describe('NewjoineeComponent', () => {
  let component: NewjoineeComponent;
  let fixture: ComponentFixture<NewjoineeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewjoineeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewjoineeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
