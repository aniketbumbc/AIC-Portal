import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ClientService } from '../../service/client.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.scss']
})
export class ClientComponent implements OnInit, OnDestroy {

  clientData = [];
  showStaticData: boolean = false;
  p: any;
  breadCrumb: any;
  pageOfItems: Array<any>;
  clData: any;
  isAdmin: boolean = false;
  private _onDestroy = new Subject<void>();

  constructor(private activateroute: ActivatedRoute,
    private router: Router,
    private clientservice: ClientService,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit() {
    this.breadCrumb = [
      {
        label: 'Home',
        url: '/home',
        isActive: false
      }, {
        label: 'Clients',
        url: '/client',
        isActive: true
      }];
    // this.getAllData();

    this.getClientData();
    this.isAdmin = localStorage.getItem('userRole') === 'admin';
  }

  /* getAllData() {
    this.clientservice.getAllClients().valueChanges.subscribe(res => {
      this.clientData = res.data.clients;
      this.showStaticData = true;
    })
  } */

  getClientDetails(event) {
    this.router.navigate([`/client/detail/${event.detail.data.data._id}`]);
  }
  accountManagerName(managerList) {
    if (!managerList.length) {
      return '';
    }

    let namesArray = [];

    managerList.forEach(element => {
      namesArray.push(element.name);
    });

    return namesArray.join(", ");
  }

  getClientData() {
    this.spinner.show();
    this.clientservice.getClientData().subscribe(resp => {
      this.clData = JSON.stringify(resp);
      this.showStaticData = true;
      this.spinner.hide();
    });
  }
  ngOnDestroy(): void {
    this._onDestroy.next();
    this._onDestroy.complete();
  }
}
