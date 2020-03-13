import { Component, OnInit, Input } from '@angular/core';
import { config } from '@app/configs/app.configs';

@Component({
  selector: 'app-blog-list-grid',
  templateUrl: './blog-list-grid.component.html',
  styleUrls: ['./blog-list-grid.component.scss']
})
export class BlogListGridComponent implements OnInit {
  baseUrl: string;
  @Input() blogList;

  constructor() { }

  ngOnInit() {
    this.baseUrl = config.AIC_URL;
  }

}
