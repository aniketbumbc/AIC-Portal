import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { Apollo, QueryRef } from 'apollo-angular';
import {
    getProjects,
    Project,
    getProjectDetail,
    getTechStackSetting,
    UpdateProject,
    getProjectDetailForEdit,
    getFetchDetails,
    saveProjectDocument,
    getLocations,
    ProjectDetailNew,
    techstackNew,
    createProject,
    allEmployees,
    createDocument,
    getEmployeebyName,
    getEmployeeDetails,
    updateProjectDocument,
    editProject,
    deleteProjectDocument,
    filterProjects,
    searchProjectData
}
    from '../store/queries';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class ProjectQueryService {
    url = "https://smart-search.accionbreeze.com/search/autocomplete"
    constructor(
        private _apollo: Apollo,
        private http: HttpClient
    ) { }

    getProjectQuery(params) {
        return this._apollo.subscribe({
            query: getProjects,
            variables: params
        });
    }

    getNewProjectQuery(params) {
        return this._apollo.use('client2').subscribe({
            query: Project,
            variables: params
        })
    }

    searchProjectData() {
        return this._apollo.use('client2').subscribe({
            query: searchProjectData
        })
    }

    getProjectDetailQuery(params): QueryRef<any> {
        return this._apollo.watchQuery({
            query: getProjectDetail,
            variables: params
        });
    }
    
    getProjectDetailQueryForEdit(params): QueryRef<any> {
        return this._apollo.watchQuery({
            query: getProjectDetailForEdit,
            variables: params
        });
    }

    getTechStackSetting(params): QueryRef<any> {
        return this._apollo.watchQuery({
            query: getTechStackSetting,
            variables: params
        })
    }

    getFetchDetailsQuery(params): QueryRef<any> {
        return this._apollo.watchQuery({
            query: getFetchDetails,
            variables: params
        });
    }

    updateProject(params) {
        return this._apollo.mutate({
            mutation: UpdateProject,
            variables: params
        })
    }
    
    saveProjectDocument(params) {
        return this._apollo.mutate({
            mutation: saveProjectDocument,
            variables: params
        })
    }

    getLocations(params) {
        return this._apollo.watchQuery({
            query: getLocations,
            variables: params
        })
    }

    getProjectDetailNew(params) {
        return this._apollo.use('client2').subscribe({
            query: ProjectDetailNew,
            variables: params
        })
    }

    getTechstackNew() {
        return this._apollo.use('client2').subscribe({
            query: techstackNew
        })
    }

    createProjectNew(params) {
        return this._apollo.use('client2').mutate({
            mutation: createProject,
            variables: params
        })
    }

    getAllEmployees() {
        return this._apollo.use('client2').subscribe({
            query: allEmployees
        })
    }

    getEmployeeAutoComplete(event: any) {
        return this.http.post<any>(this.url, event)
    }

    createProjectDocument(params) {
        return this._apollo.use('client2').mutate({
            mutation: createDocument,
            variables: params
        })
    }

    getEmployeebyName(params) {
        return this._apollo.use('client2').subscribe({
            query: getEmployeebyName,
            variables: params
        })
    }

    getEmpDetails(params) {
        return this._apollo.use('client2').subscribe({
            query: getEmployeeDetails,
            variables: params
        })
    }

    updateProjectDocument(params) {
        return this._apollo.use('client2').mutate({
            mutation: updateProjectDocument,
            variables: params

        })
    }

    editProject(params) {
        return this._apollo.use('client2').mutate({
            mutation: editProject,
            variables: params
        })
    }

    deleteProjectDocument(params) {
        return this._apollo.use('client2').mutate({
            mutation: deleteProjectDocument,
            variables: params
        })
    }

    createProject(formData) {
        return this.http.post(environment.newProjects, formData);
    }
    editProjectFromUrl(params, projectId) {
        return this.http.put(`${environment.newBaseUrl}projects/${projectId}`, params);
    }

    filterProjects(params):QueryRef<any>{
        return this._apollo.use('client2').watchQuery({
          query:filterProjects,
          variables: params
        })
      }

}

