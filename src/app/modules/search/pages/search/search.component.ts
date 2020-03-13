import { Component, OnInit, OnDestroy } from '@angular/core';
import { SearchQueryService } from '../../service/search.service';
import { SpeechSynthesisService } from '../../../../personal-assistant/services/speech-recognition/speech-synthesis.service'
import * as _ from 'lodash';
import { TabDirective } from 'ngx-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})

export class SearchComponent implements OnInit, OnDestroy {
  showloader: Boolean = false;
  blogList: any;
  activeTab: string = 'profile';
  searchtext: string = '';
  employeeSearchData: any = [];
  blogSearchData: any = [];
  projectSearcData: any = [];
  projectId: any[];
  count = {
    profile: 0,
    project: 0,
    blog: 0
  };
  showNoResults = {};
  value: string;
  masonryLayout = false;
  searchSubscription: any;
  private _onDestroy = new Subject<void>();

  constructor(
    private searchQueryService: SearchQueryService,
    private spinner: NgxSpinnerService,
    private speech: SpeechSynthesisService
  ) { }

  ngOnInit() {
    this.searchData();
  }

  onSelect(data: TabDirective): void {
    this.value = data.heading.toLowerCase();
    if (this.value.search('blog') !== -1) {
      this.masonryLayout = true;
    }
  }

  ngOnDestroy(): void {
    this._onDestroy.next();
    this._onDestroy.complete();

    if (this.searchSubscription) {
      this.searchSubscription.unsubscribe();
    }
  }

  searchData() {
    this.searchSubscription = this.searchQueryService.getSearchData().subscribe((res: any) => {
      let speechOutputText = `No results found.`,
          keys: any = [];

      this.spinner.show();
      this.employeeSearchData.length = 0;
      this.blogSearchData.length = 0;
      this.projectSearcData.length = 0;
      if (res['data'] && res['data']['data'] && res['data']['data']['_doc'] && res['data']['data']['_doc'].length) {
        const _docData = res['data']['data']['_doc'];
        for (let i = 0; i < _docData.length; i++) {
          keys = Object.keys(_docData[i]);
          if (keys.includes("socialProfiles") && keys.includes("education")) {
            this.employeeSearchData.push(_docData[i]);
          } else if (keys.includes("embeddedUrl") && keys.includes("categories")) {
            this.blogSearchData.push(_docData[i]);
          } else if(keys.includes("status") && keys.includes("techstack")){
            this.projectSearcData.push(_docData[i]);
          }
        }
        speechOutputText = `Showing results.`
      }
      this.speech.speakText(speechOutputText).subscribe();
      this.count = {
        profile: this.employeeSearchData.length,
        project: this.projectSearcData.length,
        blog: this.blogSearchData.length,
      }
      this.showNoResults = {
        profile: !this.employeeSearchData.length,
        project: !this.projectSearcData.length,
        blog: !this.blogSearchData.length
      };
      this.spinner.hide();
    });
  }
}

