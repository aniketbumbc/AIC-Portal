import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ClientComponent } from './pages/client/client.component';
import { ClientEditComponent } from './pages/client-edit/client-edit.component';
import{ClientCreateComponent} from './pages/client-create/client-create.component';
import{ClientDetailComponent} from './pages/client-detail/client-detail.component';

const routes: Routes = [
  {
    path: '',
    children:[
      {
        path:'',
        component: ClientComponent,
      },
      {
        path: 'detail/:id',
        component: ClientDetailComponent,
      },
      {
         path: 'edit/:id',
        component: ClientEditComponent,
      },
      {
        path: 'create',
       component: ClientCreateComponent,
     },      
    
    ],
  },
  ];
  
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientRoutingModule { }
