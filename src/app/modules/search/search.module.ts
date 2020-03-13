import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchComponent } from './pages/search/search.component';
import { SearchRoutingModule } from './search.routing';
import { SharedModule } from '@app/shared';
import { TabsModule } from 'ngx-bootstrap';
import { SearchQueryService } from './service/search.service';
import { NgxSpinnerModule } from 'ngx-spinner';


@NgModule({
  declarations: [
    SearchComponent
  ],
  imports: [
    CommonModule,
    SearchRoutingModule,
    SharedModule,
    NgxSpinnerModule,
    TabsModule.forRoot()
  ],
  providers: []
})
export class SearchModule { }
