import {
  Component,
  OnInit,
  Input,
  ChangeDetectorRef,
  ViewChild
} from "@angular/core";
import { SwiperConfigInterface } from "ngx-swiper-wrapper";
import { environment } from "@env/environment";

import { SwiperDirective } from "ngx-swiper-wrapper";

@Component({
  selector: "pa-news-card",
  templateUrl: "./pa-news-card.component.html",
  styleUrls: ["./pa-news-card.component.scss"]
})
export class PANewsCardComponent implements OnInit {
  @Input() newsData: any;

  @ViewChild(SwiperDirective)
  newsSwiper: SwiperDirective;

  newsViewCount: number;
  config: SwiperConfigInterface = {};
  responseObj: object = {
    name: "",
    introduction: "",
    image: ""
  };
  cardData: Array<any> = [];
  defaultImg = "assets/none.jpg";
  constructor(private ref: ChangeDetectorRef) {
    this.newsViewCount = 0;
  }

  ngOnInit(): void {
    // this.defaultImg = "assets/none.jpg";
    let list = this.newsData && this.newsData.list ? this.newsData.list : [];
    if (list.length > 0) {
      list.forEach(element => {
        console.log(element);
        this.responseObj = {};
        this.responseObj["title"] = element.title || "";
        this.responseObj["description"] = element.description || "";
        this.responseObj["thumbnailImg"] =
          element.thumbnailImg || this.defaultImg;
        // this.responseObj["thumbnailImg"] = this.defaultImg;

        this.cardData.push(this.responseObj);
      });
    }
    // this.cardData.push({
    //   title: "some test name",
    //   description: "some",
    //   thumbnailImg: ""
    // });

    this.config = {
      // navigation: {
      //   nextEl: ".chat-swiper-button-next",
      //   prevEl: ".chat-swiper-button-prev"
      // },
      navigation: true,
      spaceBetween: 40,
      slidesPerView: 1,
      initialSlide: 0,
      centeredSlides: true,
      keyboard: true,
      width: 270,
      slidesOffsetBefore: 50
    };
  }

  private formatNewsItems() {}
}
