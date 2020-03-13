import { NgModule, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectComponent } from './pages/project/project.component';
import { ProjectRoutingModule } from './project-routing';
import { SharedModule } from '@app/shared';
import { ProjectQueryService } from './services/project.service';
// import { ProjectDetailComponent } from './pages/project-detail/project-detail.component';
import { TabsModule, TooltipModule, BsDatepickerModule } from 'ngx-bootstrap';
import { ProjectDetailComponent } from './pages/project-detail/project-detail.component';
import { ProjectEditComponent } from './pages/project-edit/project-edit.component';
import { FroalaEditorModule, FroalaViewModule } from 'angular-froala-wysiwyg';
import { ReactiveFormsModule } from '@angular/forms';
import { SelectDropDownModule } from 'ngx-select-dropdown';
import { CKEditorModule } from 'ng2-ckeditor'
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { ToastmsgService } from '../../shared/services/toastmsg.service';
import { CalendarModule } from 'primeng/calendar';
import {AutoCompleteModule} from 'primeng/autocomplete';
import { FormsModule } from '@angular/forms';
import { ProjectNewComponent } from './pages/project-new/project-new.component';
import { NgSelectModule } from '@ng-select/ng-select';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import {ProgressBarModule} from 'primeng/progressbar';
import { TagInputModule } from 'ngx-chips';



@NgModule({
  declarations: [
    ProjectComponent,
    ProjectDetailComponent,
    ProjectEditComponent,
    ProjectNewComponent,
    
  ],
  imports: [
    TagInputModule,
    SharedModule,
    TabsModule.forRoot(),
    CommonModule,
    ProjectRoutingModule,
    TooltipModule.forRoot(),
    FroalaEditorModule,
    FroalaViewModule,
    ReactiveFormsModule,
    FormsModule,
    SelectDropDownModule,
    CKEditorModule,
    BsDatepickerModule.forRoot(),
    CalendarModule,
    AutoCompleteModule,
    ToastModule,
    NgSelectModule,
    ConfirmDialogModule,
    ProgressBarModule
    
  ],
  exports: [ProjectComponent, ProjectDetailComponent],
  providers: [ProjectQueryService, MessageService, ToastmsgService],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
})
export class ProjectModule { }
