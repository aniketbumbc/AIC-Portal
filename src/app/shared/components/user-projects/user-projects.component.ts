import { Component, OnInit, OnDestroy } from '@angular/core';
import { MyProjectsService } from '../../home-page/services/my-projects.service';
import { CommonService } from '../../../modules/featured/common-home.service';
import { Router } from '@angular/router';
import { config } from '@app/configs/app.configs';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-user-projects',
  templateUrl: './user-projects.component.html',
  styleUrls: ['./user-projects.component.scss']
})
export class UserProjectsComponent implements OnInit, OnDestroy {
  imageUrl: any = config.AIC_PROFILE_IMAGE_URL;
  decached: any = config.DECACHED;
  public projectData: any;
  profileId: any;
  getProjects: any;
  fetchDetails: any;
  fetchDetailsData: any = {};
  checkProjectData: any = true;  
  private _onDestroy = new Subject<void>();
  constructor(private myprojectservice: MyProjectsService, private commonservice: CommonService,
    private router: Router) { }

  ngOnInit() {
    this.profileId = JSON.parse(localStorage.userDetails).username;
    this.getMyProjectData();
  }
  getMyProjectData() {
    let data = {
      "where": {
        "email": this.profileId
      }
    };
    this.myprojectservice
      .getRelatedNewProjectsQuery(data)
      .valueChanges.subscribe(res => {        
        this.projectData = res.data.employees;
        if (   this.projectData[0] && this.projectData[0].projects.length >= 1) {
          this.checkProjectData = false;
        }
        if ( this.projectData[0] && this.projectData[0].projects.length > 2) {
          this.projectData[0].projects = this.projectData[0].projects.slice(0, 2);
        }
        this.projectData.map(e => {
          e.projects.map(ele => {
            ele.description = this.commonservice.removeHtml(ele.description);
            if (ele.employees.length > 4) {
              ele.employees = ele.employees.slice(0, 4);
            }
          
          })
        });
        
      });
    
  }
  ngOnDestroy(): void {
    this._onDestroy.next();
    this._onDestroy.complete();
  }
}

