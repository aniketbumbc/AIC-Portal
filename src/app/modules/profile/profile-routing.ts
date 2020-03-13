import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProfileDetailComponent } from './pages/profile-detail/profile-detail.component';
import { ProfileEditComponent } from './pages/profile-edit/profile-edit.component';
import { ProfileComponent } from './pages/profile/profile.component';

export const routes: Routes = [
  {
    path: '',
    component: ProfileComponent,
  },
  {
    path: ':slug',
    component: ProfileDetailComponent,
  },
  {
    path: ':slug/edit',
    component: ProfileEditComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProfileRoutingModule {}
