import { Injectable } from '@angular/core';
import { Apollo, QueryRef } from 'apollo-angular';
import { clients, getClient, getAccountManagers, updateClient, createClient, searchACM, clientName } from '../store/query/client.query';
import { HttpClient } from '@angular/common/http';
import { environment } from '@env/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  constructor(private _apollo: Apollo,
    private http: HttpClient) { }

  getAllClients() {
    /* return this._apollo.use('client2').watchQuery({
      query: clients,
      fetchPolicy: "no-cache"
    }) */
    return this.http.get('https://aic.accionbreeze.com/clients');
  }
  getData(params): QueryRef<any> {
    return this._apollo.use('client2').watchQuery({
      query: getClient,
      variables: params,
      fetchPolicy: "no-cache"
    })
  }
  getAccountManagers(): QueryRef<any> {
    return this._apollo.use('client2').watchQuery({
      query: getAccountManagers,
    })
  }
  searchACM(params): QueryRef<any> {
    return this._apollo.use('client2').watchQuery({
      query: searchACM,
      variables: params

    })
  }

  clientByName(parmas) {
    return this._apollo.use('client2').subscribe({
      query: clientName,
      variables: parmas
    })
  }

  getClientData() {
    const token = localStorage.getItem('token');
    // const headers = new Headers();
    const headers = { 'Authorization': 'Bearer ' + token };
    return this.http.get('https://admin-service.accionbreeze.com/gridconfigurations?path=aic/clients', {
      headers: headers
    });
  }

  // updateClient(params){
  //   return this._apollo.use('client2').mutate({
  //     mutation:updateClient,
  //     variables:params,
  //   })
  // }

  updateClient(params) {
    return this._apollo.use('client2').mutate({
      mutation: updateClient,
      variables: params,
      fetchPolicy: "no-cache"
    })
  }

  createClient(params) {
    return this._apollo.use('client2').mutate({
      mutation: createClient,
      variables: params,
    })
  }

  uploadImage(formdata) {
    return this.http.post(`${environment.newBaseUrl}upload`, formdata);
  }

}

