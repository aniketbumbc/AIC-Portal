import { Component, OnInit, HostListener } from '@angular/core';

@Component({
  selector: 'app-scroll-to-top',
  templateUrl: './scroll-to-top.component.html',
  styleUrls: ['./scroll-to-top.component.scss']
})
export class ScrollToTopComponent implements OnInit {
  scrTop: any = false;
  toastMsg: any = false;
  constructor() { }

  ngOnInit() { }

  @HostListener('document:scroll', ['$event'])
  onScroll(event) {
    if (event.srcElement.scrollingElement.scrollTop !== 0) {
      this.scrTop = true;
    } else {
      this.scrTop = false;
    }

    if (event.srcElement.scrollingElement.scrollTop !== 0) {
      this.toastMsg = true;
    } else {
      this.toastMsg = false;
    }
  }

  backToTop() {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });

  }
}
