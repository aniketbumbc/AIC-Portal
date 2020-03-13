/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { SiriWaveComponent } from './siri-wave.component';

describe('SiriWaveComponent', () => {
  let component: SiriWaveComponent;
  let fixture: ComponentFixture<SiriWaveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SiriWaveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SiriWaveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
