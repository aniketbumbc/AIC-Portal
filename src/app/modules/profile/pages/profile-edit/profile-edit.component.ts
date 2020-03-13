import { Component, OnInit, ViewChild, ElementRef, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { ProfileQueryService } from '../../services/profile.service';
import { SkillMatrixComponent } from '@app/shared/components/skill-matrix/skill-matrix.component';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
} from '@angular/forms';
import { config } from '../../../../configs/app.configs';
import { UploadImageComponent } from '@app/shared/components/uploadImage/uploadimage.component';
import { regex } from '../../../config/regex'
import { MessageService } from 'primeng/api';
import { GrowlAlertService } from './../../../../core/services/growl-alert.service';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-profile-edit',
  templateUrl: './profile-edit.component.html',
  styleUrls: ['./profile-edit.component.scss'],
})
export class ProfileEditComponent implements OnInit, OnDestroy {
  @ViewChild(SkillMatrixComponent) selectedSkillsData;
  @ViewChild(UploadImageComponent) isImage;
  @ViewChild('input1') nameInputRef: ElementRef;
  profiletitle: string = 'Edit Profile';
  responseMsg: any;
  parameter: any;
  imageUrl: any;
  registerForm: FormGroup;
  url: any;
  slug: String;
  userDetails: any;
  aiclevels: any;
  aiclevelID: any;
  centreofexcellence: any;
  locations: any;
  userGithub: string;
  userIntroduction: string;
  userSkillsData: any;
  userId: String;
  user: any;
  params: any;
  techstack: any;
  alertMsgSucess = false;
  fetchLocation: any = [];
  fetchCoes: any = [];
  regex_name: any;
  getLocations: any;
  getCoes: any;
  getGithub: any;
  blinkId: any;
  linkedinId: any;
  blogUrl: any;
  imageURL: string = config.AIC_PROFILE_IMAGE_URL;
  UserEducation: any = [];
  getAicLevel: any;
  userAicLevel: any;
  skills = {};
  regex_blogurl = regex.regex_urlLink;
  userAicLevelID: any;
  userLocationId: any;
  CoeID: any;
  socialProfileId: any[];
  socialData: any = [];
  providerId: any;
  breadCrumb: any;
  socialProfileProviders: any;
  gitProfileId: any;
  linkedinProfileId: any;
  blinkProfileId: any;

  socialProfileData = {
    linkedinStripeId: '',
    liknSocialId: '',
    blinkSocialId: '',
    blinkStrapieId: '',
    githubSocailId: '',
    gitGitStrapieId: ''
  };
  createSocialProAry = [];
  updateSocialProAry = [];

  coeConfig = {
    displayKey: 'type', //if objects array passed which key to be displayed defaults to description
    height: '350%',
    placeholder: 'Select your option',
    search: false,
    limitTo: 5
  };
  locationsConfig = {
    displayKey: 'location', //if objects array passed which key to be displayed defaults to description
    height: '350%',
    placeholder: 'Select your option',
    search: false,
  }
  tempEducation: any = [];
  private _onDestroy = new Subject<void>();

  constructor(
    private route: ActivatedRoute,
    private _route: Router,
    private _profileQueryService: ProfileQueryService,
    private formBuilder: FormBuilder,
    private toastmsgService: MessageService,
    private _location: Location,
    private cdr: ChangeDetectorRef,
    private alertService: GrowlAlertService
  ) { }

