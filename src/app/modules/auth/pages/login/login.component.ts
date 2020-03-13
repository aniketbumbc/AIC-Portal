import { Component, OnInit, OnDestroy } from '@angular/core';
import { environment } from '@env/environment';
import { FormBuilder, FormGroup, Validators, FormControl} from '@angular/forms';
import { LoginQueryService } from '../../services/auth.service';
import {regex} from '../../../config/regex'
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  loginUrl = `${environment.authUrl}/auth/google`;
  loginForm: FormGroup;
  requestForm:FormGroup;
  forgotForm:FormGroup;
  submitted = false;
  checkbox: any;
  regex_email:any;
  regex_password:any;
  show: boolean = false;
  display:boolean=false;
  private _onDestroy = new Subject<void>();
  constructor(
    private formBuilder: FormBuilder,
    private _loginQueryService: LoginQueryService,
    private toastmsgService:MessageService,
    private _route:Router
  ) { }

  ngOnInit() {
    this.regex_email = regex.email_regex_for_allowed_domain;
    this.regex_password = regex.regex_for_password;
    this.loginForm = this.formBuilder.group({
      username:['',[Validators.required,Validators.pattern(this.regex_email)]],
      password:['',Validators.required],
    })
    this.requestForm = this.formBuilder.group({
      username:['',[Validators.required,Validators.pattern(this.regex_email)]],
    })
    this.forgotForm = this.formBuilder.group({
      username:['',[Validators.required,Validators.pattern(this.regex_email)]],
    })
  }
  userLogIn(values) {
    const param = {
      data:values,
    };
    this.toastmsgService.add({ sticky: true, severity: 'info', summary: "Please wait..." });
    this._loginQueryService.loginApi(param).subscribe(
      res=>{
        this.toastmsgService.clear();
        const resp=res.data.Login;
        if(resp.data!==null && resp.decoded){
          this.toastmsgService.add({ severity: 'success', summary: resp.responseDesc});
          localStorage.setItem('token',resp.data);
          localStorage.setItem('user',JSON.stringify(resp.decoded));
          this._route.navigate(['/home']);
        } else{
          this.toastmsgService.add({ severity: 'error', summary: "Authentication failed. Invalid username or password" });
        }
      },
      err => {
        this.toastmsgService.clear();
        this.toastmsgService.add({ severity: 'error', summary: "Authentication failed. Invalid username or password." });
      }
    );
  }
  requestForAccess(values){
    this.toastmsgService.add({sticky: true, severity: 'info', summary: "Please wait..." });
    this._loginQueryService.requestForAccess(values).subscribe(res=>{
      this.toastmsgService.clear();
      const resp=res.data.CheckLocalUser;
      if(resp.error===true && resp.message){
        this.toastmsgService.add({ severity: 'error', summary: resp.message });
      } 
      else if(resp.error===true && resp.flag){
        this.toastmsgService.add({ severity: 'error', summary: resp.flag });
      } 
      else if(resp.error==null && resp.data && resp.responseDesc){
        this.toastmsgService.add({ severity: 'success', summary: resp.responseDesc});
        this.toastmsgService.add({ severity: 'success', summary: "Thank you, we will send an email with credentials shortly."});
        this.requestForm.reset();
        this.show=false;
        this.display=false;
      }
    },
    err=>{
      this.toastmsgService.clear();
      this.toastmsgService.add({ severity: 'error', summary: "Please enter valid E-mail." });
    })
  }
  forgetPassword(values){
     this.toastmsgService.add({ sticky: true, severity: 'info', summary: "Please wait..." });
    this._loginQueryService.forgetPassword(values).subscribe(res=>{
      this.toastmsgService.clear();
      const resp=res.data.ForgetPassword;
      if(resp.error==null && resp.data){
        this.toastmsgService.add({ severity: 'success', summary: resp.data});
        this.show=false;
        this.display=false;
        this.forgotForm.reset();
      }
    },
    err=>{
      this.toastmsgService.clear();
      this.toastmsgService.add({ severity: 'error', summary: "No such account is associated with AIC" });
    })
  }
  onChange(event) {
    this.checkbox = event.target.checked;
  }
  clicked() {
    this.show = !this.show;
}
savedClicked(){
  this.submitted = true;
}
forgotclicked() {
  this.display = !this.display;
}
cancelBtnClicked(event) {
  this.show = false;
  this.
  display=false;
}
ngOnDestroy(): void {
  this._onDestroy.next();
  this._onDestroy.complete();
}
}
