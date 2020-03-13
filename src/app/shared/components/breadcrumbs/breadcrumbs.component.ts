import { Component, ChangeDetectionStrategy, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styleUrls: ['./breadcrumbs.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BreadcrumbsComponent implements OnInit {

  @Input("title") title: string;
  @Input("page") page: string;
  @Input() searchText: string;
  @Input() breadcrums: Array<object>;
  constructor() { }

  ngOnInit() {
  }

}
