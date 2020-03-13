import {
  Component,
  OnInit,
  Input,
  ChangeDetectorRef,
  Output,
  EventEmitter, OnDestroy
} from '@angular/core';
import { Router } from '@angular/router';
import { config } from '@app/configs/app.configs';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl
} from '@angular/forms';
import * as moment from 'moment';
import { FetchDetailsApi } from '@app/shared/services/fetchDetails.service';
import { MessageService } from 'primeng/api';
import { ProjectQueryService } from '@app/modules/project/services/project.service';
import { ClientService } from '@app/modules/client/service/client.service';
import { DataService } from '@app/shared-services/data.service';
import * as _ from 'lodash';
import { ConfirmationService } from 'primeng/api';
import { Subject } from 'rxjs';
import { environment } from '@env/environment';



@Component({
  selector: 'app-profile-list',
  templateUrl: './profile-list.component.html',
  styleUrls: ['./profile-list.component.scss'],
  providers: [ProjectQueryService, ConfirmationService]
})
export class ProfileListComponent implements OnInit, OnDestroy {

  public activeTab: string;
  newlocations:any=[];
  show: boolean = false;
  IsmodelShow: any = false;
  showActiveButton: any = true;
  memStartDate: any;
  memEndDate: any;
  membersId: any;
  memberForm: FormGroup;
  newmemberForm: FormGroup;
  // locations = [ 'Mumbai', 'Pune'];
  skillSet: any;
  configLocation = {
    displayKey: 'name', //if objects array passed which key to be displayed defaults to description
    noResultsFound: 'No results found!', // text to be displayed when no items are found while searching
    searchPlaceholder: 'Search', // label thats displayed in search input,
    search: false, // true/false for the search functionlity defaults to false
    height: 'auto', // height of the list so that if there are more no of items it can show a scroll defaults to auto. With auto height scroll will never appear
    placeholder: 'Select Location' // text to be displayed when no item is selected defaults to Select,
  };
  fetchRealName: any;
  selectedDate: any;
  addMemberSelectDate: any;
  addMemberSelectedEndDate: any;
  present: any;
  fetchDetails: any;
  presentDate: any;
  employeeId: any;
  editMemberId: any
  presentEndDate: any = true;
  addMemberUsers: any = [];
  newUserName: any;
  rlNameAndPhoto: any = {};
  minDateValueStartDate: any = new Date();
  baseUrl: string;
  imageURL: string = config.AIC_IMAGE_URL;
  imageUrl: string;
  src: string;
  tab = 1;
  singleSelect: any = [];
  memberData: any;
  memberDetails: any = [];
  memberEditForm: FormGroup;
  ckeConfig: any;
  editPresent: any;
  editProfileStartDate: any;
  editProfileEndDate: any;
  minDateValueEndDate: any;
  maxDateValueStartDate: any;
  maxDateValueEndDate: any;
  newProject: any;
  showMember: any;
  empRole: any;
  roles: any;
  roleConfig = {
    displayKey: 'description',
    height: '350%',
    search: false
  };
  configRole = {
    displayKey: 'name', //if objects array passed which key to be displayed defaults to description
    height: '350%',
    search: true,
    noResultsFound: 'No results found!', // text to be displayed when no items are found while searching
    searchPlaceholder: 'Search', // label thats displayed in search input,
    searchOnKey: 'name' // key on which search should be performed
  };
  @Input() locations: any;
  @Input() pageEdit: boolean;
  @Input() projEdit: boolean;
  @Input() profileList: any;
  @Input() fetchData: any;
  @Input() projectDetailEdit: any;
  @Input() showAddMember: boolean = false;
  @Input() projectEdit: boolean = false;
  @Output() editProjectMemberFormdata = new EventEmitter();
  @Input() projectMembersId: any;
  @Input() projectDetails: any;
  @Input() projectMembersName: any;
  @Input() projectTitle: any;
  submitted: any = false;
  projectMembersname: any;
  showModel: any = true;
  closeModel: any = true;
  filteredUser: any = [];
  decached: any;
  employeeCount: number;
  allEmployee: any;
  tempEmployeeData: any;
  projmembArr: any = [];
  tempProjMembers: any = [];
  projectName: any = [];
  newReqProject: any;
  private _onDestroy = new Subject<void>();
  msgs = [];
  constructor(
    private _fetchDetails: FetchDetailsApi,
    private router: Router,
    private formBuilder: FormBuilder,
    private toastmsgService: MessageService,
    private cdref: ChangeDetectorRef,
    private projectQueryService: ProjectQueryService,
    private clientservice: ClientService,
    private _dataService: DataService,
    private confirmationService: ConfirmationService
  

  ) { }
  ngOnInit() {
    //this.getAllEmployees()
    this.ckeConfig = {
      allowedContent: false,
      extraPlugins: 'divarea',
      forcePasteAsPlainText: true
    };
    this.decached = config.DECACHED;
    this.baseUrl = config.AIC_URL;
    this.imageUrl = environment.imageUrl;
    this.memberEditForm = this.formBuilder.group({
      member: [{ value: '', disabled: true }, Validators.required],
      // role_name: ['',Validators.required],
      role_name: ["", [Validators.required, Validators.maxLength(30)]],
      start_date: ['', Validators.required],
      end_date: ['', Validators.required]
    });
    this.newmemberForm = this.formBuilder.group({
      location: [''],
      role: ["", [Validators.required, Validators.maxLength(30)]],
      position: [1, Validators.required],
      projectName: ['', Validators.required],
      skillset: ['', Validators.required],
      raisedByName: [''],
      requestNumber: [this.create_UUID()]
    });
    this.memberForm = this.formBuilder.group({
      member: ['', Validators.required],
      role: ["", [Validators.required, Validators.maxLength(30)]],
      start_date: ['', Validators.required],
      end_date: ['', Validators.required]
    });
  }

