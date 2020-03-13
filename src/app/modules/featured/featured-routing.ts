import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FprofileComponent } from './pages/fprofile/fprofile.component';

export const routes: Routes = [
    {
        path: '',
        children: [
            {
              path: '',
              component: FprofileComponent
            },
            {
              path: 'home',
              component: FprofileComponent
            }
          ]
    }
];
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class FeaturedRoutingModule { }