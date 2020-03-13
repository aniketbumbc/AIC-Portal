import { Component, OnInit, ChangeDetectorRef, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ClientService } from '../../service/client.service';
import * as _ from 'lodash';
import { DomSanitizer } from '@angular/platform-browser';
import { MessageService } from 'primeng/api';
import { regex } from '../../../config/regex';
import { Location } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { GrowlAlertService } from './../../../../core/services/growl-alert.service';
import { Subject } from 'rxjs';


@Component({
  selector: 'app-client-create',
  templateUrl: './client-create.component.html',
  styleUrls: ['./client-create.component.scss']
})
export class ClientCreateComponent implements OnInit, OnDestroy {
  private _onDestroy = new Subject<void>();

  constructor(private _route: Router,
    private sanitizer: DomSanitizer,
    private clientservice: ClientService,
    private formBuilder: FormBuilder,
    private toastmsgService: MessageService,
    private _location: Location,
    private cd: ChangeDetectorRef,
    private http: HttpClient,
    private alertService: GrowlAlertService
  ) { }

  @ViewChild('fileInputs') fileInputs: ElementRef

  formData: any;
  slug: any;
  clientCreateForm: FormGroup;
  accountMgr = [];
  clientStatus = [];
  locations = [];
  clientData: any = [];
  responseMsg: any;
  isSumbittted: any;
  nameRegex: any;
  url: any;
  employeeCount: number;
  keyword: string = 'name';
  tempClientData = [];
  fileName: any;
  files = [];
  clientId: any;
  regex_name: any;
  breadCrumb: any;

  status = {
    displayKey: '', //if objects array passed which key to be displayed defaults to description
    height: '350%',
    placeholder: 'Select your option',
    search: false,
    limitTo: 2,
  }

  ngOnInit() {
    this.clientStatus = ['Active', 'Inactive'];
    this.createFromData();
    this.regex_name = regex.regex_name;
    this.nameRegex = regex.regex_title;
    this.clientCreateForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.pattern(this.nameRegex)]],
      accountManagers: ['', [Validators.required]],
      location: ['', [Validators.required, Validators.pattern(this.regex_name)]],
      active: ['', [Validators.required]],
      description: ['', Validators.required]
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
        label: 'Create Client',
        url: '/client/create/',
        isActive: true
      }];
  }

  createFromData() {
    /* this.clientservice.getAllClients().valueChanges.subscribe(res => {
      this.clientData = res['data']['employees'];
    }) */
    this.clientservice.getAllClients().subscribe(res => {
      this.clientData = res;
    });
  }

  sendFormData(params) {
    this.clientservice.createClient(params).subscribe(res => {
      if (res.data.createClient) {
        this.clientId = res.data.createClient.client.id;
        console.log(this.clientId);
        this.responseMsg = "Client Added Succefully";
        this.getImageUpload();
        this.alertService.showSuccess('Client Added Succefully');
        setTimeout(() => {
          this._route.navigate(['/client/detail', this.clientId])
        }, 700)
      }
    })
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
  // method of upload thumbnail images.....
  onSelectFile(fileEvents) {
    const reader = new FileReader();
    this.fileName = fileEvents.target.files[0];
    reader.readAsDataURL(fileEvents.target.files[0]); //read as url data of file...
    reader.onload = () => {
      this.url = reader.result;
      this.files.push(this.url);
      this.cd.markForCheck();
    };
  }
  getImageUpload() {
    const formData = new FormData();
    formData.append('ref', 'client');
    formData.append('field', 'logo');
    formData.append('refId', this.clientId);
    formData.append('files', this.fileName);
    this.clientservice.uploadImage(formData).subscribe(res => { })
  }
  remove() {
    this.url = null;
    this.files = [];
    this.formData = new FormData();
    this.fileInputs.nativeElement.value = null;
    if (this.url === null) {
      this.responseMsg = "Thumbnail is required";
    }
  }

  get f() {
    return this.clientCreateForm.controls;
  }

  onSubmit() {
    this.isSumbittted = true;
    let data = this.clientCreateForm.value;
    if (data.active == "Active") {
      data.active = true;
    } else {
      data.active = false;
    }
    if (data.accountManagers) {
      let temArray = [];
      data.accountManagers.map(ele => {
        temArray.push(ele.id);
      })
      data.accountManagers = temArray;
    }
    const createData = {
      data: {
        data: data
      }
    }
    this.sendFormData(createData);
  }
  cancelBtnClicked(event) {
    this._location.back();
  }
  ngOnDestroy(): void {
    this._onDestroy.next();
    this._onDestroy.complete();
  }
}
