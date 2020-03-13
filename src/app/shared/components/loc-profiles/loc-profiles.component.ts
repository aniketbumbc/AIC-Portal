import { Component, OnInit } from '@angular/core';
import { ChartType, ChartOptions } from 'chart.js';
import { ProfileLocationsService } from '../../home-page/services/profile-locations.service';
import { SingleDataSet, Label, monkeyPatchChartJsLegend, monkeyPatchChartJsTooltip } from 'ng2-charts';
import { from } from 'zen-observable';

@Component({
  selector: 'app-loc-profiles',
  templateUrl: './loc-profiles.component.html',
  styleUrls: ['./loc-profiles.component.scss']
})
export class LocProfilesComponent implements OnInit {
  public pieChartOptions: ChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    legend: {
      display: true,
      position: 'bottom',
      labels: {
        fontSize: 13,
        usePointStyle: true
      }
    },
  };

  public pieChartType: ChartType = 'pie';
  public pieChartLegend = true;
  public pieChartPlugins = [];
  public pieChartColors: Array<any> = [
    {
      backgroundColor: 
      ['#f7a35c','#1db2bd','#f54b0f','#001F3F','#3D9970','#c3a43d','#695999','#6e7214','#85144B','#3f87bd','#f15c80','#967000']
    }];
  public chartClicked(e: any): void {
  }
  public chartHovered(e: any): void {
  }
  constructor(private profileService: ProfileLocationsService) { }
  locationsProfiles: any;
  public locationsCount = [];
  public locationsNames = [];
  public locationsData:any
  ngOnInit() {
    this.getLocatiosProfiles();
  }


  getLocatiosProfiles() {
  
    this.profileService.getLocations().subscribe(res=>{
     this.locationsData = res;
     this.locationsData.map(e=>{
       for(let i in e){
         this.locationsNames.push(i);       
         this.locationsCount.push(e[i]);
       }
     })
   
     this.locationsNames.reverse();
     this.locationsCount.reverse();
    })
    
  }
  
}