  ngOnInit() {
    this.imageUrl = config.AIC_PROFILE_IMAGE_URL;
    this.slug = this.route.snapshot.params['slug'];
    window.scrollTo(0, 0);
    this.params = {
      id: this.slug
    }
    this.getNewUserData(this.slug);

    this.regex_name = regex.regex_name;
    this.registerForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.pattern(this.regex_name)]],
      email: ['', [Validators.required, Validators.email, this.emailDomainValidator]],
      description: ['', ''],
      location: ['', Validators.required],
      education: ['', ''],
      socialGitId: ['', ''],
      socialBlinkId: ['', ''],
      blogUrl: ['', [ Validators.pattern(this.regex_blogurl)]],
      sociallinkedinId: ['', ''],
      aiclevels: ['', ''],
      coes: ['', ''],
      skills: ['', '']
    });
    
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
        isActive: false
      }, {
        label: 'Edit',
        url: `/profile/${this.slug}/edit`,
        isActive: true
      }];
    this.socialProfileProviders = {
      linkedinId: "5d4d5fbc8787764bf3ade984",
      githubId: "5de78d904abf33002a0532b7",
      blinkId: "5d4d5fbc8787764bf3ade986"
    };
  }
  ngAfterViewChecked() {
    this.cdr.detectChanges();
  }


  getNewUserData(slug) {
    const param = {
      id: slug
    };
    this._profileQueryService.getNewAicProfileData(param).valueChanges
      .subscribe(res => {
        this.userDetails = res.data.employee;
        this.blogUrl = this.userDetails.blogUrl || '';
        if (this.userDetails.picture != null) {
          this.url =
            this.imageURL + this.userDetails.picture.url + "?decached" + Math.random();
        }
        else {
          this.url = null;
        }
        this.userSkillsData = res.data.employee.skills;
        if (this.userSkillsData.length) {
          this.skillsdataFormates(this.userSkillsData);
        }
        this.techstack = res.data.techstacks;
        let tempObj = {
          linkedinId: '',
          blinkId: '',
          getGithub: ''
        };
        this.userDetails.socialProfiles.map(e => {
          if (e.providerId.id == this.socialProfileProviders.linkedinId) {
            tempObj.linkedinId = e.userId;
            this.linkedinProfileId = e.id;
            this.socialProfileData.liknSocialId = e.userId;
            this.socialProfileData.linkedinStripeId = e.id;
          } else if (e.providerId.id == this.socialProfileProviders.blinkId) {
            tempObj.blinkId = e.userId;
            this.blinkProfileId = e.id;
            this.socialProfileData.blinkSocialId = e.userId;
            this.socialProfileData.blinkStrapieId = e.id;
          } else {
            tempObj.getGithub = e.userId;
            this.gitProfileId = e.id;
            this.socialProfileData.githubSocailId = e.userId;
            this.socialProfileData.gitGitStrapieId = e.id;
          }
        });
        this.getGithub = tempObj.getGithub;
        this.blinkId = tempObj.blinkId;
        this.linkedinId = tempObj.linkedinId;
        if (this.userDetails.education.length >= 1) {
          let temp = [];
          this.userDetails.education.forEach(e => {
            temp.push(e.degree);
          });
          this.tempEducation = temp.toString();
        } else {

          this.tempEducation = this.userDetails.education;
        }

        this.getLocations = res.data.locations;
        this.userLocationId = res.data.employee.location.id;
        this.getLocations.map(e => {
          this.fetchLocation.push(e.location);
        })
        this.userDetails.coes.map(e => {
          this.CoeID = e.id;
        });
        this.getCoes = res.data.coes;
        this.getCoes.map(e => {
          this.fetchCoes.push(e.type);
        })
        this.getAicLevel = res.data.aiclevels;
        this.userDetails.aiclevels.map(e => {
          this.userAicLevel = e.level;
          this.userAicLevelID = e.id;
        })
      })

  }

  get f() {
    return this.registerForm.controls;
  }

  // this.userDetails.socialProfiles.map(e => {
  //   if (e.providerId.id == this.socialProfileProviders.linkedinId) {
  //     this.socialProfileData.liknUserId = e.userId;
  //     this.socialProfileData.linkedinId = e.id;
  //   } else if (e.providerId.id == this.socialProfileProviders.blinkId) {
  //     this.socialProfileData.blinkUserId = e.userId;
  //     this.socialProfileData.blinkId = e.id;
  //   } else {
  //     this.socialProfileData.githubUserId = e.userId;
  //     this.socialProfileData.gitGithubId = e.id;
  //   }
  // });




  emailDomainValidator(control: FormControl) {
    let email = control.value;
    if (email && email.indexOf('@') != -1) {
      let [_, domain] = email.split('@');
      if (domain !== 'accionlabs.com') {
        return {
          emailDomain: {
            parsedDomain: domain,
          },
        };
      }
    }
    return null;
  }

  //  make skills data in proper formates
  skillsdataFormates(userSkillsData) {
    for (let i = 0; i < userSkillsData.length; i++) {
      this.skills[userSkillsData[i].type[0].toUpperCase() + userSkillsData[i].type.substr(1).toLowerCase()] = this.userSkillsData[i].technologies;
    }
  }

  onChange(e) {
    let radios = document.getElementsByName("aiclevels");
    let val;
    for (let i = 0; i < radios.length; i++) {
      if (radios[i]['checked']) {
        val = radios[i].id;
      }
    }
    this.userAicLevelID = val;
    this.getLocations.forEach(loc => {
      if (e.value === loc.location) {
        this.userLocationId = loc.id;
      }
    })
  }

  changeCOE(e) {
    this.getCoes.forEach(name => {
      if (e.value === name.type) {
        this.CoeID = name.id;
      }
    })
  }

  updateEmployee(params) {
    this._profileQueryService.updateEmployee(params).subscribe(res => {
      if (res.data.updateEmployee) {
        this.responseMsg = "Profile Updated Successfully";
        if (this.isImage.isPhoto) {
          this.getImageUpload();
        }
        this.alertService.showSuccess('Profile Updated Successfully');
        this._route.navigate(['/profile', this.userDetails.id])
      }
    })
  }

  getImageUpload() {
    const formData = new FormData();
    formData.append('ref', 'employee');
    formData.append('field', 'picture');
    formData.append('refId', this.userDetails.id);
    formData.append('files', this.isImage.imageUrlData);
    this._profileQueryService.uploadImage(formData).subscribe(res => { })
  }

  filterSkill(data) {
    let skillsArray = [];
    Object.keys(data).forEach(key => {
      const skillKey = {};
      skillKey['type'] = key;
      skillKey['technologies'] = this.selectedSkillsData.userSkills[key];
      skillsArray.push(skillKey);
      skillsArray.forEach((item, index) => {
        if (item.technologies.length <= 0) {
          skillsArray.splice(index, 1);
        }
      })
    })
    return skillsArray
  }

  onSubmit(formdata) {
    let socialGitIdValue, socialBlinkIdValue, sociallinkedinIdValue;
    socialGitIdValue = this.registerForm.value.socialGitId.trim();
    socialBlinkIdValue = this.registerForm.value.socialBlinkId.trim();
    sociallinkedinIdValue = this.registerForm.value.sociallinkedinId.trim();

    if (socialGitIdValue.length || socialBlinkIdValue.length || sociallinkedinIdValue.length) {
      if (this.socialProfileData.linkedinStripeId.length) {
        if (this.socialProfileData.liknSocialId !== sociallinkedinIdValue) {
          this.updateSocialProAry.push({
            id: this.socialProfileData.linkedinStripeId,
            userId: sociallinkedinIdValue
          })
        }
      } else if (sociallinkedinIdValue.length && !this.socialProfileData.linkedinStripeId.length) {
        this.createSocialProAry.push({
          providerId: this.socialProfileProviders.linkedinId,
          userId: sociallinkedinIdValue,
          employee: this.slug
        })
      }

      if (this.socialProfileData.blinkStrapieId.length) {
        if (this.socialProfileData.blinkSocialId !== socialBlinkIdValue) {
          this.updateSocialProAry.push({
            id: this.socialProfileData.blinkStrapieId,
            userId: socialBlinkIdValue
          })
        }
      } else if (socialBlinkIdValue.length && !this.socialProfileData.blinkStrapieId.length) {
        this.createSocialProAry.push({
          providerId: this.socialProfileProviders.blinkId,
          userId: socialBlinkIdValue,
          employee: this.slug
        })
      }

      if (this.socialProfileData.gitGitStrapieId.length) {
        if (this.socialProfileData.githubSocailId !== socialGitIdValue) {
          this.updateSocialProAry.push({
            id: this.socialProfileData.gitGitStrapieId,
            userId: socialGitIdValue
          })
        }
      } else if (socialGitIdValue.length && !this.socialProfileData.gitGitStrapieId.length) {
        this.createSocialProAry.push({
          providerId: this.socialProfileProviders.githubId,
          userId: socialGitIdValue,
          employee: this.slug
        })
      }
      if (this.createSocialProAry.length) {
        this._profileQueryService.createSocialProfile(this.createSocialProAry).subscribe(res => {
          this.socialData = res;
          if (this.socialData.length) {
            let formData = formdata;
            let temp = [];
            this.socialData.forEach(e => {
              temp.push(e.id);
            })
            formData.socialProfiles = temp;
            if(this.socialProfileData.linkedinStripeId){
              formdata.socialProfiles.concat(this.socialProfileData.linkedinStripeId);
            }
             if(this.socialProfileData.blinkStrapieId){
              formdata.socialProfiles.push(this.socialProfileData.blinkStrapieId)
            }
            
            if(this.socialProfileData.gitGitStrapieId){
             formdata.socialProfiles.push(this.socialProfileData.gitGitStrapieId);
            }
            delete formdata.socialBlinkId;
            delete formdata.socialGitId;
            delete formdata.sociallinkedinId;
            formData.blogUrl = formData.blogUrl || "";
            formData.skills = this.filterSkill(this.selectedSkillsData.userSkills);
            formData.aiclevels = this.userAicLevelID;
            formData.coes = this.CoeID;
            formData.location = this.userLocationId;
            this.userDetails.blogs.map(e => { formData.blogs = e.id; });
            if (formData.education) {
              formData.education = { degree: formData.education };
              let temp = [];
              temp.push(formData.education);
              this.tempEducation = temp;
              formData.education = this.tempEducation;
            } else {
              formData.education = [];
            }
            const profileParams = {
              data: { data: formData, where: this.params },
            }
            this.updateEmployee(profileParams);
          } else {
            console.log("Error");
          }
        })
      }

      if (this.updateSocialProAry.length) {
        this._profileQueryService.updateSocialProfile(this.updateSocialProAry).subscribe(res => {
          if (res) {
            let formData = formdata;
            // if(this.socialProfileData.linkedinStripeId){
            //   formdata.socialProfiles.concat(this.socialProfileData.linkedinStripeId);
            // }else if(this.socialProfileData.blinkStrapieId){
            //   formdata.socialProfiles.push(this.socialProfileData.blinkStrapieId)
            // }else{
            //  formdata.socialProfiles.push(this.socialProfileData.gitGitStrapieId);
            // }
            delete formdata.socialBlinkId;
            delete formdata.socialGitId;
            delete formdata.sociallinkedinId;
            formData.blogUrl = formData.blogUrl || "";
            formData.skills = this.filterSkill(this.selectedSkillsData.userSkills);
            formData.aiclevels = this.userAicLevelID;
            formData.coes = this.CoeID;
            formData.location = this.userLocationId;
            this.userDetails.blogs.map(e => { formData.blogs = e.id; });
            if (formData.education) {
              formData.education = { degree: formData.education };
              let temp = [];
              temp.push(formData.education);
              this.tempEducation = temp;
              formData.education = this.tempEducation;
            } else {
              formData.education = [];
            }
            const profileParams = {
              data: { data: formData, where: this.params },
            }
            this.updateEmployee(profileParams);
          } else {

            console.log("Profile not updated");

          }
        })
      }

    }    
    if(!this.updateSocialProAry.length && !this.createSocialProAry.length){
      let formData = formdata;
      delete formdata.socialBlinkId;
      delete formdata.socialGitId;
      delete formdata.sociallinkedinId;
      formData.blogUrl = formData.blogUrl || "";
      formData.skills = this.filterSkill(this.selectedSkillsData.userSkills);
      formData.aiclevels = this.userAicLevelID;
      formData.coes = this.CoeID;
      formData.location = this.userLocationId;
      this.userDetails.blogs.map(e => { formData.blogs = e.id; });
      if (formData.education) {
        formData.education = { degree: formData.education };
        let temp = [];
        temp.push(formData.education);
        this.tempEducation = temp;
        formData.education = this.tempEducation;
      } else {
        formData.education = [];
      }
      const profileParams = {
        data: { data: formData, where: this.params },
      }
      this.updateEmployee(profileParams);
    }

  }

  cancelBtnClicked(event) {
    this._location.back();
  }

  ngOnDestroy(): void {
    this._onDestroy.next();
    this._onDestroy.complete();
  }
}
