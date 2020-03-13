
import { Component, OnInit, Input, ChangeDetectorRef } from '@angular/core';

// import { config } from 'app/shared/config';
// import { environment } from '@env/environment';
import { HttpClient } from '@angular/common/http';
import { HelperService } from '@app/personal-assistant/services/helper.service';

@Component({
  selector: 'pa-email-card',
  templateUrl: './pa-email-card.component.html',
  styleUrls: ['./pa-email-card.component.scss']
})
export class PAEmailCardComponent implements OnInit {
  @Input() emailData: any;
  // @Input() params: any;

  moreEmailsFound = true;
  showInfoMessage = false;
  userAskedToSearchInEmails = false;
  isLoadingMoreEmails = false;
  isShowMoreButtonVisible = true;
  offset = 0;
  limit = 10;
  searchQuery: string;
  // fromEmail: string;

  totalCount: number;

  minimumDisplayCount = 2;

  showAllEmails = false;

  toolTipDelay = 500;
  position = 'after';
  responseObj: object = {
    name: '',
    introduction: '',
    image: ''
  };
  cardData: Array<any> = [];
  constructor(
    private _helper: HelperService,
    private ref: ChangeDetectorRef,
    private http: HttpClient
  ) {}

  ngOnInit() {
    // const { search_query, user_first_name } = this.params;
    // this.defaultImg = 'assets/none.jpg';
    let list = this.emailData && this.emailData.list ? this.emailData.list : [];
    if (list.length > 0) {
      list.forEach(element => {
        console.log(element);
        this.responseObj = {};

        this.responseObj['title'] = element.title;
        this.responseObj['isRead'] = false;
        this.responseObj['subtitle'] = element.subtitle;
        this.responseObj['snippet'] = element.snippet;
        this.responseObj['receivedDateTime'] = '2018-01-01';
        this.cardData.push(this.responseObj);
      });
    }
    console.log(this.cardData, 'Card Data');
    this.totalCount = this.cardData.length;
    // this.searchQuery = search_query.replace(/'/g, '');
    this.addDefaultIfEmpty();
    // this.fromEmail =
    //   user_first_name === ''
    //     ? this.searchQuery
    //     : user_first_name;

    // if (search_query !== '' || user_first_name !== '') {
    //   this.userAskedToSearchInEmails = true;
    // }
  }

  showAllEmail(): void {
    this._helper.updateScrollbar.next('update');
    if (!this.showAllEmails) {
      this.showAllEmails = true;
      this.minimumDisplayCount = this.totalCount;
    } else {
      this.showAllEmails = false;
      this.minimumDisplayCount = 2;
    }
  }

  private addDefaultIfEmpty() {
    this.cardData.map(email => {
      email.subject = email.subject !== '' ? email.subject : '(No subject)';
      email.bodyPreview =
        email.bodyPreview !== '' ? email.bodyPreview : '(No body)';
      return email;
    });
  }
  loadSelectedMail(value) {
    const body = document.getElementsByTagName('body');
    const link = document.createElement('a');
    link.setAttribute('target', '_blank');
    link.setAttribute('href', value['webLink']);
    link.style.display = 'none';

    body[0].appendChild(link);
    link.click();

    setTimeout(() => {
      body[0].removeChild(link);
    }, 300);
  }

  async loadMoreEmails() {
    this.offset = this.offset + 10;
    this.isLoadingMoreEmails = true;
    try {
      const emails: any = await this.getEmails();
      this.isLoadingMoreEmails = false;
      const { result } = emails;
      if (result.length !== 0) {
        this.cardData = [...this.cardData, ...result];
        this.totalCount = this.cardData.length;
        this.minimumDisplayCount = this.totalCount;
        this.showInfoMessage = false;
        this.moreEmailsFound = true;
        this._helper.updateScrollbar.next('update');
      } else {
        this.moreEmailsFound = false;
        this.showInfoMessage = true;
        setTimeout(() => {
          this.showInfoMessage = false;
          this.ref.detectChanges();
        }, 4 * 1000);
      }
      this.ref.detectChanges();
    } catch (error) {}
  }

  displayShowMoreButton(): boolean {
    return (
      this.moreEmailsFound &&
      this.showAllEmails &&
      !this.isLoadingMoreEmails &&
      !this.userAskedToSearchInEmails
    );
  }

  displayInfoMessage(): boolean {
    return this.showInfoMessage && this.showAllEmails;
  }
  getEmails() {
    const url = '';
    const body = {};

    return this.http.post(url, body).toPromise();
  }
}
