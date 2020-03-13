import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { CoeService } from '../services/coe.service';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
@Component({
  selector: 'app-coe',
  templateUrl: './coe.component.html',
  styleUrls: ['./coe.component.scss'],

})
export class CoeComponent implements OnInit, OnDestroy {
  // @Input("page") page: string;
  @Input()
  routerLinkActiveOptions: {
    exact: boolean;
  }
  @Input()
  routerLinkActive: string | string[];

  coeData: string;

  NewcoeData: string;
  coeSearchData: any;
  slug: any;
  parameter: any;
  private _onDestroy = new Subject<void>();

  constructor(private coeservice: CoeService, private route: ActivatedRoute, ) { }

  ngOnInit() {
    // this.getCoedData();
   
  }

  // getCoedData() {
  //   const param = {
  //     'sessionId': localStorage.getItem('token')
  //   }
  //   this.coeservice.getCOEQuery(param).valueChanges.subscribe(res => {
  //     this.coeData = res.data.GetCOEData.data;
  //   });
  // }

  ngOnDestroy(): void {
    this._onDestroy.next();
    this._onDestroy.complete();
  }

}
