import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
// import { ProjectDetailComponent } from './pages/project-detail/project-detail.component';

import { ProjectComponent } from './pages/project/project.component';
import { ProjectDetailComponent } from './pages/project-detail/project-detail.component';
import { ProjectEditComponent } from './pages/project-edit/project-edit.component';
import {ProjectNewComponent} from './pages/project-new/project-new.component'
export const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: ProjectComponent,
      },
      {
        path: ':id',
        component: ProjectDetailComponent,
      },
      {
        path: ':id/edit',
        component: ProjectEditComponent,
      },
      {
        path: 'new/project',
        component: ProjectNewComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProjectRoutingModule {}