  getNewReqEmpLocation(){
    this.newlocations.length=0;
    this._dataService.getProjectNewMemberLocation().subscribe((res:any)=>{
      for(let i=0;i<res.length;i++){
       this.newlocations.push(res[i]["city"]);
       }
    })
  }

  confirm(deleteId) {
    this.confirmationService.confirm({
      message: `Are you sure want to remove ${deleteId.name} from project ${this.projectTitle} ?`,
      header: 'Remove Confirmation',
      icon: 'pi pi-info-circle',
      accept: () => {
        this.tempProjMembers = this.profileList;
        if (this.projectEdit) {
          this._dataService.deleteProjectMember(deleteId.membersId).subscribe(res => {
            this.toastmsgService.add({
              severity: 'success',
              summary: 'Member Delete successfully'
            });
          },
            err => {
              this.toastmsgService.add({
                severity: 'error',
                summary: 'Please try again'
              });
            });
          for (let i = 0; i <= this.tempProjMembers.length; i++) {
            if (this.tempProjMembers[i].membersId == deleteId.membersId) {
              this.projectMembersId.splice(i, 1);
              this.tempProjMembers.splice(i, 1);
              const deletedMember = deleteId.membersId;
              this._dataService.deletedMembers(deletedMember);
            }
          }
        } else {
          for (let i = 0; i <= this.tempProjMembers.length; i++) {
            if (this.tempProjMembers[i].id === deleteId.id) {
              this.tempProjMembers.splice(i, 1);
              this.toastmsgService.add({
                severity: 'success',
                summary: 'Member Delete successfully'
              });
            }
          }
          this.profileList = this.tempProjMembers;
          this._dataService.members = this.profileList.map(id => {
            return { employeeId: id.id };
          })
        }
        this.msgs = [{ severity: 'info', summary: 'Confirmed', detail: 'Record removed' }];
      },
      reject: () => {
        this.msgs = [{ severity: 'info', summary: 'Rejected', detail: 'You have rejected' }];
      }
    });
  }

  //new implementation

  getAllEmployees() {
    this.projectQueryService.getAllEmployees().subscribe(res => {
      this.allEmployee = res.data.employees;
    });
  }
  // addNewMember() {
  //   this.newmemberForm = this.formBuilder.group({
  //     role: [''],
  //     position: [1, Validators.required],
  //     projectName: [ , Validators.required],
  //     location: [''],
  //     skillset: ['', Validators.required]
  //   });
  // }

