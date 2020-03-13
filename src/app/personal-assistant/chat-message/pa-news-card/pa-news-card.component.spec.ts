/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { SwiperModule } from 'ngx-swiper-wrapper';
import { MaterialModule } from 'app/material.module';
import { LikeBookmarkService } from 'app/shared/services/likebookmark.service';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { DelegateService } from '@components/personal-assistant/services/delegate.service';
import { CustomizeDataService } from 'app/shared/services/CustomizeData.service';
import { PipeModule } from 'app/shared/pipes/pipe.module';
import { Observable } from 'rxjs/Observable';
import { PANewsCardComponent } from './pa-news-card.component';
import { AppSecrets } from '../../../../app.secrets';
import { Router } from '@angular/router';
import { testcasesconfig } from 'app/shared/testcasesconfig';

describe('PANewsCardComponent', () => {
  let component: PANewsCardComponent;
  let likebookmarkService: LikeBookmarkService;
  let _customizeDataService: CustomizeDataService;

  let fixture: ComponentFixture<PANewsCardComponent>;

  const mockRouter = testcasesconfig.mockRouter;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PANewsCardComponent],
      imports: [
        MaterialModule,
        SwiperModule,
        RouterTestingModule,
        HttpClientModule,
        PipeModule
      ],
      providers: [
        LikeBookmarkService,
        DelegateService,
        CustomizeDataService,
        AppSecrets,
        { provide: Router, useValue: mockRouter }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PANewsCardComponent);
    component = fixture.componentInstance;
    likebookmarkService = fixture.debugElement.injector.get(
      LikeBookmarkService
    );
    _customizeDataService = fixture.debugElement.injector.get(
      CustomizeDataService
    );
    component.newsCardItems =
      testcasesconfig.personal_assistant.news.newsCardItems;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch article details(like, view count, etc) after component initialized', () => {
    const dummyData: any =
      testcasesconfig.personal_assistant.shared.likeViewData;

    spyOn(likebookmarkService, 'getBookmarkLike').and.returnValue(
      Observable.of(dummyData)
    );
    const firstIndex = dummyData.data[0];
    expect(firstIndex.isViewed).toMatch(/false|true/);
    expect(firstIndex.isUserLiked).toMatch(/false|true/);

    const secondIndex = dummyData.data[1];
    expect(secondIndex.likeCount).toBeGreaterThan(-1);
    expect(secondIndex.viewCount).toBeGreaterThan(-1);

    expect(dummyData.responseCode).toBe(0);
  });

  it('should navigate to article details on click and add event', () => {
    const btn = fixture.debugElement.query(By.css('.news_card'));
    btn.triggerEventHandler('click', null);

    const testData = testcasesconfig.personal_assistant.shared.activityData;
    spyOn(likebookmarkService, 'addEvent').and.returnValue(
      Observable.of(testData)
    );
    expect(testData.data.viewContext).toBe('PersonalAssistant');
    expect(testData.responseCode).toBe(0);

    component.newsCardItems.map(article => {
      const qParams = {
        queryParams: {
          articleSource: article.articleSource
        }
      };
      const id = btoa(JSON.stringify(article.id));
      expect(mockRouter.navigate).toHaveBeenCalledWith(
        [`${article.type}`, id],
        qParams
      );
    });
  });
});
