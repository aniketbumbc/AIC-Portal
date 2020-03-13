import { Component, OnInit, Input, OnChanges, Output, ViewChild, ElementRef } from '@angular/core';
import { TabsetComponent } from 'ngx-bootstrap/tabs';
@Component({
  selector: 'app-skill-matrix',
  templateUrl: './skill-matrix.component.html',
  styleUrls: ['./skill-matrix.component.scss'],
})
export class SkillMatrixComponent implements OnChanges {
  @Input() skillData: any;
  @Input() pageEditableInfo: Boolean;
  @Input() userSkills: any;
  @ViewChild('search') searchInput: ElementRef;
  @ViewChild('tabset') tabset :TabsetComponent;
  ngOnChanges() {
    if (this.skillData) {
      this.formatSkillsData();
    }
  }
  formatSkillsData() {
    let skillValues = JSON.parse(JSON.stringify(this.skillData));
    let filtered = skillValues.filter(function (data) {
      if (data.technologies[0].length != 0) {
        return true;
      }
    });
    this.skillData = filtered;
  }

  // #closing search bar 
  // searchBarClose() {
  //   if(this.searchInput.nativeElement.value){
  //     this.searchInput.nativeElement.style.width="200px";
  //   } else{
  //     this.searchInput.nativeElement.style.width="20px";
  //     this.searchInput.nativeElement.style.padding-left= "35px"
  //   }
  // }

  // checking skills value are selected or not............ 
  selectedSkill(value: string, type: string) {
    if (this.userSkills[type] === undefined) {
      this.userSkills[type] = [];
    }
    if (this.userSkills[type].indexOf(value) > -1) {
      this.userSkills[type].splice(this.userSkills[type].indexOf(value), 1);
    }
    else {
      Object.keys(this.userSkills).forEach(element => {
        if (type == element) {
          this.userSkills[element].push(value)
        }
      });
    }
  }

  onSearchChange(text) {
    let skillValues = JSON.parse(JSON.stringify(this.skillData)),
        selectedArray = [];
      skillValues.map((elem)=> {
      if (elem.technologies.find(a => a.toLowerCase().includes(text.toLowerCase()))) {
        selectedArray.push(elem.type);
      } 
    });
    if(selectedArray.length>0){
      this.tabset.tabs.map((tab,index)=>{
        if(tab.id==selectedArray[0]){
          tab.active=true;
        }
      })
    } else {
      this.tabset.tabs[0].active=true;
    }
  }
}
