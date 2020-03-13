import { Injectable } from '@angular/core';
import { Apollo, QueryRef, Mutation } from 'apollo-angular';
import { getNewAicData, getNewProfileData,getNewAicLevels,getProfileDetail,getExportProfileData, getDetailsForEditProfile, saveProfile, updateProfilePhoto, deleteProfilePhoto,updateEmployee, createSocialprofileemployee} from '../store/queries';
import { HttpClient } from '@angular/common/http';
import { environment } from '@env/environment';

@Injectable()
export class ProfileQueryService {
  constructor(
    private _apollo: Apollo,
    private http: HttpClient,
  ) { }

  getProfileDetailQuery(params): QueryRef<any> {
    return this._apollo.watchQuery({
      query: getProfileDetail,
      variables: params
    });
  }
  getProfileDetailForEditQuery(params): QueryRef<any> {
    return this._apollo.watchQuery({
      query: getDetailsForEditProfile,
      variables: params
    });
  }
  getExportProfileQuery(params):QueryRef<any>
  {
    return this._apollo.watchQuery({
      query:getExportProfileData,
      variables:params
    });
  }
  saveProfile(params){
    return this._apollo.mutate({
      mutation:saveProfile,
      variables:params
    });
  }
  updateEmployee(params){
    return this._apollo.use('client2').mutate({
      mutation:updateEmployee,
      variables:params
    })
  }

  updateProfilePhoto(params){
    return this._apollo.mutate({
      mutation:updateProfilePhoto,
      variables:params
    })
  }

  deleteProfilePhoto(params){
    return this._apollo.mutate({
      mutation:deleteProfilePhoto,
      variables:params
    })
  }  

  getNewAicLevelQuery():QueryRef<any>{
    return this._apollo.use('client2').watchQuery({
      query:getNewAicLevels
    })
  }

  getNewAicUserData(params):QueryRef<any>{
    return this._apollo.use('client2').watchQuery({
      query:getNewAicData,
      variables:params
    })
  }

  getNewAicProfileData(params):QueryRef<any>{
    return this._apollo.use('client2').watchQuery({
      query:getNewProfileData,
      variables:params,
      fetchPolicy:"no-cache"
    })
  }

  createSocialprofileemployee(params){
    return this._apollo.use('client2').mutate({
      mutation:createSocialprofileemployee,
      variables:params
    })
  }
  getAicProfile(slug,limit){
    return this.http.get(environment.aicEmployee + slug + "&limit=" +limit);
  }

  uploadImage(formdata){
    return this.http.post(`${environment.newBaseUrl}upload`, formdata);
  }
  createSocialProfile(formdata){
    return this.http.post(`${environment.addNupdateSocialProfiles}`,formdata);
  }
  updateSocialProfile(formdata){
    return this.http.put(`${environment.addNupdateSocialProfiles}`,formdata);
  }
  // exportProflie(params){
  //   return this.http.get(environment.exportProfile+params);
  // }
  
}
