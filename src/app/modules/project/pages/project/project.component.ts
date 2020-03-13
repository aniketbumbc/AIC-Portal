import { Component, OnInit, Input, OnDestroy, ViewChild } from '@angular/core';
import { ProjectQueryService } from '../../services/project.service';
import { map } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { AutoCompleteModule, AutoComplete } from 'primeng/autocomplete';
import * as _ from 'lodash';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss'],
})
export class ProjectComponent implements OnInit, OnDestroy {
  @Input() searchPage: boolean;
  showloader: Boolean = false;
  projectData: any;
  ProjectRequest: any = {
    limit: 20,
    start: 0,
    sort: "startDate:desc"
  }
  lastScroll = window.innerHeight + window.scrollY;
  isDataFound = true;
  isFetching = false;
  fetchDetails: any;
  breadCrumb: any;
  rlNameAndPhoto: any = {};
  simpleItems = [];
  filteredMode = false;
  filteredProjectData: any[] = [];
  searchText = '';
  isFocus = false;
  dropdownContent: any;
  count = 0;
  showNoResult: boolean = false;
  projectTitles: any = [];
  projectClients: any = [];
  projectMembers: any = [];
  private _onDestroy = new Subject<void>();
  projectSearchData: any = [];
  clientTitles: any = []
  projectGetData: any = [];
  @ViewChild('autocomplete') autocompleteCharge: AutoComplete;
  constructor(private projectQueryService: ProjectQueryService) { }

  ngOnInit() {
    this.showloader = false;
    this.getProjects(this.ProjectRequest, true, true);
    this.projectQueryService.searchProjectData().subscribe(res => {
      res.data.clients.forEach(client => {
        this.clientTitles.push(client.name);
      });
      res.data.projects.forEach(project => {
        this.projectTitles.push(project.name);

      });
      res.data.employees.forEach(employee => {
        this.projectMembers.push(employee.name);
      });
    });

    this.breadCrumb = [
      {
        label: 'Home',
        url: '/home',
        isActive: false
      }, {
        label: 'Projects',
        url: '/project',
        isActive: true
      }];
    this.simpleItems = ['Project title', 'Clients', 'Members'];
  }


  getProjects(value, fetch, isInit?) {
    if (!fetch) {
      this.isFetching = !fetch;
    }
    this.projectQueryService.getNewProjectQuery(value).subscribe(res => {
      this.filteredMode = false;
      this.showloader = false;
      this.projectData = isInit ? res.data.featured.concat(res.data.nonFeatured) : this.projectData.concat(res.data.nonFeatured);
      if (this.projectData < 11) {
        this.isDataFound = false;
      }
      this.isFetching = false;
    });
  }

  onFocus(event) {
    this.isFocus = true;
    // this.onClose();
    if (event === "Project title") {
      this.projectSearchData = [];
      this.projectGetData = [];
      this.projectSearchData = this.projectTitles;
    } else if (event === "Clients") {
      this.projectSearchData = [];
      this.projectGetData = [];
      this.clientTitles = _.union(this.clientTitles);
      this.projectSearchData = this.clientTitles;
    } else {
      this.projectSearchData = [];
      this.projectGetData = [];
      this.projectMembers = _.union(this.projectMembers);
      this.projectSearchData = this.projectMembers;
    }
    this.dropdownContent = event;
  }

  filterProject(event) {

    /* this.projectGetData = [];
    for(let i =0;i<this.projectSearchData.length;i++){
      let projectName = this.projectSearchData[i];
      if(projectName.toLowerCase().indexOf(event.query.toLowerCase())==0){
        this.projectGetData.push(projectName);
      }
    } */
    const searchText = event.query.toLowerCase();
    if (this.dropdownContent !== 'Members') {
      this.projectGetData = this.projectSearchData.filter(it => {
        return it ? it.toLowerCase().includes(searchText) : false;
      });
    } else {
      let params = {
        "where": { "name_contains": searchText }
      }
      this.projectQueryService.getEmployeebyName(params).subscribe((res) => {
        this.projectMembers = [];
        res.data.employees.forEach(employee => {
          this.projectMembers.push(employee.name);
        });
        this.projectMembers = _.union(this.projectMembers);
        this.projectSearchData = this.projectMembers;
        this.projectGetData = this.projectMembers;
      })
    }

  }

  filterData(params) {
    this.isFocus = true;
    if (this.searchText.length >= 3) {
      this.showNoResult = false;
      this.projectQueryService.filterProjects(params).valueChanges.subscribe(res => {
        this.filteredProjectData = res.data.projects;
        this.filteredMode = true;
        this.count = this.filteredProjectData.length;
        if (!this.count) {
          this.showNoResult = true;
          this.showloader = false;
        }
      })
    } else if (this.searchText.length === 0) {
      this.showloader = true;
      this.filteredMode = false;
    }
  }

  searchInput(event) {
    this.searchText = event;
    let title_params = {
      "where": { "name_contains": this.searchText }
    }
    let client_params = {
      "where": { client: { "name_contains": this.searchText } }
    }
    let member_params = {
      "where": { members: { employeeId: { "name_contains": this.searchText } } }
    }
    if (this.dropdownContent === 'Project title') {
      this.filterData(title_params);
    } else if (this.dropdownContent === 'Clients') {
      this.filterData(client_params);
    } else if (this.dropdownContent === 'Members') {
      this.filterData(member_params);
    } else {
      this.isFocus = false;
    }
  }
  onClose() {
    this.isFocus = false;
    this.searchText = '';
    this.projectGetData = [];
    this.projectSearchData = [];
    this.autocompleteCharge.inputEL.nativeElement.value = null;
    this.filteredMode = false;
    this.showNoResult = false;
  }
  onScroll(e) {
    if (!this.isFetching) {
      let footEl = document.getElementById('footer');
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight - footEl.offsetHeight && this.lastScroll < (window.innerHeight + window.scrollY)) {
        this.lastScroll = window.innerHeight + window.scrollY;
        if (this.projectData && this.isDataFound) {
          this.ProjectRequest.start += 20;
          this.showloader = true;
          this.getProjects(this.ProjectRequest, this.isFetching);
        }
      }
    }
  }
  ngOnDestroy(): void {
    this._onDestroy.next();
    this._onDestroy.complete();
  }
}
