import { Component, OnInit, Input, ViewChild, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { ProjectQueryService } from '@app/modules/project/services/project.service';
import { SkillMatrixComponent } from '@app/shared/components/skill-matrix/skill-matrix.component';
import { FormBuilder, Validators } from '@angular/forms';
import { ClientService } from '@app/modules/client/service/client.service';
import { regex } from '../../../config/regex'
import { Router } from '@angular/router'
import { DataService } from '@app/shared-services/data.service';
import { MessageService } from 'primeng/api';
import { GrowlAlertService } from './../../../../core/services/growl-alert.service';
import { ConfirmationService } from 'primeng/api';
import { Subject } from 'rxjs';
import { SearchQueryService } from '@app/modules/search/service/search.service';
import * as _ from 'lodash';

@Component({
  selector: 'app-project-new',
  templateUrl: './project-new.component.html',
  styleUrls: ['./project-new.component.scss'],
  providers: [ConfirmationService]
})
export class ProjectNewComponent implements OnInit, OnDestroy {
  @ViewChild(SkillMatrixComponent) selectedProjectTechStack;
  projectTechstack = { "Frontend": [], "Database": [], "Backend": [], "Cloud": [], "Devops": [], "Presales": [] };
  techstackData: any;
  responseMsg: any;
  msgs = [];
  skills = {};
  techStackList: any;
  newProjectsFnl: any;
  proNewMinStarDate: any = new Date();
  proNewMinEndDate: any;
  proNewMaxStartDate:any;
  createProjPayload: any;
  clientData: any;
  clientName: String[] = [];
  proDocs: any = [];
  data: any;projectSubscription: any;
;
  newProject: any;
  uploadDoc: any;
  regex_url = regex.regex_urlLink;
  docId: any;
  employeeCount: number;
  tempClientData: any;
  memberArr = [];
  array: any[];
  breadCrumb: any;
  showEndDate: any = true;
  projectName: string = "";
  private _onDestroy = new Subject<void>();
  
  constructor(
    private projectQueryService: ProjectQueryService,
    private fb: FormBuilder,
    private clientservice: ClientService,
    private route: Router,
    private _dataService: DataService,
    private toastmsgService: MessageService,
    private cdref: ChangeDetectorRef,
    private alertService: GrowlAlertService,
    private confirmationService: ConfirmationService,
    private searchQueryService: SearchQueryService,
  ) { }

  ngOnInit() {
    this.newProject = this.fb.group({
      name: ["", [Validators.required, Validators.minLength(3)]],
      client: ['', [Validators.required]],
      startDate: ["", [Validators.required]],
      endDate: ["", [Validators.required]],
      tags: ["", [Validators.required]],
      status: [""],
      description: ["", [Validators.required]]
    })
    this.uploadDoc = this.fb.group({
      name: ["", Validators.required],
      url: ["", [Validators.required, Validators.pattern(this.regex_url)]]
    });
    this.subscribeToCUI();
    this.techStackNew();
    this.getClientData();
    this.getEmployees();
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
        label: 'Create Project',
        url: '/project/new/project',
        isActive: true
      }];
  }

  subscribeToCUI() {
    this.projectSubscription = this.searchQueryService.getAddProjectData().subscribe((res: any) => {
      console.log(res)
      if (!_.isEmpty(res)) {
        this.projectName = res.project;
      }
    })
  }

  confirm(index) {
    this.confirmationService.confirm({
      message: `Are you sure want to unlink ${this.proDocs[index].name}?`,
      header: 'Unlink Confirmation',
      icon: 'pi pi-info-circle',
      accept: () => {
        {
          this.proDocs.splice(index, 1);
        }

        this.msgs = [{ severity: 'info', summary: 'Confirmed', detail: 'Record Unlinked' }];
      },
      reject: () => {
        this.msgs = [{ severity: 'info', summary: 'Rejected', detail: 'You have rejected' }];
      }
    });
  }

  onSelectEndDate(event) {
    this.newProject.get('endDate').setValue(event);
    // if(!this.isOnGoingProject) this.proEditMaxStartDate = null;
    
     this.proNewMaxStartDate = event;
    this.cdref.detectChanges();
  }
  onSelectStartDate(event) {
    this.newProject.get('startDate').setValue(event);
    if (this.newProject.value.startDate >= this.newProject.value.endDate) this.newProject.get('endDate').setValue('');
    this.proNewMinEndDate = event;
    this.cdref.detectChanges();
  }
  getEmployees() {
    this.projectQueryService.getAllEmployees().subscribe(res => {
    })
  }
  onSearch(event) {
    if (event.term.length >= 2) {
      const data = {
        "where": {
          "name_contains": event.term
        }
      }
      this.clientservice.clientByName(data).subscribe(res => {
        this.tempClientData = res.data.clients
      });
    }
  }

  configClient = {
    displayKey: 'name',
    placeholder: 'select Your Option',
    height: '350%',
    searchOnKey: 'name',
    search: true
  }
  resetModel() {
    this.uploadDoc.reset();
  }
  chkToggle(e) {
    if (e.target.checked) {
      this.showEndDate = false;
      this.newProject.get("endDate").reset();
      this.newProject.get("endDate").clearValidators();
      this.newProject.get("endDate").setErrors(null);
    } else {
      this.showEndDate = true;
    }
  }

  techStackNew() {
    this.projectQueryService.getTechstackNew().subscribe(res => {
      this.techStackList = res.data.techstacks;
    });
  }
  getClientData() {
    /* this.clientservice.getAllClients().valueChanges.subscribe(
      res => {
        this.clientData = res.data.clients
      }) */
    this.clientservice.getAllClients().subscribe(
      res => {
        this.clientData = res;
      });
  }
  saveProjDoc(projDocData) {
    this.proDocs.push(projDocData);
    this.proDocs.push.apply(this.proDocs, projDocData);
  }

  filterSkill(event) {
    const skillsArray = [];
    Object.keys(event).forEach(key => {
      const skillKey = {};
      skillKey['type'] = key;
      skillKey['technologies'] = this.selectedProjectTechStack.userSkills[key];
      skillsArray.push(skillKey);
      skillsArray.forEach((item, index) => {
        if (item.technologies.length <= 0) {
          skillsArray.splice(index, 1);
        }
      })
    })
    return skillsArray
  }

  deleteDoc(index) {
    this.proDocs.splice(index, 1);
  }


  onSubmit(submitBtn: HTMLButtonElement) {
    let newProject = this.newProject.value;    
    submitBtn.disabled = true;
    if (newProject.status == true && newProject.endDate ==null) {
      newProject.status = "ongoing";
    }
    if(newProject.endDate!=null){
    if(newProject.endDate >= new Date()){
      newProject.status = "ongoing"
    }else{
      newProject.status = "closed"
    }
  }
   
    this.data = { ...newProject, documents: this.proDocs, members: this._dataService.members, techstack: this.filterSkill(this.selectedProjectTechStack.userSkills) }
    // if () {
    //   this.data.status = "ongoing";
    //   this.data.endDate = new Date();
    // }
    // else if (this.data.endDate > new Date()) {
    //   this.data.status = "ongoing";
    // } else {
    //   this.data.status = "closed";
    // }
    this.data.client = this.data.client.id;
    // this.data.startDate = this.data.startDate.toISOString().split('T')[0];
    // this.data.endDate = this.data.endDate.toISOString().split('T')[0];
    const projReqObj = this.data;
    this.projectQueryService.createProject(projReqObj).subscribe(res => {
      submitBtn.disabled = false;
      if (res) {
        this.responseMsg = "Project Created Successfully";
        // this.toastmsgService.add({ severity: 'success', summary:this.responseMsg});
        this.alertService.showSuccess('Project Created Successfully');
        this.route.navigate(['/project'])
        this.newProject.reset();
      } else {
        this.responseMsg = "Project is is not Created ";
        this.toastmsgService.add({ severity: 'success', summary: this.responseMsg });
        setTimeout(() => {
          this.route.navigate(['/project'])
        }, 700)
      }
    })
  }
 //Add a items in tags ...
  onItemAdded(newtags) {
    this.newProject.value.tags.map((elmtags, index) => {
      if (typeof (elmtags) == "object" && elmtags.value == elmtags.value) {
        this.newProject.value.tags.splice(index, 1);
      }
    });
    this.newProject.value.tags.push(newtags.value);
  }

  ngOnDestroy(): void {
    this._onDestroy.next();
    this._onDestroy.complete();

    if (this.projectSubscription) {
      this.projectSubscription.unsubscribe();
    }
  }
}
