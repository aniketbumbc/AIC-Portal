import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BlogDetailComponent } from './pages/blog-detail/blog-detail.component';
import { CreateBlogComponent } from './pages/create-blog/create-blog.component';
import { UpdateBlogComponent } from './pages/update-blog/update-blog.component';
import { BlogsComponent } from './pages/blogs/blogs.component';

export const routes: Routes = [
  {
    path: '',
    component: BlogsComponent,
  },
  {
    path: 'category/:category',
    component: BlogsComponent,
  },
  {
    path: ':slug',
    component: BlogDetailComponent,
  },
  {
    path:'create/blog', 
    component: CreateBlogComponent
  },
  {
    path:':slug/update',
    component:UpdateBlogComponent
  }
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BlogRoutingModule { }
