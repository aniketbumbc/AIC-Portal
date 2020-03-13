import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CoeComponent } from './coe/coe.component';
import { CoeDataComponent } from './coe-data/coe-data.component';

export const routes: Routes = [
    {
        path: '',
        component: CoeDataComponent
    },
    {
        path: ':slug',
        component: CoeDataComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class CoeRoutingModule { }
