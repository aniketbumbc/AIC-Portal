import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER, CUSTOM_ELEMENTS_SCHEMA  } from '@angular/core';
import { KeycloakService, KeycloakAngularModule } from 'keycloak-angular';
import { initializer } from './utils/app-init';

import { CoreModule } from '@app/core';
import { SharedModule } from '@app/shared';
/**
 * apollo imports
 */
import { ApolloModule, Apollo } from 'apollo-angular';
import { HttpLinkModule, HttpLink } from 'apollo-angular-link-http';
import {
  InMemoryCache,
  IntrospectionFragmentMatcher,
} from 'apollo-cache-inmemory';
import { setContext } from 'apollo-link-context';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { HeaderComponent } from './layouts/header/header.component';
import { FooterComponent } from './layouts/footer/footer.component';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { ContentLayoutComponent } from './layouts/content-layout/content-layout.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthModule } from './modules/auth/auth.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
// import { HttpClient } from 'selenium-webdriver/http';
import { environment } from '@env/environment';
import { NotFoundComponent } from './modules/not-found/not-found/not-found.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { FroalaEditorModule, FroalaViewModule } from 'angular-froala-wysiwyg';

/**
 * chatbot imports
 */
import { ChatWindowComponent } from './personal-assistant/chat-window/chat-window.component';
import { ChatMessageComponent } from './personal-assistant/chat-message/chat-message.component';
import { SiriWaveComponent } from './personal-assistant/siri-wave/siri-wave.component';
import { PANewsCardComponent } from './personal-assistant/chat-message/pa-news-card/pa-news-card.component';
import { PAEmailCardComponent } from './personal-assistant/chat-message/pa-email-card/pa-email-card.component';
import { MultipleChoiceComponent } from './personal-assistant/chat-message/multiple-choice/multiple-choice.component';
import { MaterialModule } from './personal-assistant/material.module';
import { PipeModule } from './personal-assistant/pipes/pipe.module';
import { PerfectScrollbarModule, PERFECT_SCROLLBAR_CONFIG, PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { SwiperModule } from 'ngx-swiper-wrapper';
import { MessagesService } from './personal-assistant/services/message.service';
import { HelperService } from './personal-assistant/services/helper.service';
import { DelegateService } from './personal-assistant/services/delegate.service';
import { SpeechRecognitionService } from './personal-assistant/services/speech-recognition/speech-recognition.service';
import { SpeechSynthesisService } from './personal-assistant/services/speech-recognition/speech-synthesis.service';
import { BrowserDetectService } from './personal-assistant/services/browser-detect.service';
import { VoiceService } from './personal-assistant/services/speech-api.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoaderInterceptor } from './core/interceptors/loader.interceptor';
import {ToastModule} from 'primeng/toast';
import { GrowlAlertService} from './core/services/growl-alert.service';
import { NgxGridModule } from 'ngx-web-grid';
import { SearchQueryService } from './modules/search/service/search.service';

const introspectionQueryResultData = {
  __schema: {
    types: [
      {
        kind: 'UNION',
        name: 'ContentsByStructureName',
        possibleTypes: [
          {
            name: 'login',
          },
          {
            name: 'serviceAlerts',
          }
        ],
      },
    ],
  },
};
const fragmentMatcher = new IntrospectionFragmentMatcher({
  introspectionQueryResultData,
});

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true
};


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    AuthLayoutComponent,
    ContentLayoutComponent,
    NotFoundComponent,
    ChatWindowComponent,
    ChatMessageComponent,
    SiriWaveComponent,
    PANewsCardComponent,
    PAEmailCardComponent,
    MultipleChoiceComponent,
  ],
  imports: [
    [KeycloakAngularModule],
    BrowserModule,
    NgxSpinnerModule,
    // core & shared
    CoreModule,
    SharedModule,
    AuthModule,
    AppRoutingModule,
    ApolloModule,
    HttpClientModule,
    HttpLinkModule,
    BrowserAnimationsModule,
    MaterialModule,
    PipeModule,
    PerfectScrollbarModule,
    SwiperModule,
    FormsModule,
    ReactiveFormsModule,
    ToastModule,
    NgxGridModule,
    FroalaEditorModule.forRoot(),
    FroalaViewModule.forRoot(),
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: initializer,
      multi: true,
      deps: [KeycloakService]
    },
    { provide: HTTP_INTERCEPTORS, useClass: LoaderInterceptor, multi: true },
    Apollo,
    HttpLink,
    MessagesService,
    HelperService,
    DelegateService,
    SpeechRecognitionService,
    SpeechSynthesisService,
    BrowserDetectService,
    GrowlAlertService,
    VoiceService,
    SearchQueryService,
    {
      provide: PERFECT_SCROLLBAR_CONFIG,
      useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
    }
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
  bootstrap: [AppComponent],
  entryComponents: [ChatWindowComponent]
})
export class AppModule {
  constructor(apollo: Apollo, httpLink: HttpLink) {
    apollo.createDefault({
      cache: new InMemoryCache({ fragmentMatcher }),
      link: httpLink.create({
        uri: environment.graphQlUrl
      }),
    });
    apollo.createNamed('client2',{
      cache: new InMemoryCache({ fragmentMatcher }),
      link: httpLink.create({
        uri:environment.newgraphQlUrl
      }),
    });    
  }
}
