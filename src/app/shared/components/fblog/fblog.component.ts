import { Component, OnInit, OnDestroy } from '@angular/core';
import{FeaturedService} from '../../home-page/services/featured.service';
import {CommonService} from '../../../modules/featured/common-home.service';
import { config } from '@app/configs/app.configs';
import { Subject } from 'rxjs';
import { environment } from '@env/environment';
@Component({
  selector: 'app-fblog',
  templateUrl: './fblog.component.html',
  styleUrls: ['./fblog.component.scss']
})
export class FblogComponent implements OnInit, OnDestroy {
featureBlogsData:any;
imageUrl:any = environment.imageUrl;
decached:any = config.DECACHED;
fetchDetailsData:any={};
checkBlogsData:any = true;
profileId:any;
private _onDestroy = new Subject<void>();


  constructor(private commonservice:CommonService, private featuredservice:FeaturedService) { }

  ngOnInit() {
    this.getFeaturedBlogs();   
  }
  getFeaturedBlogs(){
    this.featuredservice.getNewFeaturedDataQuery().valueChanges.subscribe(res=>{
      this.featureBlogsData = res.data.blogs;
      if(this.featureBlogsData.length >= 1){
        this.checkBlogsData = false;
      }

      this.featureBlogsData.map(e=>{
       e.description = this.commonservice.removeHtml(e.description);
        if(e.authors.length > 4){
          e.authors = e.authors.slice(0,4);
          }          
      })
    })
  }
  ngOnDestroy(): void {
    this._onDestroy.next();
    this._onDestroy.complete();
  }
}