  onSearch(event) {
    let params = {
      where: { name_contains: event.term }
    };
    if (event.term.length >= 2) {
      this.clientservice.searchACM(params).valueChanges.subscribe(res => {
        this.tempEmployeeData = res.data.employees;
      });
      // this.clientservice.employeeAutocomplete(event.term, this.employeeCount).subscribe((employees: any) => {
      //   this.tempEmployeeData = employees.data;
      // });
    }
  }

  submitExistingMember(value) {
    let tempData = this.router.url;
    const param = {
      id: value.member.id
    };
    this.showActiveButton = false;
    let tempEndDate = value.endDate;
    if (tempData === "/project/new/project") {
      let chckDuplicateMember = true;
      let profileId;
      if (chckDuplicateMember) {      
        this.profileList.forEach(profile => {
          if (profile.id == value.member.id) {
            profileId = profile.id;
            this.toastmsgService.add({
              severity: "error",
              summary: "Member Already Present"
            });
          
            
          }                     
        });
      }
      if (profileId != value.member.id){
        chckDuplicateMember = false;
      }
      if(!chckDuplicateMember){
      let startDate, endDate, designation;
      startDate = value.start_date;
      endDate = value.end_date;
      designation = value.role;
      this.memStartDate = moment(value.start_date).format("DD/MM/YYYY");
      if (value.end_date === "") {
        this.memEndDate = "On Going";
      } else {
        this.memEndDate = moment(value.end_date).format("DD/MM/YYYY");
      }
      this.empRole = value.role;
     
      this.projectQueryService.getEmpDetails(param).subscribe(res => {
        res.data.employee["startDate"] = this.memStartDate;
        res.data.employee["endDate"] = this.memEndDate;
        res.data.employee["designation"] = this.empRole;
        this.projmembArr.push(res.data.employee);
        this.profileList = this.projmembArr;
        this._dataService.updateData(res.data.employee.id, startDate, endDate, designation);

        this.toastmsgService.add({
          severity: 'success',
          summary: 'Member added successfully'
        });
        err => {
          this.toastmsgService.add({
            severity: 'error',
            summary: 'Please try again'
          });
        }
      });
      
  }
      }
    
     else {
      let profileId;
      this.profileList.forEach(profile => {

        if (profile.id == value.member.id) {
          profileId = profile.id;
          this.toastmsgService.add({
            severity: "error",
            summary: "Member Already Present"
          });
        
        }
      });

      if (profileId != value.member.id) {
        if (value.end_date === "") {
          value.end_date = "On Going";
        }
        tempData = tempData.replace("/project/", '');
        let projectId = tempData.replace('/edit', '');
        if (value.end_date === "On Going") {
          tempEndDate = null;
        } else {
          tempEndDate = moment(value.end_date).format("YYYY-MM-DD HH:mm:ss");
        }

        const tempEmp = {
          employeeId: value.member.id,
          designation: value.role,
          project: projectId,
          startDate: moment(value.start_date).format("YYYY-MM-DD HH:mm:ss"),
          endDate: tempEndDate
        };

        this.memStartDate = moment(value.start_date).format("DD/MM/YYYY");
        if (value.end_date === "On Going") {
          this.memEndDate = "On Going";
        } else {
          this.memEndDate = moment(value.end_date).format("DD/MM/YYYY");
        }
        this.empRole = value.role;

        this._dataService.sendAddProjectMember(tempEmp).subscribe(res => {

          this.membersId = res;
          this._dataService.members = [];
          if (this.projectEdit && this.membersId) {
            this.projectQueryService.getEmpDetails(param).subscribe(res => {
              res.data.employee["startDate"] = this.memStartDate;
              res.data.employee["endDate"] = this.memEndDate;
              res.data.employee["designation"] = this.empRole;
              res.data.employee["membersId"] = this.membersId.id;
              this.projmembArr.push(res.data.employee);
              this.profileList.push(res.data.employee);
              this._dataService.updateData(res.data.employee.id);
              this._dataService.addedMembers(tempEmp);
              this._dataService.members = [];
            })
          }

          this.toastmsgService.add({
            severity: 'success',
            summary: 'Member added successfully'
          });
          err => {
            this.toastmsgService.add({
              severity: 'error',
              summary: 'Please try again'
            });
          }
        });
      } 


      // if (this.projectEdit) {
      //   let flag;
      //   this.profileList.forEach(profile => {
      //     if (profile.id == value.member.id) {
      //       this.toastmsgService.add({
      //         severity: "error",
      //         summary: "Member Already Present"
      //       });
      //       flag = true;
      //     }
      //   });
      //   // if (this.projectEdit && this.membersId) {
      //   //   this.projectQueryService.getEmpDetails(param).subscribe(res => {
      //   //     res.data.employee["startDate"] = this.memStartDate;
      //   //     res.data.employee["endDate"] = this.memEndDate;
      //   //     res.data.employee["designation"] = this.empRole;
      //   //     res.data.employee["membersId"]=this.membersId.id;
      //   //     this.projmembArr.push(res.data.employee);
      //   //     this.profileList.push(res.data.employee);
      //   //     this._dataService.updateData(res.data.employee.id);
      //   //     this._dataService.addedMembers(tempEmp);
      //   //   })
      //   // }
      // } 


      // else {
      //   let flag = false;
      //   // this.profileList.forEach(profile=>{
      //   //   if(profile.id == value.member.id){
      //   //     this.toastmsgService.add({
      //   //       severity: "error",
      //   //       summary: "Member Already Present"
      //   //     });
      //   //     flag = true;
      //   // }});
      //   if (!flag) {
      //     // this.projectQueryService.getEmpDetails(param).subscribe(res => {
      //     //   res.data.employee["start_date"] =this.memStartDate;
      //     //   res.data.employee["end_date"] =this.memEndDate;
      //     //   res.data.employee["role"] = this.empRole;
      //     //   this.projmembArr.push(res.data.employee);     
      //     //   this.profileList = this.projmembArr;
      //     //   this._dataService.updateData(res.data.employee.id);
      //     // });
      //   }
      // }

    }
    this.memberForm.reset();
  }

