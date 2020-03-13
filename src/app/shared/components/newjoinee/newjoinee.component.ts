import { Component, OnInit, OnDestroy } from '@angular/core';
import{NewjoineeService} from '../../../shared/home-page/services/newjoinee.service';
import { config } from '@app/configs/app.configs';
import { Subject } from 'rxjs';
import { environment } from '@env/environment';
@Component({
  selector: 'app-newjoinee',
  templateUrl: './newjoinee.component.html',
  styleUrls: ['./newjoinee.component.scss']
})
export class NewjoineeComponent implements OnInit, OnDestroy {
  imageUrl:any = environment.imageUrl;
  decached:any = config.DECACHED;
  homeProfilesData:any;
  private _onDestroy = new Subject<void>();

  constructor(private newjoineeservice:NewjoineeService) { }

  ngOnInit() {
   this.getProfileData();
  }

 getProfileData(){
  this.newjoineeservice.getNewHomeProfilesDataQuery().valueChanges.subscribe(res=>{
    this.homeProfilesData =res.data.employees;
      if(this.homeProfilesData.length > 3) {
        this.homeProfilesData = this.homeProfilesData.slice(0,3);
      }
  });
}
ngOnDestroy(): void {
  this._onDestroy.next();
  this._onDestroy.complete();
}
}
