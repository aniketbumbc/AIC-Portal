import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './pages/home/home.component';
import { SharedModule } from '@app/shared';
import { HomeRoutingModule } from '@app/modules/home/home.routing';
import { HomeQueryService } from './services/home.service';
import { TooltipModule } from 'ngx-bootstrap';

@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    SharedModule,
    HomeRoutingModule,
    TooltipModule.forRoot()
  ],
  providers: [HomeQueryService]
})
export class HomeModule { }
