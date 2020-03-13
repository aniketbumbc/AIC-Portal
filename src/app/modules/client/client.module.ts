import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CKEditorModule } from 'ng2-ckeditor';
import { SelectDropDownModule } from 'ngx-select-dropdown';
import { ClientRoutingModule } from './client.routing';
import { ClientComponent } from './pages/client/client.component';
import { ClientEditComponent } from './pages/client-edit/client-edit.component';
import { ClientDetailComponent } from './pages/client-detail/client-detail.component';
import { SharedModule } from '@app/shared';
import {NgxPaginationModule} from 'ngx-pagination'; 
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { ToastmsgService } from '@app/shared/services/toastmsg.service';
import { ClientService } from './service/client.service';
import { ClientCreateComponent } from './pages/client-create/client-create.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { ToastModule } from "primeng/toast";
@NgModule({
  declarations: [ClientComponent, ClientDetailComponent,ClientEditComponent, ClientCreateComponent],
  imports: [
    SharedModule,
    CommonModule,
    ClientRoutingModule,
    CKEditorModule,
    SelectDropDownModule,
    NgxPaginationModule,
    FormsModule,
    ReactiveFormsModule,
    NgSelectModule,
    ToastModule
  ],
  exports: [ClientComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers:[MessageService,ToastmsgService,ClientService]

})
export class ClientModule { }
