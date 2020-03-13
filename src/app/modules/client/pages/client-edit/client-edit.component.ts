import { Component, OnInit, Input, ViewChild, ElementRef, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ClientService } from '../../service/client.service';
import * as _ from 'lodash';
import { DomSanitizer } from '@angular/platform-browser';
import { MessageService } from 'primeng/api';
import { Location } from '@angular/common';
import { regex } from '../../../config/regex';
import { GrowlAlertService } from './../../../../core/services/growl-alert.service';
import { config } from '../../../../configs/app.configs';
import { Subject } from 'rxjs';
import { environment } from '@env/environment';

@Component({
  selector: 'app-client-edit',
  templateUrl: './client-edit.component.html',
  styleUrls: ['./client-edit.component.scss']
})

export class ClientEditComponent implements OnInit, OnDestroy {
  @ViewChild('fileInputs') fileInputs: ElementRef

  isSumbittted = false;
  parameter: any;
  slug: any;
  url: any;
  clientData: any;
  page: any = "Edit Client";
  clientEditForm: FormGroup;
  allClients: any;
  clientStatus = [];
  accountManagers: any;
  responseMsg: any;
  optionsLocation: any;
  activeStatus = [];
  nameRegex: any;
  tempClientData = [];
  timeout = null;
  thumbnailName: any;
  files = [];
  breadCrumb: any;
  isUpload = false;
  private _onDestroy = new Subject<void>();


  amConfig = {
    displayKey: 'name', //if objects array passed which key to be displayed defaults to description
    height: '350%',
    placeholder: 'Select your option',
    search: true,
    multiple: true,
    searchPlaceholder: 'Search name',
    searchOnKey: 'name',
    noResultsFound: 'No results found!',
  };

  location = {
    displayKey: 'location', //if objects array passed which key to be displayed defaults to description
    height: '350%',
    placeholder: 'Select your option',
    search: false,
  }

  status = {
    displayKey: '', //if objects array passed which key to be displayed defaults to description
    height: '350%',
    placeholder: 'Select your option',
    search: false,
    limitTo: 2,

  }

  constructor(private route: ActivatedRoute,
    private sanitizer: DomSanitizer,
    private clientservice: ClientService,
    private formBuilder: FormBuilder,
    private cd: ChangeDetectorRef,
    private toastmsgService: MessageService,
    private _route: Router,
    private _location: Location,
    private alertService: GrowlAlertService

  ) { }

  ngOnInit() {
    this.clientStatus = ['Active', 'Inactive'];
    this.slug = this.route.snapshot.params.id;
    this.getClientData(this.slug);
    this.getClientsDetail();
    this.getAccountManagers();
    this.activeStatus = ['Active', 'Inactive']

    this.nameRegex = regex.regex_title;
    this.clientEditForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.pattern(this.nameRegex)]],
      accountManagers: ['', [Validators.required]],
      location: ['', [Validators.required, Validators.pattern(this.nameRegex)]],
      active: ['', [Validators.required]],
      description: ['', Validators.required],
    });
    this.breadCrumb = [
      {
        label: 'Home',
        url: '/home',
        isActive: false
      }, {
        label: 'Clients',
        url: '/client',
        isActive: false
      }, {
        label: 'Details',
        url: `/client/detail/${this.slug}`,
        isActive: false
      }, {
        label: 'Edit',
        url: `/client/edit/${this.slug}`,
        isActive: true
      }];
  }

  onSearch(event) {
    let params = {
      "where": { "name_contains": event.term }
    }
    if (event.term.length >= 3) {
      this.clientservice.searchACM(params).valueChanges.subscribe((employess: any) => {
        this.tempClientData = employess.data.employees;
      })
    }
  }



  updateClient(params) {
    this.clientservice.updateClient(params).subscribe(
      res => {
        if (res.data.updateClient) {
          if (this.isUpload) {
            this.getImageUpload();
          }
          // this.responseMsg = "Client Updated Succefully";
          //   this.alertService.showSuccess('client updated successfully');
          //  this._route.navigate(['/client/detail', this.clientData.id]); 
        }
      });
  }

  onSelectFile(fileEvents) {
    const reader = new FileReader();
    this.thumbnailName = fileEvents.target.files[0];
    reader.readAsDataURL(fileEvents.target.files[0]); //read as url data of file...
    reader.onload = () => {
      this.url = reader.result;
      this.files.push(this.url);
      this.cd.markForCheck();
    };
    this.isUpload = true;
  }
  getImageUpload() {
    const formData = new FormData();
    formData.append('ref', 'client');
    formData.append('field', 'logo');
    formData.append('refId', this.clientData.id);
    formData.append('files', this.thumbnailName);
    this.clientservice.uploadImage(formData).subscribe(res => {
      this.alertService.showSuccess('client updated successfully');
      this._route.navigate(['/client/detail', this.clientData.id]);
      
      
     });
  }

  remove() {
    this.url = null;
    this.files = [];
    this.fileInputs.nativeElement.value = null;
    if (this.url === null) {
      this.responseMsg = "Thumbnail is required";
    }
  }

  getClientData(clientId) {
    const param = {
      id: clientId
    };
    this.clientservice.getData(param).valueChanges.subscribe(res => {
      this.clientData = res.data.client;
      if (this.clientData.logo !== null) {
        this.files.push(this.clientData.logo);
        this.url = environment.imageUrl + this.clientData.logo.url;
      } else {
        this.url = null;
      }

      if (this.clientData.active === true) {
        this.clientData.active = 'Active';
      } else {
        this.clientData.active = 'Inactive';
      }
    })
  }

  getAccountManagers() {
    this.clientservice.getAccountManagers().valueChanges.subscribe(res => {
      this.accountManagers = res.data.employees;
    })
  }

  getClientsDetail() {
    this.clientservice.getAllClients().subscribe(res => {
      this.allClients = res;
      let optionLoc = [];
      this.allClients.forEach(element => {
        optionLoc.push(element.location)
      })
      this.optionsLocation = optionLoc.filter((obj) => {
        return /\S/.test(obj);
      });
    })
  }

  onSubmit() {
    this.isSumbittted = true;
    let data = this.clientEditForm.value;
    if (data.active === "Active") {
      data.active = true;
    }
    else if (data.active = "Inactive") {
      data.active = false;
    }
    if (data.accountManagers) {
      let temArray = [];
      data.accountManagers.map(ele => {
        temArray.push(ele.id);
      })
      data.accountManagers = temArray;
    }
    let amId = [];
    this.clientData.accountManagers.forEach(res => {
      amId.push(res.id)
    })
    data.accountManagers = amId;
    const clientParams = {
      data: {
        data: data,
        where: { id: this.slug }
      }
    }
    this.updateClient(clientParams);
  }

  cancelBtnClicked(event) {
    this._location.back();
  }
  get f() {
    return this.clientEditForm.controls;
  }
  ngOnDestroy(): void {
    this._onDestroy.next();
    this._onDestroy.complete();
  }
}
