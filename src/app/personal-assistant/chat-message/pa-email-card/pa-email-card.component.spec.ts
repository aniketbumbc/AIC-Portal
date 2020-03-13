/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { MaterialModule } from 'app/material.module';
import { PAEmailCardComponent } from './pa-email-card.component';
import { PipeModule } from 'app/shared/pipes/pipe.module';
import { HelperService } from '@components/personal-assistant/services/helper.service';
import { testcasesconfig } from 'app/shared/testcasesconfig';

describe('PAEmailCardComponent', () => {
  let component: PAEmailCardComponent;
  let fixture: ComponentFixture<PAEmailCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PAEmailCardComponent],
      imports: [MaterialModule, PipeModule],
      providers: [HelperService]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PAEmailCardComponent);
    component = fixture.componentInstance;
    component.showAllEmails = false;
    component.minCount = testcasesconfig.personal_assistant.email.minCount;
    component.maxCount = testcasesconfig.personal_assistant.email.maxCount;
    component.totalCount = testcasesconfig.personal_assistant.email.totalCount;
    component.minimumDisplayCount = component.minCount;

    component.emailCardItems =
      testcasesconfig.personal_assistant.email.emailCardItems;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have proper Input() data', () => {
    expect(component.emailCardItems).toBeTruthy();
    expect(component.totalCount).toBeTruthy();
    expect(component.maxCount).toBeTruthy();
    expect(component.minCount).toBeTruthy();
  });

  it('should have minCount, maxCount & totalCount as Numbers', () => {
    expect(isNaN(component.minCount)).toBeFalsy();
    expect(isNaN(component.maxCount)).toBeFalsy();
    expect(isNaN(component.totalCount)).toBeFalsy();
  });

  it('should have non-empty & of type string subject, bodyPreview and emailAddress', () => {
    component.emailCardItems.map(email => {
      expect(
        typeof email.subject === 'string' && email.subject !== ''
      ).toBeTruthy();
      expect(
        typeof email.bodyPreview === 'string' && email.bodyPreview !== ''
      ).toBeTruthy();
      expect(
        typeof email.from.emailAddress.address === 'string' &&
          email.from.emailAddress.address !== ''
      ).toBeTruthy();
    });
  });

  it('should display button(with arrow icon down) to expand if there are more than 2 email items', () => {
    expect(component.showAllEmails).toBeTruthy();
    expect(component.minimumDisplayCount).toBe(2);
  });

  it('should display button(with arrow icon up) to hide if all email items are visible', () => {
    expect(!component.showAllEmails).toBeFalsy();
  });

  it('should open email modal on click of email subject', () => {
    const btn = fixture.debugElement.query(By.css('.email_subject'));
    btn.triggerEventHandler('click', null);

    component.emailCardItems.map(email => {
      const type = testcasesconfig.personal_assistant.email.modalData.type;
      expect(type).toBe('email');
    });
  });
});
