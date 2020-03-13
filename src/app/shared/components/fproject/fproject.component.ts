import { Component, OnInit, OnDestroy } from '@angular/core';
import {CommonService} from '../../../modules/featured/common-home.service';
import { config } from '@app/configs/app.configs';
import{FeaturedService} from '../../home-page/services/featured.service';
import { Subject } from 'rxjs';
import { environment } from '@env/environment';

@Component({
  selector: 'app-fproject',
  templateUrl: './fproject.component.html',
  styleUrls: ['./fproject.component.scss']
})
export class FprojectComponent implements OnInit, OnDestroy {
  imageUrl:any = environment.imageUrl;
  decached:any = config.DECACHED;
  getProjects: any;
  fetchDetails:any;
  fetchDetailsData:any={}; 
  public projectData:any;
  checkProjectData:any = true;
  private _onDestroy = new Subject<void>();
  constructor(private featuredservice: FeaturedService, private commonservice:CommonService) { }
  ngOnInit() {
   this.getFeaturedProjects();
  }
  getFeaturedProjects(){
    this.featuredservice.getNewFeaturedProjectDataQuery().valueChanges.subscribe(res=>{
      this.projectData = res.data.projects;
      if(this.projectData.length >= 1){
        this.checkProjectData = false;
       }
       this.projectData.map(e=>{
        e.description =  this.commonservice.removeHtml(e.description);
        if(e.members.length > 4){
          e.members = e.members.slice(0,4);
      }
     });     
    })
  }
  ngOnDestroy(): void {
    this._onDestroy.next();
    this._onDestroy.complete();
  }
}
