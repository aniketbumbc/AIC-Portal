import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '@env/environment';
import { gql } from 'apollo-angular-boost';
import { Apollo, QueryRef } from 'apollo-angular';
import {updateProjectMember} from '../modules/project/store/queries/project-mutation.query';
import { getToken } from '@angular/router/src/utils/preactivation';
import { MyProfileServices } from '@app/shared/services/myProfile.service';

@Injectable({
    providedIn: 'root'
})
export class DataService {
  members = [];
  deletedMember = [];
  newMembers = [];
  profileId: string;

  constructor(
    private https: HttpClient,
    private _apollo: Apollo,
    private profileService: MyProfileServices
  ) {
    this.initProfileId();
  }

  initProfileId() {
    const profile = JSON.parse(localStorage.userDetails).email;
    let params = {
      where: {
        "email" : profile
      }
    }
    this.profileService.employeeDetail(params).valueChanges.subscribe(res => {
      this.profileId = res.data.employees[0].id;
    })
  }

  updateData(id,startDate?,endDate?,role?) {
    id = id.toString();
    this.members.push({"employeeId":id,"startDate":startDate,"endDate":endDate,"designation":role});
  }
  deletedMembers(data){
    this.deletedMember.push(data);
  }
  addedMembers(data){
    this.newMembers.push(data);
  }
  sendAddProjectMember(memberData){
    return this.https.post(environment.addAndRemoveProjectMember, memberData);
  }
  deleteProjectMember(memberID){
    return this.https.delete(environment.addAndRemoveProjectMember +'/'+memberID);
  }
  updateProjectMember(params) {
    return this._apollo.use('client2').mutate({
      mutation: updateProjectMember,
      variables: params,
      fetchPolicy: "no-cache"
    })
  }

  getProjectNewMemberLocation(){
    const token = localStorage.getItem('token');
    if(token){
      const header = {
        "Authorization" : `Bearer ${token}`
      }
      return this.https.get(environment.projectNewReqMemberLocation,{
        headers: header
      });
    }
  }

  setProfileId(profileId) {
    this.profileId = profileId;
  }

  getProfileId() {
    return this.profileId;
  }
}