  delete(deleteId, event) {
    event.stopPropagation();
    event.preventDefault();
    this.tempProjMembers = this.profileList;
    if (this.projectEdit) {
      for (let i = 0; i <= this.tempProjMembers.length; i++) {
        if (this.tempProjMembers[i].membersId == deleteId.membersId) {
          this.projectMembersId.splice(i, 1);
          this.tempProjMembers.splice(i, 1);
          const deletedMember = deleteId.membersId;
          this._dataService.deletedMembers(deletedMember);
        }
      }
    } else {
      for (let i = 0; i <= this.tempProjMembers.length; i++) {
        if (this.tempProjMembers[i].id == deleteId.id) {
          this.tempProjMembers.splice(i, 1)
        }
        this.profileList = this.tempProjMembers
        this._dataService.members = this.profileList
      }
    }
  }

  //end new implementation

  autoCompleteEmployee(event: any) {
    this.projectQueryService
      .getEmployeeAutoComplete(event)
      .subscribe(res => { });
  }

  clickBySlug(slug: String) {
    if (slug) {
      this.router.navigate(['profile/', slug]);
    }
  }
  editMember(event, data) {
    //console.log(val);

    this.showModel = true;
    this.memberDetails = data;
    this.memberEditForm.get('member').setValue(data.name);
    this.memberEditForm.get('role_name').setValue(data.designation);
    this.memberEditForm.get('start_date').setValue(data.startDate);

    if (data.endDate === 'On Going') {
      this.editPresent = true;
    } else {
      this.editPresent = false;
      this.memberEditForm.get('end_date').setValue(data.endDate);
    }
    this.editMemberId = data.membersId;
    // this.memberEditForm
    //   .get('end_date')
    //   .setValue(data.end_date);
    // if (data.end_date == 'present') {
    //   this.editPresent = true;
    //   this.memberEditForm.get('end_date').clearValidators();
    //   this.memberEditForm.get('end_date').setErrors(null);
    // } else {
    //   this.editPresent = false;
    //   this.memberEditForm.get('end_date').setValidators([Validators.required]);
    //   if (
    //     this.memberEditForm.value.start_date >=
    //     this.memberEditForm.value.end_date
    //   )
    //     this.memberEditForm.get('end_date').setValue('');
    //   this.minDateValueEndDate = this.memberEditForm.value.start_date;
    // }
  }
  isoDateFormat(data) {
    let splitDate = data.split("/");
    let ISOFormatDate = new Date(parseInt(splitDate[2]), parseInt(splitDate[1]) - 1, parseInt(splitDate[0]));
    return ISOFormatDate.toISOString();
  }



