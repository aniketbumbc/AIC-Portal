import { Component, OnInit, Input } from '@angular/core';
import { config } from '@app/configs/app.configs';
import { environment } from '@env/environment';

@Component({
  selector: 'app-blog-list-masonry',
  templateUrl: './blog-list-masonry.component.html',
  styleUrls: ['./blog-list-masonry.component.scss']
})
export class BlogListMasonryComponent implements OnInit {
  // public masonryOptions: NgxMasonryOptions = {
  // 	transitionDuration: '0.1s',
  // };
  baseUrl: string;
  decached: any = config.DECACHED;
  imageUrl: string;
  src: string;
  authorImage: any;
  @Input() fetchData: any;
  @Input() thumbnail: any;
  @Input() loader: boolean;
  @Input() blogList: any;
  @Input() updateMasonryLayout = true;

  constructor() { }

  ngOnInit() {
    this.baseUrl = config.AIC_PROFILE_IMAGE_URL;
    this.imageUrl = config.AIC_IMAGE_URL;
    this.authorImage = environment.imageUrl;
  }
}
