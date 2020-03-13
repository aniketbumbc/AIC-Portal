import { Component, OnInit, Input } from '@angular/core';
import { config } from '@app/configs/app.configs';
import { environment } from '@env/environment';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.scss']
})
export class ProjectListComponent implements OnInit {
  imageUrl: string;
  baseUrl: string;
  src: string;
  userImage: any;
  decached: any;
  @Input() projectList: any;
  @Input() fetchData: any;
  dm: any;
  constructor() { }

  ngOnInit() {
    this.baseUrl = config.AIC_URL;
    this.imageUrl = config.AIC_IMAGE_URL;
    this.userImage = environment.imageUrl;
    this.decached = config.DECACHED;
  }
  designationCheck(designation) {
    if (designation) {
      if (designation.toLowerCase() == "delivery manager") {
        return true;
      } else {
        return false;
      }
    }
    else return false;
  }
}