  editMemberChange(event) {
    this.editPresent = event.target.checked ? true : false;
    if (this.editPresent) {
      this.memberEditForm.get('end_date').reset();
      this.memberEditForm.get('end_date').clearValidators();
      this.memberEditForm.get('end_date').setErrors(null);
    } else {
      this.memberEditForm.get('end_date').setValidators([Validators.required]);
      if (
        this.memberEditForm.value.start_date >=
        this.memberEditForm.value.end_date
      )
        this.memberEditForm.get('end_date').setValue('');
      this.minDateValueEndDate = new Date(this.memberEditForm.value.start_date);
    }
  }
  onSelectEndDate(event) {
    this.memberEditForm.get('end_date').setValue(event);
    // this.maxDateValueStartDate = event;
    this.cdref.detectChanges();
  }
  onSelectStartDate(event) {
    this.memberEditForm.get('start_date').setValue(event);
    if (!this.editPresent) {
      if (
        this.memberEditForm.value.start_date >=
        this.memberEditForm.value.end_date
      )
        this.memberEditForm.get('end_date').setValue('');
      this.minDateValueEndDate = event;
    }
    this.cdref.detectChanges();
  }
  get f() {
    return this.memberEditForm.controls;
  }
  resetAddForm() {
    this.memberForm.reset();
    this.newmemberForm.reset();
  }
  onSubmit(data) {
    this.submitted = true;
    if (this.memberEditForm.invalid) {
      this.showModel = true;
    } else {

      let tempData = this.router.url;
      if (tempData === "/project/new/project") {

        this.profileList.forEach(e => {
          if (this.memberEditForm.controls.member.value === e.name) {
            e.designation = data.role_name;
            if (data.start_date.length == 10) {
              let isoDate = this.isoDateFormat(data.start_date);
              e.startDate = isoDate;
              e.startDate = moment(e.startDate).format("DD/MM/YYYY");
            } else {
              e.startDate = moment(data.start_date).format("DD/MM/YYYY");
            }
            if (data.end_date != null) {
              if (data.end_date.length == 10) {
                let isoDate = this.isoDateFormat(data.end_date);
                e.endDate = isoDate;
                e.endDate = moment(e.endDate).format("DD/MM/YYYY");
              } else
                e.endDate = moment(data.end_date).format("DD/MM/YYYY");
            }
            else {
              e.endDate = "On Going"
            }
          }
        });
        this.toastmsgService.add({
          severity: 'success',
          summary: 'Member Updated successfully'
        });

      } else {
        this.profileList.forEach(e => {
          if (e.membersId === this.editMemberId) {
            e.designation = data.role_name;
            if (data.start_date.length == 10) {
              let isoDate = this.isoDateFormat(data.start_date);
              e.startDate = isoDate;
              e.startDate = moment(e.startDate).format("DD/MM/YYYY");
            } else {
              e.startDate = moment(data.start_date).format("DD/MM/YYYY");
            }
            if (data.end_date != null && data.end_date.length == 10) {
              let isoDate = this.isoDateFormat(data.end_date);
              data.end_date = isoDate;
              e.endDate = moment(data.end_date).format("DD/MM/YYYY");
            }else if (data.end_date != null && data.end_date.length != 10)
            {
              e.endDate = moment(data.end_date).format("DD/MM/YYYY");
            }
            else {
              e.endDate = "On Going"
            }
          }
        })
        if (data.start_date.length == 10) {
          let isoDate = this.isoDateFormat(data.start_date);
          data.start_date = isoDate;
        } else {
          // data.start_date = moment(data.start_date).format("YYYY-MM-DD HH:mm:ss");
          data.start_date =  data.start_date.toISOString();
        }
        if (data.end_date != null) {
          data.end_date = moment(data.end_date).format("DD/MM/YYYY");
          let isoDate =  this.isoDateFormat(data.end_date);
          data.end_date = isoDate;
          //data.end_date = data.end_date.toISOString();
        } else {
          data.end_date = null;
        }
        const param = {
          "member": {
            "where": {
              "id": this.editMemberId
            },
            "data": {
              "designation": data.role_name,
              "startDate": data.start_date,
              "endDate": data.end_date
            }
          }
        }
        // this.memberDetails.member = afterEditProjectMemberFormdata.member
        //   .replace(' ', '-')
        //   .toLowerCase();
        // this.memberDetails.role = afterEditProjectMemberFormdata.role_name;
        // this.memberDetails.start_date = moment(
        //   afterEditProjectMemberFormdata.start_date
        // ).format('YYYY-MM-DD');
        // this.memberDetails.end_date = this.editPresent
        //   ? 'present'
        //   : moment(afterEditProjectMemberFormdata.end_date).format('YYYY-MM-DD');
        // this.memberDetails.presentChk2 = this.editPresent;
        // this.editProjectMemberFormdata.emit(null);

        this._dataService.updateProjectMember(param).subscribe(res => {
          this.toastmsgService.add({
            severity: 'success',
            summary: 'Member Updated successfully'
          });
        },
          err => {
            this.toastmsgService.add({
              severity: 'error',
              summary: 'Please try again'
            });
          })
      }
      this.showModel = false;
    }
  }
  trackByFunction(index) {
    return index;
  }
  dateChange(event) {
    this.present = event.target.checked ? true : false;
    if (this.present) {
      this.memberForm.get('end_date').clearValidators();
      this.memberForm.get('end_date').setErrors(null);
    } else {
      this.memberForm.get('end_date').setValidators([Validators.required]);
      if (this.memberForm.value.start_date >= this.memberForm.value.end_date)
        this.memberForm.get('end_date').setValue('');
      this.minDateValueEndDate = this.memberForm.value.start_date;
    }
  }
  configManagerToName(details, desc) {
    for (let i = 0; i < details.length; i++) {
      if (desc == details[i].managerName) {
        return details[i].managerEmail;
      }
    }
  }
  get m() {
    return this.memberForm.controls;
  }
  get newmember() {
    return this.newmemberForm.controls;
  }
  newmemberSubmit(newMemberData) {
    this.submitted = true;
    const newMemberFormsData = { ...newMemberData }; //creating a new objects............
    const generatedReqKey = this.generateReqKey(
      newMemberFormsData.projectName,
      newMemberFormsData.role
    );
    const fn = JSON.parse(localStorage.getItem('userDetails')).firstName;
    const ln = JSON.parse(localStorage.getItem('userDetails')).lastName;
    let skills = newMemberFormsData.skillset.map(function (element) {
      return element.value;
    });

    const newMemberObject = {
      role: newMemberFormsData.role,
      location: this.generateLocation(newMemberFormsData.location),
      projectName: newMemberFormsData.projectName,
      raisedByName: this.generateName(fn, ln),
      requestNumber: this.create_UUID(),
      raisedByEmail: JSON.parse(localStorage.getItem('userDetails')).email,
      skillset: skills,
      position: newMemberFormsData.position,
      assignee: '',
      status: 'open',
      jobDescription: '',
      requirementKey: generatedReqKey,
      isReopened: false,
      reopenedDate: null
    };
    if (newMemberData.skillset.length > 0) {
      let skill_set = newMemberData.skillset.map(value => value.value);
      newMemberFormsData.skillset = skill_set;
    }

    this._fetchDetails.sendToCm(newMemberObject).subscribe(
      res => {
        this.newmemberForm.reset();
        this.toastmsgService.add({
          severity: 'success',
          summary: 'Request sent successfully'
        });
      },
      err => {
        this.toastmsgService.add({
          severity: 'error',
          summary: 'Request not sent Role already exist'
        });
      }
    );
  }


  addMember() {
    this.showActiveButton = true;
    this.newReqProject = this.projectDetails;
    this.present = false;
    this.getNewReqEmpLocation();
  }


  filterRemoveUsers(event) {
    // this.getFetchDetails();
    let query = event.query;
    this.newUserName = [];
    this.filteredUser.forEach(e => {
      this.newUserName.push(e.name);
      this.newUserName = this.filterUsers(query, this.newUserName);
    });
  }

  filterUsers(query, newUserName: any[]): any[] {
    let filtered: any[] = [];
    for (let i = 0; i < newUserName.length; i++) {
      let country = newUserName[i];
      if (country.toLowerCase().indexOf(query.toLowerCase()) == 0) {
        filtered.push(country);
      }
    }
    return filtered;
  }

  onSave() {
    this.submitted = true;

    if (this.memberForm.invalid) {
      this.showModel = true;
    } else {
      let newMemberData = {
        end_date: this.present
          ? 'present'
          : moment(this.memberForm.value.end_date).format('YYYY-MM-DD'),
        is_new: true,
        member: this.memberForm.value.member.replace(' ', '-').toLowerCase(),
        project_id: this.projectDetailEdit._id,
        role: this.memberForm.value.role,
        start_date: moment(this.memberForm.value.start_date).format(
          'YYYY-MM-DD'
        ),
        presentChk2: this.present
      };

      this.projectDetailEdit.members.push(newMemberData);
      this.present = false;
      this.maxDateValueStartDate = null;
      this.minDateValueEndDate = null;
      this.editProjectMemberFormdata.emit(true);
      this.showModel = false;

      this.memberForm.reset();
    }
  }

