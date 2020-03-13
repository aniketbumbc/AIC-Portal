import { Component, OnInit, OnDestroy } from "@angular/core";
import * as _ from "lodash";
import { ProfileQueryService } from "../../services/profile.service";
import { config } from "../../../../configs/app.configs";
import { ActivatedRoute, NavigationEnd, Router } from "@angular/router";
import { DomSanitizer } from "@angular/platform-browser";
import { Subject } from 'rxjs';
import { environment } from '@env/environment';
import { MessageService } from 'primeng/api';
import { DataService } from '@app/shared-services/data.service';

@Component({
  selector: "app-profile-detail",
  templateUrl: "./profile-detail.component.html",
  styleUrls: ["./profile-detail.component.scss"]
})
export class ProfileDetailComponent implements OnInit, OnDestroy {
  slug: string;
  fetchDetails: any;
  rlNameAndPhoto: any = {};
  // parameter: any;
  profileDetail: any;
  projectData: any;
  imageURL: string = environment.imageUrl;
  decached: any = config.DECACHED;
  blogData: any;
  skillValuesCount = false;
  exportProfileData: any;
  role: any;
  pdf: any;
  education = [];
  social: any;
  breadCrumb: any;
  userDetails: any;
  socialProfileProviders: any;
  getGithub: any;
  blinkId: any;
  linkedinId: any;
  providerId: any;
  profilePdf:any;
  profileId: string;
  navigationSubscription: any;
  private _onDestroy = new Subject<void>();

  constructor(
    private profileQueryService: ProfileQueryService,
    private route: ActivatedRoute,
    private router: Router,
    private sainitizer: DomSanitizer,
    private dataService: DataService,
    private toastmsgService: MessageService
  ) {
    this.navigationSubscription = this.router.events.subscribe((e: any) => {
			// If it is a NavigationEnd event re-initalise the component
			if (e instanceof NavigationEnd) {
				this.reloadComponent();
			}
		});
  }

  ngOnInit() {
  }

  reloadComponent() {
    this.slug = this.route.snapshot.params['slug'];
    window.scrollTo(0, 0);
    this.getNewProfile(this.slug);
    this.breadCrumb = [
      {
        label: 'Home',
        url: '/home',
        isActive: false
      }, {
        label: 'Profiles',
        url: '/profile',
        isActive: false
      }, {
        label: 'Details',
        url: `/profile/${this.slug}`,
        isActive: true
      }];
    this.socialProfileProviders = {
      linkedinId: "5d4d5fbc8787764bf3ade984",
      githubId: "5de78d904abf33002a0532b7",
      blinkId: "5d4d5fbc8787764bf3ade986"
    };   
    this.profilePdf =  environment.exportProfile + this.slug;
  }

  getNewProfile(profileId) {
    const param = {
      id: profileId
    };
    this.profileQueryService.getNewAicProfileData(param).valueChanges.
      subscribe(res => {
        this.profileDetail = res.data.employee;
        // if (this.profileDetail.socialProfiles !== undefined) {
        //   this.social = this.profileDetail.socialProfiles.slice(-1)[0];
        // }
        // console.log(this.social)
        let tempObj = {
          linkedinId: '',
          blinkId: '',
          getGithub: ''
        };
        this.profileDetail.socialProfiles.map(e => {
          if (e.providerId.id == this.socialProfileProviders.linkedinId) {
            tempObj.linkedinId = e.userId;
          } else if (e.providerId.id == this.socialProfileProviders.blinkId) {
            tempObj.blinkId = e.userId;
          } else {
            tempObj.getGithub = e.userId;
          }
        });
        this.getGithub = tempObj.getGithub;
        this.blinkId = tempObj.blinkId;
        this.linkedinId = tempObj.linkedinId;
      });
  }
  // exportProfile() {
  //   this.profileQueryService.exportProflie(this.slug).subscribe(res=>{
  //     this.profilePdf =  environment.exportProfile+this.slug;
  //   },err=>{
  //     this.toastmsgService.add({
  //       severity: 'error',
  //       summary: 'Please try again'
  //     });
  //   })
  // }

  isProfileEditable() {
    return (this.slug === this.dataService.getProfileId() || localStorage.getItem('userRole') === 'admin')
  } 

  ngOnDestroy(): void {
    this._onDestroy.next();
    this._onDestroy.complete();
    if (this.navigationSubscription) {
			this.navigationSubscription.unsubscribe();
		}
  }
}
