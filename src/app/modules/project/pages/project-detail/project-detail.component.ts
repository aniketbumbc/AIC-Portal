import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import * as _ from 'lodash';
import { ProjectQueryService } from '../../services/project.service';
import { config } from '../../../../configs/app.configs';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { url } from 'inspector';



@Component({
  selector: 'app-project-detail',
  templateUrl: './project-detail.component.html',
  styleUrls: ['./project-detail.component.scss']
})
export class ProjectDetailComponent implements OnInit, OnDestroy {
  id: string;
  parameter: any;
  slug:string;
  projectDetail: any;
  imageURL: string = config.AIC_URL;
  skillValuesCount = false;
  membersCount = false;
  imageUrl: string;
  projectManager = false;
  deliveryManager = false;
  fetchDetails: any;
  breadCrumb: any;
  
  rlNameAndPhoto: any = {};
  statusValue: number;
  private _onDestroy = new Subject<void>();

  @ViewChild('progressBar') ProgressBar;
  projectDetailNew: any;
  projectMembers = [];

  constructor(private projectQueryService: ProjectQueryService, private route: ActivatedRoute) { }
  ngOnInit() {
    this.imageUrl = config.AIC_IMAGE_URL;
    // this.parameter = this.route.params.subscribe(params => {
    //   this.id = params['id'];
    // });
    this.slug = this.route.snapshot.params['id'];
    this.id=this.slug;
    this.getProjectDetail1(this.id);
    this.breadCrumb = [
      {
        label: 'Home',
        url: '/home',
        isActive: false
      }, {
        label: 'Projects',
        url: '/project',
        isActive: false
      }, {
        label: 'Details',
        url: `/project/${this.slug}`,
        isActive: true
      }];
    
  }

  updateProgessBar() {
    //let start, end, diffTime, diffDays, currentDiffTime, currentDiffDays, width;

    if (this.projectDetailNew.status === "ongoing") {
      this.statusValue = 50;
    } else  if (this.projectDetailNew.status === "closed") {
      // this.ProgressBar.nativeElement.style.background = "red";
      this.statusValue = 100;
    }
  }
    // else {
    //   start = new Date(this.projectDetailNew.startDate);
    //   end = new Date(this.projectDetailNew.endDate);
    //   diffTime = Math.abs(end.getTime() - start.getTime());
    //   diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    //   currentDiffTime = (new Date().getTime()) - start.getTime();
    //   currentDiffDays = Math.floor(currentDiffTime / (1000 * 60 * 60 * 24));

    //   if (currentDiffDays <= 0) {
    //     width = "0%";
    //   } else if (currentDiffDays <= Math.round(0.25 * diffDays)) {
    //     width = "25%";
    //   } else if (currentDiffDays <= Math.round(0.5 * diffDays)) {
    //     width = "50%";
    //   } else if (currentDiffDays <= Math.round(0.75 * diffDays)) {
    //     width = "75%";
    //   } else if (currentDiffDays < diffDays) {
    //     width = "85%";
    //   } else if (currentDiffDays === diffDays) {
    //     width = "100%";
    //   }
    // }

    // this.ProgressBar.nativeElement.style.width = width;
  

  getProjectDetail1(projectID) {
    const param = {
      id: projectID
      
    };
    this.projectQueryService.getProjectDetailNew(param).subscribe(res => {
      this.projectDetailNew = res.data.project
      this.projectDetailNew.techstack.forEach(ele => {
        if (ele.technologies.length) {
          this.skillValuesCount = true;
        }
      })
      if (this.projectDetailNew.members) {
        this.membersCount = true;
        this.projectDetailNew.members.forEach(element => {
          console.log(element);
          this.projectMembers.push(element.employeeId)
        });
      }
      this.updateProgessBar();
    })
  }

  ngOnDestroy(): void {
    this._onDestroy.next();
    this._onDestroy.complete();
  }
}
