import { Routes } from "@angular/router";
import { AuthGuard } from "@app/core";

export const CONTENT_ROUTES: Routes = [
  // {
  //   path: '',
  //   canActivate: [AuthGuard],
  //   loadChildren: './modules/home/home.module#HomeModule',
  // },
  {
    path: "",
    canActivate: [AuthGuard],
    loadChildren: "./modules/featured/featured.module#FeaturedModule"
  },
  {
    path: "client",
    canActivate: [AuthGuard],
    loadChildren: "./modules/client/client.module#ClientModule"
  },
  {
    path: "blog",
    canActivate: [AuthGuard],
    loadChildren: "./modules/blog/blog.module#BlogModule"
  },
  {
    path: "profile",
    canActivate: [AuthGuard],
    loadChildren: "./modules/profile/profile.module#ProfileModule"
  },
  {
    path: "report",
    canActivate: [AuthGuard],
    loadChildren: "./modules/report/report.module#ReportModule"
  },
  {
    path: "project",
    canActivate: [AuthGuard],
    loadChildren: "./modules/project/project.module#ProjectModule"
  },
  {
    path: "search",
    canActivate: [AuthGuard],
    loadChildren: "./modules/search/search.module#SearchModule"
  },
  {
    path: "skills-matrix",
    canActivate: [AuthGuard],
    loadChildren:
      "./modules/skills-matrix/skills-matrix.module#SkillsMatrixModule"
  }
  // {
  //   path: 'coe',
  //   canActivate: [AuthGuard],
  //   loadChildren: './modules/coe/coe.module#CoeModule'
  // }
];