  memberSelectStartDate(selectedStarDate) {
    this.memberForm.get('start_date').setValue(selectedStarDate);
    if (this.memberForm.value.start_date >= this.memberForm.value.end_date)
      this.memberForm.get('end_date').setValue('');
    this.minDateValueEndDate = selectedStarDate;
    this.cdref.detectChanges();
  }
  memberSelectEndDate(selectedEndDate) {
    this.memberForm.get('end_date').setValue(selectedEndDate);
    this.maxDateValueStartDate = selectedEndDate;
    this.cdref.detectChanges();
  }
  serachRoles(event) {
    const findRole = this.fetchDetails.roles.map(role => role.description);
    this.roles = findRole.filter(item => {
      return item.toLowerCase().includes(event.query.toLowerCase());
    });
  }
  // Generate Unique Id ..........
  create_UUID() {
    let dt = new Date().getTime();
    let uuid = 'xxx'.replace(/[xy]/g, function (c) {
      let r = (dt + Math.random() * 16) % 16 | 0;
      dt = Math.floor(dt / 16);
      return (c == 'x' ? r : (r & 0x3) | 0x8).toString(16);
    });
    return uuid;
  }
  changeTab($event) {
    this.activeTab = $event.heading;
  
    // console.log('head', $event)
  }
  generateReqKey(projName, role) {
    if (projName && role) {
      const generatedName = projName + '-' + role;
      const shortedName = generatedName.trim();
      const replacedName = shortedName.replace(/\s+/g, '-').toLowerCase();
      return replacedName;
    } else if (projName) {
      const generatedName = projName;
      const shortedName = generatedName.trim();
      const replacedName = shortedName.replace(/\s+/g, '-').toLowerCase();
      return replacedName;
    } else return '';
  }
  generateName(firstname, lastname) {
    const generatedName = firstname + ' ' + lastname;
    const shortedName = generatedName.trim();
    const replacedName = shortedName.replace(/\s+/g, ' ');
    return replacedName;
  }
  generateLocation(location) {
    if (location) {
      return location;
    } else return 'Andheri, Mumbai';
  }
  ngOnDestroy(): void {
    this._onDestroy.next();
    this._onDestroy.complete();
  }
}
