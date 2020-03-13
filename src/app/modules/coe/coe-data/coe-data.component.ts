import { Component, OnInit,HostListener, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CoeService } from '../services/coe.service';
import { TabDirective } from 'ngx-bootstrap';
import { Subject } from 'rxjs';
@Component({
  selector: 'app-coe-data',
  templateUrl: './coe-data.component.html',
  styleUrls: ['./coe-data.component.scss']
})
export class CoeDataComponent implements OnInit, OnDestroy{
  showloader: Boolean = false;
  slug: any;
  coeData: any;
  activeTab: string;
  value: string;
  masonryLayout = false
  demolist: any;
  blogList: any;
  activeTab2: string;
  fetchDetails: any;
  rlNameAndPhoto: any = {};
  coeNames: any = [];
  iconNames: any;
  selectedIndex: number = null;
  linkActive: any;
  newCoeData: any;
  isfetching:boolean;
  disableScroll = false;
  scrolling:boolean;
  dataFound:any;
  employees:any =[];
  coeCall: any;
  setFlag:any = true;
  lastScroll = window.innerHeight + window.scrollY;
  params = {
      "limit":20,
      "start":0,
      "where":{
        '_id': " "
      }
     };

  count = {
    profile: 0,
    project: 0,
    blog: 0
  };
  imageIcons: string[];
  private _onDestroy = new Subject<void>();

  constructor(private activateroute: ActivatedRoute,
    private router: Router,
    private coeservice: CoeService) { }

  ngOnInit() {
    this.slug = this.activateroute.snapshot.params['slug'];    
    this.getAllData(this.slug);    
    this.getCoedNames(this.slug);
    this.activeTab = "profile";
    this.activeTab2 = "project";
    this.scrolling = false;
  }

  ngOnDestory() {
    this.coeCall.unsubscribe();
  }
  resizeEvent() {
    setTimeout(() => {
      window.dispatchEvent(new Event('resize'));
    }, 300)
  }
  getCoeDataSerach(slugId?) {
    let tempCount = 0;
    this.setFlag = true;
    if(this.params.where._id != slugId){
      this.coeData = [];
      this.employees=[];
      this.count.profile = 0;
      this.params.start = 0;
      this.params.where ._id = slugId;
    }
    
    if(this.setFlag){
    this.coeCall = this.coeservice.getNewCoeSearchQuery(this.params).valueChanges.subscribe(res => {
      this.coeData = res.data['coes'];
      this.setFlag = false;
      this.isfetching = false;
      this.coeData.forEach(e=>{
        this.employees.push.apply(this.employees,e.employees);
      }) 
      // this.employees = [...this.employees, this.coeData[0].employes];
      tempCount = this.employees.length;
      this.dataFound = tempCount > this.count.profile ? true : false;
      this.count.profile = this.employees.length;
      if (this.coeData[0].projects != null) {
        this.count.project = res.data.coes[0].projects.length;
      } else {
        this.count.project = 0;
      }
      this.showloader = false;
      this.count.blog = res.data.coes[0].blogs.length;
      this.demolist = res.data.coes[0].blogs; 
      this.coeCall.unsubscribe(); 
    })
  }
  else{
    this.coeCall.unsubscribe();
    return;
  }
  }


  // onScroll(e) {
  //   if (!this.isfetching) {
  //     let footEl = document.getElementById('footer');
  //     if (window.innerHeight + window.scrollY >= document.body.offsetHeight - footEl.offsetHeight 
  //       && this.lastScroll < (window.innerHeight + window.scrollY)) {
  //       this.lastScroll = window.innerHeight + window.scrollY;
  //       if (this.count.profile >= 20) {
  //         //this.param.start += 20;
  //         //this.disableScrollbtn();
  //         //this.showloader = true;
  //         this.getCoeDataSerach(this.slug);
  //       }
  //     }
  //   }
  // }

  @HostListener('window:scroll', ['$event'])

  onScrollEvent($event){
    if (!this.isfetching) {
      let footEl = document.getElementById('footer');
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight - footEl.offsetHeight 
        && this.lastScroll < (window.innerHeight + window.scrollY)) {
        this.lastScroll = window.innerHeight + window.scrollY;
        if (this.count.profile >= 20 && this.dataFound) {
            this.params.start += 20;
            this.showloader = true; 
            this.isfetching = true;
            this.setFlag = true;     
            this.getCoeDataSerach(this.params.where ._id);
        }
      }
    }    
    
  }
  getAllData(slug) {    
    this.coeservice.getNewCOEQuery().valueChanges.subscribe(res => {
      this.newCoeData = res.data.coes;
      let slugId;
    this.newCoeData.forEach(e => {     
      if (e.type == slug) {
        slugId = e.id;
      }
    }) 
    this.getCoeDataSerach(slugId);     
    });
  }
  getCoedNames(key) {
    this.coeservice.getNewCOEQuery().valueChanges.subscribe(res => {
      this.imageIcons = ['mdi-palette','mdi-database','mdi-cloud-check','mdi-apps','mdi-apple-mobileme',]; 
      let tempData;
      tempData = res.data.coes;
      tempData.forEach(e => {
        this.coeNames.push(e.type);
        this.coeNames.reverse();
        this.selectedIndex = this.coeNames.indexOf(key);
      });
    });
  }
  coeClickData(slug) {

    if(this.slug != slug){
    this.router.navigate(['/coe/', slug]);
    let slugId;
    this.newCoeData.forEach(e => {     
      if (e.type == slug) {
        slugId = e.id;
      }
    })
    this.getCoeDataSerach(slugId);
  }
    //this.getAllData(slug);
  }
  setIndex(index: number) {
    this.selectedIndex = index;
  }
  onSelect(data: TabDirective): void {
    this.value = data.heading.toLowerCase();
    if (this.value.search('blog') !== -1) {
      this.masonryLayout = true;
    }
  }

  ngOnDestroy(): void {
    this._onDestroy.next();
    this._onDestroy.complete();
  }
}
