import { NgModule, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SkillMatrixComponent } from './components/skill-matrix/skill-matrix.component';
import { BreadcrumbsComponent } from './components/breadcrumbs/breadcrumbs.component';
import { TabsModule, TooltipModule, BsDatepickerModule } from 'ngx-bootstrap';
import { ProjectListComponent } from './components/project-list/project-list.component';
import { BlogListGridComponent } from './components/blog-list-grid/blog-list-grid.component';
import { BlogListMasonryComponent } from './components/blog-list-masonry/blog-list-masonry.component';
import { ProfileListComponent } from './components/profile-list/profile-list.component';
import { ScrollToTopComponent } from './components/scroll-to-top/scroll-to-top.component';
import { TrimPipe } from './pipe/trim.pipe';
import { ImageComponent } from './components/image/image.component';
import { AvatarModule } from 'ngx-avatar';
import { NgxMasonryModule } from 'ngx-masonry';
import { SelectDropDownModule } from 'ngx-select-dropdown';
import { ToastModule } from 'primeng/toast';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FilterPipe } from './pipe/filter.pip';
import { UserNamePipe } from './pipe/name.pipe';
import { ImageCropperModule } from 'ngx-image-cropper';
import { UploadImageComponent } from './components/uploadImage/uploadimage.component';
import { CKEditorModule } from 'ng2-ckeditor';
import { CalendarModule } from 'primeng/calendar';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { FprojectComponent } from './components/fproject/fproject.component';
import { FblogComponent } from './components/fblog/fblog.component';
import { NewjoineeComponent } from './components/newjoinee/newjoinee.component';
import { UserBlogsComponent } from './components/user-blogs/user-blogs.component';
import { UserProjectsComponent } from './components/user-projects/user-projects.component';
import { LocProfilesComponent } from './components/loc-profiles/loc-profiles.component';
import { ChartsModule } from 'ng2-charts';
import { FetchDetailsApi } from './services/fetchDetails.service';
import { TagInputModule } from 'ngx-chips';
import { AddMoreComponent } from './components/add-more/add-more.component';
import { MessageService } from 'primeng/api';
import { ToastmsgService } from './services/toastmsg.service';
import { NgSelectModule } from '@ng-select/ng-select'
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import { CustomDirectivesModule } from '../shared/directives/custom-directives.module';

// import { NewBlogComponent } from '@app/modules/blog/pages/new-blog/new-blog.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    NgxMasonryModule,
    TabsModule.forRoot(),
    TooltipModule.forRoot(),
    SelectDropDownModule,
    AvatarModule,
    InfiniteScrollModule,
    FormsModule,
    ImageCropperModule,
    ReactiveFormsModule,
    CKEditorModule,
    BsDatepickerModule.forRoot(),
    ToastModule,
    CalendarModule,
    AutoCompleteModule,
    ChartsModule,
    TagInputModule,
    NgSelectModule,
    ConfirmDialogModule,
    CustomDirectivesModule
  ],
  declarations: [
    ImageComponent,
    SkillMatrixComponent,
    BreadcrumbsComponent,
    ProjectListComponent,
    BlogListGridComponent,
    BlogListMasonryComponent,
    ProfileListComponent,
    ScrollToTopComponent,
    TrimPipe,
    FilterPipe,
    UserNamePipe,
    UploadImageComponent,
    FprojectComponent,
    FblogComponent,
    NewjoineeComponent,
    UserBlogsComponent,
    UserProjectsComponent,
    LocProfilesComponent,
    AddMoreComponent,
    // NewBlogComponent
  ],
  exports: [
    CommonModule,
    SkillMatrixComponent,
    BreadcrumbsComponent,
    ScrollToTopComponent,
    ProjectListComponent,
    BlogListGridComponent,
    BlogListMasonryComponent,
    ImageComponent,
    ProfileListComponent,
    AvatarModule,
    TrimPipe,
    InfiniteScrollModule,
    UserNamePipe,
    UploadImageComponent,
    FprojectComponent,
    FblogComponent,
    NewjoineeComponent,
    UserProjectsComponent,
    UserBlogsComponent,
    AddMoreComponent,
    LocProfilesComponent,
    CustomDirectivesModule
  ],
  providers: [FetchDetailsApi, MessageService, ToastmsgService],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
})
export class SharedModule { }
