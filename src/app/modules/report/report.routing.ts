import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SkillComponent } from './pages/skill/skill.component';

export const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'skill',
        component: SkillComponent
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportRoutingModule { }
