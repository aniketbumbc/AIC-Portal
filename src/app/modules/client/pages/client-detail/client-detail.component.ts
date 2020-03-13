import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { ClientService } from '../../service/client.service';
import { config } from '../../../../configs/app.configs';
import { environment } from '@env/environment';

@Component({
  selector: 'app-client-detail',
  templateUrl: './client-detail.component.html',
  styleUrls: ['./client-detail.component.scss']
})
export class ClientDetailComponent implements OnInit {
  ClientDetail: any;
  slug: string;
  parameter: any;
  clientId: any;
  breadCrumb: any;
  imageUrl: any;
  isAdmin: boolean = false;
  imageURL: string = environment.imageUrl;

  constructor(
    private clientservice: ClientService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.slug = this.route.snapshot.params.id;
    this.getNewClient(this.slug);
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
        isActive: true
      }];
    this.isAdmin = localStorage.getItem('userRole') === 'admin';
  }

  getNewClient(clientId) {
    const param = {
      id: clientId
    };

    this.clientservice.getData(param).valueChanges.
      subscribe(res => {
        this.ClientDetail = res.data.client;
        this.clientId = this.ClientDetail.id;
        if (this.ClientDetail.active === true) {
          this.ClientDetail.active = "Active"
        } else {
          this.ClientDetail.active = "Inactive"
        }

      })

  }
}

