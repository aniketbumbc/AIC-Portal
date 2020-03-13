import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { ProfileQueryService } from '../../services/profile.service';
import { PlatformLocation } from '@angular/common';;
import { NgxSpinnerService } from 'ngx-spinner';
import { Subject } from 'rxjs';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit, OnDestroy {
  peopleList: any;
  peopleData: any;
  tabStatus = 'leadership';
  tabValue = localStorage.getItem('tabValue') ? JSON.parse(localStorage.getItem('tabValue')) : '';
  backButtonFlag = '';
  disableScroll = false;
  //isDataFound = true;
  tabChanged = false;
  newAicLevels: any;
  newAicUserData:any = [];
  paramId: any;
  isDataFound: boolean;
  isfetching: boolean;
  dataId: any;
  slug:any;
  empLimit:any;
  breadCrumb: any;
  aicLevels:any=[ "Aic Leadership","Accioner","Advisory Council","Platforms Team"];
  lastScroll = window.innerHeight + window.scrollY;
  private _onDestroy = new Subject<void>();

  @Input() tabHide: string;
  @Input() searchPage: boolean; 


  constructor(private spinner: NgxSpinnerService,private profileQueryService: ProfileQueryService, location: PlatformLocation) {
    location.onPopState(() => {
      localStorage.setItem('backButtonFlag', 'true');
    });
  }

  ngOnInit() {
    this.slug = "Aic Leadership";
    this.empLimit = 20;
    this.getAicEmpData(this.slug,this.empLimit);
    this.breadCrumb = [
      {
        label: 'Home',
        url: '/home',
        isActive: false
      }, {
        label: 'Profiles',
        url: '/profile',
        isActive: true
      }];
  }

  getAicEmpData(slug,limit){
    this.spinner.show();
     this.profileQueryService.getAicProfile(slug,limit).subscribe(res=>{     
         this.newAicUserData = res;
         this.spinner.hide();      
     })
   }

  onScroll(e) {
    if (!this.isfetching) {
      let footEl = document.getElementById('footer');
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight - footEl.offsetHeight && this.lastScroll < (window.innerHeight + window.scrollY)) {
        this.lastScroll = window.innerHeight + window.scrollY;
        if (this.newAicUserData && this.isDataFound) {
          this.empLimit += 20;
          this.getAicEmpData(this.slug,this.empLimit);
        }
      }
    }
  }
  aiclevels(index: number, data) {
      this.newAicUserData = [];
      this.spinner.show();
      this.empLimit =20;
     this.slug = data;
    this.isDataFound = true;
    this.isfetching = false
    localStorage.setItem('tabValue', JSON.stringify(data));
    this.disableScroll = false;
    this.getAicEmpData(this.slug,this.empLimit);   
  }
  
  ngOnDestroy() {
    localStorage.removeItem('backButtonFlag');
    this._onDestroy.next();
    this._onDestroy.complete();
  }
}
