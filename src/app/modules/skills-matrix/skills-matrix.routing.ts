import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { SkillsMatrixListComponent } from "./pages/skills-matrix-list/skills-matrix-list.component";

const routes: Routes = [
  {
    path: "",
    children: [
      {
        path: "",
        component: SkillsMatrixListComponent
      }
    ]
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SkillsMatrixRoutingModule {}
