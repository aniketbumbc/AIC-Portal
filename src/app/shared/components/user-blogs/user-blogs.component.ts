import { Component, OnInit, OnDestroy } from '@angular/core';
import { MyBlogsService } from '../../home-page/services/my-blogs.service';
import { CommonService } from '../../../modules/featured/common-home.service';
import { config } from '@app/configs/app.configs';
import { Subject } from 'rxjs';
@Component({
  selector: 'app-user-blogs',
  templateUrl: './user-blogs.component.html',
  styleUrls: ['./user-blogs.component.scss']
})
export class UserBlogsComponent implements OnInit, OnDestroy {
  private _onDestroy = new Subject<void>();

  constructor(private myblogsservice: MyBlogsService,
    private commonservice: CommonService) { }
  blogsData: any;
  imageUrl: any = config.AIC_PROFILE_IMAGE_URL;
  decached: any = config.DECACHED;
  fetchDetailsData: any = {};
  checkBlogsData: any = true;
  profileId: any;
  ngOnInit() {   
    this.profileId = JSON.parse(localStorage.userDetails).username;
    this.getBlogsData();
  }
  getBlogsData() {
    let param = {
      "where": {
        "email":this.profileId
     }
    };
    this.myblogsservice
      .getNewPersonalBlogsQuery(param)
      .valueChanges.subscribe(res => {
        this.blogsData = res.data.employees;
        if (this.blogsData.length!==0) {
          if ( this.blogsData[0]['blogs'].length >= 1) {
            this.checkBlogsData = false;
          }
          this.blogsData[0].blogs.reverse();
          if ( this.blogsData[0].blogs.length > 2) {
            this.blogsData[0].blogs = this.blogsData[0].blogs.slice(0, 2);
          }
          this.blogsData.map(e => {
            e.blogs.map(ele=>{
              ele.description = this.commonservice.removeHtml(ele.description);
              if (ele.authors.length > 4) {
                ele.authors = ele.authors.slice(0, 4);
              }
            })         
          }) 
        }
        
      })
  }
  ngOnDestroy(): void {
    this._onDestroy.next();
    this._onDestroy.complete();
  }
}
