import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '@app/shared';
import { BlogRoutingModule } from './blog.routing';

import { CreateBlogQueryService } from './services/create-blog.service'; 
import { TooltipModule } from 'ngx-bootstrap';
import { NgxMasonryModule } from 'ngx-masonry';
import { SelectDropDownModule } from 'ngx-select-dropdown';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { TagInputModule } from 'ngx-chips';
import { CKEditorModule } from 'ng2-ckeditor';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { ToastmsgService } from '../../shared/services/toastmsg.service';
import { HttpLinkModule } from 'apollo-angular-link-http';
import { HttpClientModule } from '@angular/common/http';
import { CreateBlogComponent } from './pages/create-blog/create-blog.component'
import { UpdateBlogComponent } from './pages/update-blog/update-blog.component';
import { BlogsComponent } from './pages/blogs/blogs.component';
import { BlogDetailComponent } from './pages/blog-detail/blog-detail.component';
import { SafePipe } from './pages/blog-detail/safe.pipe';


@NgModule({
  declarations: [ CreateBlogComponent, UpdateBlogComponent, BlogsComponent, BlogDetailComponent, SafePipe],
  imports: [
    TagInputModule,
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    BlogRoutingModule,
    SelectDropDownModule,
    NgSelectModule,
    TooltipModule.forRoot(),
    CKEditorModule,
    ToastModule,
    HttpLinkModule,
    HttpClientModule,
    BlogRoutingModule,
    NgxMasonryModule
  ],
  exports: [BlogsComponent],
  providers: [ MessageService, ToastmsgService, CreateBlogQueryService],
})
export class BlogModule { }
