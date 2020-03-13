import { Component, OnInit, ViewChild } from "@angular/core";
import { SkillsMatrixService } from "../../service/skills-matrix.service";
import { SkillMatrixComponent } from "@app/shared/components/skill-matrix/skill-matrix.component";

@Component({
  selector: "app-skills-matrix-list",
  templateUrl: "./skills-matrix-list.component.html",
  styleUrls: ["./skills-matrix-list.component.scss"]
})
export class SkillsMatrixListComponent implements OnInit {
  skillMatrics: any;
  skillsArray: any;
  breadCrumb = [
    {
      label: "Home",
      url: "/home",
      isActive: false
    },
    {
      label: "Skills Matrix",
      url: "/skills-matrix",
      isActive: true
    }
  ];
  // @ViewChild(SkillMatrixComponent) selectedProjectTechStack;
  constructor(private skillsMatrixService: SkillsMatrixService) {}

  ngOnInit() {
    this.getSkillsList();
  }

  getSkillsList() {
    this.skillsMatrixService.getSkillsMatrix().subscribe(response => {
      this.skillMatrics = response;
      const techStack = Object.keys(this.skillMatrics);
      this.skillsArray = [];
      for (const key in this.skillMatrics) {
        if (key) {
          const technology = [];
          for (const obj in this.skillMatrics[key]) {
            if (obj) {
              technology.push(`${obj} - ${this.skillMatrics[key][obj]}`);
            }
          }
          this.skillsArray.push({ type: key, technologies: technology });
        }
      }
      console.log("final", this.skillsArray);
    });
  }
}
