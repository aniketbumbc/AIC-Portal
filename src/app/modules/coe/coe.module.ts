import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoeComponent } from './coe/coe.component';
import { CoeRoutingModule } from './coe.routing';
import { SharedModule } from '@app/shared';
import { CoeDataComponent } from './coe-data/coe-data.component';
import {CoeService} from './services/coe.service';
import { TabsModule } from 'ngx-bootstrap';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';


@NgModule({
    declarations: [CoeComponent, CoeDataComponent],
    imports: [
        CommonModule,       
        CoeRoutingModule,
        SharedModule,
        TabsModule,
        InfiniteScrollModule
    ],
    exports: [CoeComponent, InfiniteScrollModule],
    providers: [CoeService]
})
export class CoeModule { }
