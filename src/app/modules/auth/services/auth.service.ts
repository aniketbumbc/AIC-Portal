import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { loginApi, forgetPasswordApi, requestForAccessApi } from '../store/queries/login.query';

@Injectable()
export class LoginQueryService {
  constructor(
    private _apollo: Apollo
  ) { }
  
  loginApi(params) {
    return this._apollo.mutate({
      mutation:loginApi,
      variables:params
    });
  }
  requestForAccess(params){
    return this._apollo.mutate({
      mutation:requestForAccessApi,
      variables:params
    })
  }
  forgetPassword(params){
    return this._apollo.mutate({
      mutation:forgetPasswordApi,
      variables:params
    })
  }
}