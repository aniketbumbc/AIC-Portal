import { Component, OnInit, OnDestroy } from '@angular/core';
import { ChatBotService } from './shared/services';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy { 
  emailIds = ['chandesh.manjarekar@accionlabs.com', 'sunil.lulla@accionlabs.com'];
  private _onDestroy = new Subject<void>();

  constructor(private chatBotService: ChatBotService, private router: Router) { }

  ngOnInit() {
    if (localStorage.getItem('user') && this.emailIds.indexOf(JSON.parse(localStorage.getItem('user')).email) !== -1) {
      this.chatBotService.getMessages().subscribe(res => {
        console.log(res['data']);

        if (res['data'].type === 'scroll_down') {
          // document.documentElement.scrollBy(0, document.documentElement.scrollTop + 500);
          document.documentElement.scrollBy({
            top: 500,
            left: 0,
            behavior: 'smooth'
          });
        }

        if (res['data'].type === 'scroll_up') {
          document.documentElement.scrollBy({
            top: -500,
            left: 0,
            behavior: 'smooth'
          });
        }

        if (res['data'].type === 'scroll_top') {
          document.documentElement.scrollBy({
            top: 0,
            left: 0,
            behavior: 'smooth'
          });
        }

        if (res['data'].type === 'url') {
          if (res['data'].params.queryParams !== '') {
            if (res['data'].params.tab !== '') {
              this.router.navigate([res['data']['params']['url']], { queryParams: { q: res['data']['params']['queryParams'], tab: res['data']['params']['tab'] } });
            } else {
              this.router.navigate([res['data']['params']['url']], { queryParams: { q: res['data']['params']['queryParams'] } });
            }
          } else {
            // window.location.href = res['data']['params']['url'];
            this.router.navigate([res['data']['params']['url']]);
          }
        }

        if (res['data'].type === 'scroll') {
          if (res['data'].params.scrollTo) {
            const element = document.getElementById(res['data'].params.scrollTo);
            // element.scrollIntoView({behavior: 'smooth', block: 'start'});
            if (element !== null) {
              console.log(element.offsetTop);
              if (element.offsetTop) {
                window.scroll({
                  top: element.offsetTop - 100,
                  left: 0,
                  behavior: 'smooth'
                });
              }
            }
          }
        }
      });
    }
  }

  onActivate() {
    window.scrollTo(0, 0);
  }

  ngOnDestroy(): void {
    this._onDestroy.next();
    this._onDestroy.complete();
  }
}
