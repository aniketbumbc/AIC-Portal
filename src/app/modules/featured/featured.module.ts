import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@app/shared';
import { FprofileComponent } from './pages/fprofile/fprofile.component';
import { FeaturedRoutingModule } from '@app/modules/featured/featured-routing';

@NgModule({
  declarations: [FprofileComponent],
  imports: [
    CommonModule,
    SharedModule,
    FeaturedRoutingModule
  ],
  exports: []

})
export class FeaturedModule { }
