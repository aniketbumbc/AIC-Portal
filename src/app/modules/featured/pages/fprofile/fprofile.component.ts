import { Component, OnInit,Input } from '@angular/core';
import {CommonService} from '../../common-home.service';
@Component({
  selector: 'app-fprofile',
  templateUrl: './fprofile.component.html',
  styleUrls: ['./fprofile.component.scss']
})
export class FprofileComponent implements OnInit {

  constructor(private commonservice: CommonService) { }

  @Input() childData:string;

  fetchDetails:any;
  rlNameAndPhoto:any={};

  ngOnInit() {
   // this.getFetchDetails();
    
  }

}
