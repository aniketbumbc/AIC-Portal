import { Component, OnInit, OnDestroy } from '@angular/core';
import { HomeQueryService } from '../../services/home.service';
import { map } from 'rxjs/operators';
import { config } from '@app/configs/app.configs';
import * as _ from 'lodash';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {
  baseUrl: string;
  peopleList: any;
  peopleData: any;
  blogData: any;
  projectData: any;
  fetchDetails:any;
  rlNameAndPhoto:any={}
  param: {
    PeopleRequest: {
      aiclevel: string;
      status: string;
      pageLength: number;
      pageOffset: number;
      sortBy: string;
      count: number;
    };
    sessionId: any;
  };
  private _onDestroy = new Subject<void>();

  constructor(
    private homeQueryService: HomeQueryService,
    private router: Router
  ) {}

  ngOnInit() {
    this.getFetchDetails();
    this.baseUrl = config.AIC_URL;
    this.param = {
      "PeopleRequest" : {
        "aiclevel": "none",
        "status": "active",
        "pageLength": 0, 
        "pageOffset": 0,
        "sortBy": "name",
        "count": 4
     },
      sessionId: localStorage.getItem('token'),
    };
    this.getDataByAiclevels(this.param);

    const parameter = {
      DemoRequest: {
        pageLength: 6,
        pageOffset: 10,
      },
      sessionId: localStorage.getItem('token'),
    };
    this.homeQueryService
      .getBlogQuery(parameter)
      .valueChanges.subscribe(res => {
        this.blogData = res['data']['GetDemos']['demos'];
        /* const data = res['data']['GetDemos']['demos'];
        this.blogData = _.chunk(data, Math.ceil(data.length / 3));
        if (data.length > 3 && data.length % 3 === 1) {
          if (typeof this.blogData[2] === 'undefined') {
            this.blogData[2] = [];
          }
          this.blogData[2].push(this.blogData[1].pop());
        } */
      });

    const paramRequest = {
      ProjectRequest: {
        limit: 4,
        offset: 15,
      },
      sessionId: localStorage.getItem('token'),
    };
    this.homeQueryService
      .getProjectQuery(paramRequest)
      .valueChanges.pipe(map(result => result))
      .subscribe(res => {
        this.projectData = res['data']['GetProjects']['projects'];
      });
  }
  getFetchDetails() {
    const param = {
      sessionId: localStorage.getItem('token'),
    };
    this.homeQueryService
      .getFetchDetailsQuery(param)
      .valueChanges.subscribe(res => {
        this.fetchDetails = res.data.GetFetchDetails;
        this.fetchDetails.realName.map(obj=>{
        this.rlNameAndPhoto[obj.id]={"name":obj.name,"profile_pic":obj.photograph }
        });
        this.fetchDetails.rlNameAndPhoto=this.rlNameAndPhoto;
      });
  }
  getDataByAiclevels(value: any) {
    this.homeQueryService
      .getProfileQuery(value)
      .valueChanges.pipe(map(res => res))
      .subscribe(data => {
        if (this.peopleData) {
          this.peopleList = data.data.GetUpdatedProfiles.profiles;
        } else {
          this.peopleData = data.data.GetUpdatedProfiles;
          this.peopleList = this.peopleData.profiles;
        }
      });
  }
  profileListShow() {
    localStorage.removeItem('tabValue');
  }
  ngOnDestroy(): void {
    this._onDestroy.next();
    this._onDestroy.complete();
  }
}
