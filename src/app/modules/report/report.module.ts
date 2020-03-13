import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReportRoutingModule } from './report.routing';
import { SkillComponent } from './pages/skill/skill.component';
import { SharedModule } from '@app/shared';

@NgModule({
  declarations: [
    SkillComponent
  ],
  imports: [
    CommonModule,
    ReportRoutingModule,
    SharedModule
  ]
})
export class ReportModule { }
