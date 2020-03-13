import { Component, OnInit, Input, ViewChild, OnDestroy } from "@angular/core";
import { Location } from "@angular/common";
import { ProjectQueryService } from "@app/modules/project/services/project.service";
import { config } from "../../../../configs/app.configs";
import { ActivatedRoute, Router } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { SkillMatrixComponent } from "@app/shared/components/skill-matrix/skill-matrix.component";
import * as moment from "moment";
import { ChangeDetectorRef } from "@angular/core";
import { regex } from "../../../config/regex";
import { MessageService } from "primeng/api";
import { ClientService } from "@app/modules/client/service/client.service";
import { DataService } from "@app/shared-services/data.service";
import { BsModalService } from "ngx-bootstrap";
import { GrowlAlertService } from './../../../../core/services/growl-alert.service';
import { setTime } from 'ngx-bootstrap/chronos/utils/date-setters';
import { ConfirmationService } from 'primeng/api';
import { QueryDocumentKeys } from 'graphql/language/visitor';
import { Subject } from 'rxjs';

@Component({
  selector: "app-project-edit",
  templateUrl: "./project-edit.component.html",
  styleUrls: ["./project-edit.component.scss"],
  providers: [ConfirmationService]
})
export class ProjectEditComponent implements OnInit, OnDestroy {
  rlNameAndPhoto: any = {};
  is_show_upload_button: boolean;
  @Input() name: string;
  iframe_doc: any;
  @ViewChild("googlriframdoc") googlriframdoc;
  @ViewChild(SkillMatrixComponent) selectedProjectTechStack;
  responseMsg: String;
  id: any;
  slug: String;
  membersCount = false;
  imageURL: string = config.AIC_URL;
  imageUrl: string;
  parameter: any;
  projectDetailEdit: any;
  skillValuesCount: any;
  url: any;
  editProjectForm: FormGroup;
  memberForm: FormGroup;
  projectDocumentForm: FormGroup;
  selectedDate: any;
  addMemberSelectDate: any;
  addMemberSelectedEndDate: any;
  showModel: any;
  nameRegex: any;
  proEditMinStarDate: any;
  proEditMinEndDate: any;
  present: any;
  memberDetails: any;
  fetchDetails: any;
  managers: any;
  designation: any;
  email: any;
  memberRoleDescription: string;
  IsmodelShow: boolean;
  ckeConfig: any;
  msgs = [];
  docs: any;
  doc: any;
  mycontent: string;
  presentDate: any;
  presentEndDate: any = true;
  addMemberUsers: any = [];
  newUserName: any;
  usernames: any;
  brand: string;
  documentId: any;
  document: any;
  projectID: any;
  regex_url = regex.regex_urlLink;
  coeConfig = {
    displayKey: "name", //if objects array passed which key to be displayed defaults to description
    height: "350%",
    search: true,
    noResultsFound: "No results found!", // text to be displayed when no items are found while searching
    searchPlaceholder: "Search", // label thats displayed in search input,
    searchOnKey: "name" // key on which search should be performed
  };
  roleConfig = {
    displayKey: "description",
    height: "350%",
    search: false
  };
  myDateValue: Date;

  isOnGoingProject: Boolean;

  projectTechstack: any;
  // = { "frontend": [], "database": [], "backend": [], "cloud": [], "devops": [], "presales": [] };
  techstackData: any;
  locations: any;
  projectDetailNew: any;
  techStackList: any;
  breadCrumb: any;
  skills = {};
  projectSkillsData: any;
  projectMembers = [];
  projectMembersId = [];
  tempClientData: any;
  deletedDocs = [];
  projectDocs: any;
  projectDetails:any;
  projectEdit:any;
  proEditMaxStartDate:any;
  private _onDestroy = new Subject<void>();

  constructor(
    private projectQueryService: ProjectQueryService,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private toastmsgService: MessageService,
    private cdref: ChangeDetectorRef,
    private _location: Location,
    private messageService: MessageService,
    private clientservice: ClientService,
    private _dataService: DataService,
    private _router: Router,
    private alertService: GrowlAlertService,
    private confirmationService: ConfirmationService

  ) {
    this.mycontent = `<p>My html content</p>`;
  }
  ngOnInit() {
    this.myDateValue = new Date();
    this.ckeConfig = {
      allowedContent: false,
      extraPlugins: "divarea",
      forcePasteAsPlainText: true
    };
    this.imageUrl = config.AIC_IMAGE_URL;
    // this.parameter = this.route.params.subscribe(params => {
    //   this.id = params["id"];
    // });
    this.slug = this.route.snapshot.params['id'];
    this.id = this.slug;
    this.getProjectDetails(this.id);
    this.techStackNew();
    // this.removeUsers();
    this.nameRegex = regex.regex_title;
    this.editProjectForm = this.formBuilder.group({
      project_name: [
        "",
        [Validators.required, Validators.pattern(this.nameRegex)]
      ],
      client_name: ["", [Validators.required]],
      description: ["", Validators.required],
      start_date: ["", Validators.required],
      end_date: [""],
      tags: ["", [Validators.required]],
      status: [""]
    });
    // this.uploadDoc = this.fb.group({
    //   name: ["", Validators.required],
    //   url: ["", [Validators.required, Validators.pattern(this.regex_url)]]
    // })
    this.projectDocumentForm = this.formBuilder.group({
      title: ["", Validators.required],
      url: ["", [Validators.required, Validators.pattern(this.regex_url)]],
      addedby: [""],
      addedon: [""]
    });
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
        url: `/project/${this.id}`,
        isActive: false
      }, {
        label: 'Edit',
        url: `/project/${this.id}/edit`,
        isActive: true
      }];
  }

  // implementation of edit project

  getProjectDetails(projectID) {
    this.projectID = projectID;
    const param = {
      id: projectID
    };
    this.projectQueryService.getProjectDetailNew(param).subscribe(res => {
      this.projectDetailNew = res.data.project;
      this.projectDocs = this.projectDetailNew.documents;

      this.projectSkillsData = res.data.project.techstack;
      this.projectDetailNew.members.forEach(obj => {
        this.projectMembersId.push(obj.id);
        obj.employeeId["membersId"] = obj.id;
        obj.employeeId.designation = obj.designation;
        obj.employeeId.startDate = moment(obj.startDate).format("DD/MM/YYYY");
        if (obj.endDate != null) {
          obj.employeeId.endDate = moment(obj.endDate).format("DD/MM/YYYY");
        } else {
          obj.employeeId.endDate = "On Going";
        }
        this.projectMembers.push(obj.employeeId);
      });
      if (this.projectSkillsData.length) {
        this.skillsdataFormates(this.projectSkillsData);
      }
      if (this.projectDetailNew.members.length) {
        this.membersCount = true;
      }
      this.editProjectForm
        .get("project_name")
        .setValue(this.projectDetailNew.name);
      this.editProjectForm
        .get("client_name")
        .setValue(this.projectDetailNew.client.name);
      this.editProjectForm
        .get("description")
        .setValue(this.projectDetailNew.description);
        this.editProjectForm
        .get("tags")
        .setValue(this.projectDetailNew.tags);
      this.editProjectForm
        .get("start_date")
        .setValue(new Date(this.projectDetailNew.startDate));
        this.proEditMinEndDate=new Date(this.projectDetailNew.startDate);
      this.editProjectForm
        .get("end_date")
        .setValue(new Date(this.projectDetailNew.endDate));
      if (this.projectDetailNew.endDate != null) {
        this.isOnGoingProject = false;  
        this.proEditMaxStartDate= new Date(this.projectDetailNew.endDate); 
      }else{
        this.isOnGoingProject = true;
        this.editProjectForm.get("end_date").reset();
      }
      this.editProjectForm.get("status").setValue(this.projectDetailNew.status);
      this.docs = this.projectDetailNew.documents;
    });
  }

  confirm(documentId, docName) {
    const documentObject = {
      "data": {
        "where": {
          "id": documentId
        }
      }
    }
    this.confirmationService.confirm({
      message: `Are you sure want to unlink ${docName}?`,
      header: 'Unlink Confirmation',
      icon: 'pi pi-info-circle',
      accept: () => {
        this.docs.forEach((doc, i) => {
          if (doc.id == documentId) {
            //this.deletedDocs.push(doc.id);
            this.docs.splice(i, 1);
          }
        })

        this.projectQueryService.deleteProjectDocument(documentObject).subscribe(res => {
          this.alertService.showSuccess("Document Deleted Successfully");
        });

        this.msgs = [{ severity: 'info', summary: 'Confirmed', detail: 'Record Unllinked' }];
      },
      reject: () => {
        this.msgs = [{ severity: 'info', summary: 'Rejected', detail: 'You have rejected' }];
      }
    });
  }

  techStackNew() {
    this.projectQueryService.getTechstackNew().subscribe(res => {
      this.techStackList = res.data.techstacks;
    });
  }

  onSearch(event) {
    if (event.term.length >= 2) {
      const data = {
        where: {
          name_contains: event.term
        }
      };
      this.clientservice.clientByName(data).subscribe(res => {
        this.tempClientData = res.data.clients;
      });
    }
  }

  //make skills data in proper formates
  skillsdataFormates(projectSkillsData) {
    for (let i = 0; i < projectSkillsData.length; i++) {
      this.skills[
        projectSkillsData[i].type[0].toUpperCase() +
        projectSkillsData[i].type.substr(1).toLowerCase()
      ] = this.projectSkillsData[i].technologies;
    }
  }

  filterSkill(event) {
    const skillsArray = [];
    Object.keys(event).forEach(key => {
      const skillKey = {};
      skillKey["type"] = key;
      skillKey["technologies"] = this.selectedProjectTechStack.userSkills[key];
      skillsArray.push(skillKey);
      skillsArray.forEach((item, index) => {
        if (item.technologies.length <= 0) {
          skillsArray.splice(index, 1);
        }
      })
    });
    return skillsArray;
  }

  updateDocument(document) {
    const documentObject = {
      "input": {
        "where": {
          "id": this.documentId,
        },
        "data": {
          name: document.title,
          url: document.url,
        }
      }
    };

    this.projectQueryService.updateProjectDocument(documentObject).subscribe(res => {
      this.alertService.showSuccess("Document Updated Successfully")
    })

    this.docs.forEach((doc, i) => {

      if (doc.id == this.documentId) {
        let data = { id: this.documentId, name: documentObject.input.data.name, url: documentObject.input.data.url }
        this.docs[i] = data;
      }
    });

  }
  // saveProjDocs(document) {
  //   this.docs.push(document);
  //   this.docs.push.apply(this.docs,document);
  // }

  editDoc(document) {
    this.editProjectForm
      .get("end_date")
      .setValue(new Date(this.projectDetailNew.endDate));
    this.editProjectForm.get("status").setValue(this.projectDetailNew.status);
  }

  onSubmit(submitBtn: HTMLButtonElement) {
    // console.log("ProjectDetailsnew------->\n\n\n",this.projectDetailNew);
    let values = this.editProjectForm.value;
    submitBtn.disabled = true;

    // if(values.end_date >= new Date()){
    //   this.projectDetailNew.status = "ongoing";
    // }
    if(values.end_date != null ) {
      if(values.end_date >= new Date()){
    
      this.projectDetailNew.status = "ongoing";
    }else{
      this.projectDetailNew.status = "closed";
    }
  }else{

    if (values.status == true || values.status == "ongoing") {
      this.projectDetailNew.status = "ongoing";
    } 

  }
  
  


    
    
    
    // else if (values.status == "ongoing") {
    //   this.projectDetailNew.status = "ongoing";
    // } else if (values.status == false) {
    //   this.projectDetailNew.status = "closed";
    // } else if (values.end_date > new Date()) {
    //   this.projectDetailNew.status = "ongoing";
    // } else {
    //   this.projectDetailNew.status = "closed";
    // }

    const projectObject = {
      name: values.project_name, //reqd
      description: values.description, //reqd
      startDate: values.start_date, //reqd
      status: this.projectDetailNew.status,
      endDate: values.end_date,
      tags:values.tags,
      //tags: this.projectDetailNew.tags ? this.projectDetailNew.tags : [],
      techstack: this.filterSkill(this.selectedProjectTechStack.userSkills),
      //documents: this.docs,
      client: values.client_name.id || this.projectDetailNew.client.id, //reqd
      //newMembers: this._dataService.newMembers,
      //deletedMembers: this._dataService.deletedMember,
      //deletedDocuments: this.deletedDocs
    };
    this.projectQueryService
      .editProjectFromUrl(projectObject, this.projectDetailNew.id)
      .subscribe(res => {
        if (res) {
          submitBtn.disabled = false;
          this.alertService.showSuccess('Project updated Succefully');
          this._router.navigate([`project/`, this.projectDetailNew.id]);
        } else {
          this.alertService.showError('Cant\' update');
        }
      });
  }

  // end

  toggleEndDate(event) {
    this.isOnGoingProject = event.target.checked ? true : false;
    if (this.isOnGoingProject) {
      this.editProjectForm.get("end_date").reset();
      this.editProjectForm.get("end_date").clearValidators();
      this.editProjectForm.get("end_date").setErrors(null);
      this.proEditMaxStartDate = null;
    } else {
      this.editProjectForm.get("end_date").setValidators([Validators.required]);
      if (
        this.editProjectForm.value.start_date >=
        this.editProjectForm.value.end_date
      )
        this.editProjectForm.get("end_date").setValue("");
      this.proEditMinEndDate = this.editProjectForm.value.start_date;
    }
  }

  get f() {
    return this.editProjectForm.controls;
  }
  resetEditDoc() {
    this.projectDocumentForm.reset();
  }

  onSelectEndDate(event) {
    this.editProjectForm.get("end_date").setValue(event);
    this.proEditMaxStartDate = event;
    this.cdref.detectChanges();
  }
  onSelectStartDate(event) {
    this.editProjectForm.get("start_date").setValue(event);
    if (!this.isOnGoingProject) {
      if (
        this.editProjectForm.value.start_date >=
        this.editProjectForm.value.end_date
      )
        this.editProjectForm.get("end_date").setValue("");
      this.proEditMinEndDate = event;
    }
    this.cdref.detectChanges();
  }
  // open Project doc model with dynamic title
  openModalOfProjectDocument(document) {
    this.documentId = document.id;
    this.is_show_upload_button = document.isUpload ? true : false;
    this.projectDocumentForm.get("title").setValue(document.name);
    this.projectDocumentForm.get("url").setValue(document.url);
  }

  clearProjectDocumentModal() {
    this.is_show_upload_button = true;
    this.projectDocumentForm.get("title").setValue("");
    this.projectDocumentForm.get("url").setValue("");
  }
  // add the project document in title document...
  addDocument(document) {
    this.document = document;
    const documentObject = {
      "project": {
        "data": {

          name: document.title,
          url: document.url,
          projects: this.projectID
        }
      }
    };
    this.projectQueryService.createProjectDocument(documentObject).subscribe(res => {
      if (res.data) {
        const doc = res.data.createProjectdocument.projectdocument;
        this.projectDetailNew.documents.push({ "id": doc.id, "name": doc.name, "url": doc.url });
        this.alertService.showSuccess("Document Created Successfully")
      }
    });

  }

  // // Delete the project document
  // deleteDoc(documentId) {
  //   this.docs.forEach((doc, i) => {
  //     if (doc.id == documentId) {
  //       this.deletedDocs.push(doc.id);
  //       this.docs.splice(i, 1);
  //     }
  //   });
  // }


   //Add a items in tags ...
   onItemAdded(newtags) {
    this.editProjectForm.value.tags.map((elmtags, index) => {
      if (typeof (elmtags) == "object" && elmtags.value == elmtags.value) {
        this.editProjectForm.value.tags.splice(index, 1);
      }
    });
    this.editProjectForm.value.tags.push(newtags.value);
  }
  // open document in iframe...
  open_doc_in_iframe(doc) {
    this.iframe_doc = doc;
    this.googlriframdoc.nativeElement.src = doc.url;
  }

  cancelBtnClicked(event) {
    this._location.back();
  }

  ngOnDestroy(): void {
    this._onDestroy.next();
    this._onDestroy.complete();
  }
}
