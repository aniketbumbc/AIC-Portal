import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MessageService } from "primeng/api";
import { ToastmsgService } from "@app/shared/services/toastmsg.service";
import { SkillsMatrixRoutingModule } from "./skills-matrix.routing";
import { SkillsMatrixListComponent } from "./pages/skills-matrix-list/skills-matrix-list.component";
import { SkillsMatrixService } from "./service/skills-matrix.service";
import { SharedModule } from "../../shared/shared.module";

@NgModule({
  declarations: [SkillsMatrixListComponent],
  imports: [SkillsMatrixRoutingModule, SharedModule],
  exports: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [MessageService, ToastmsgService, SkillsMatrixService]
})
export class SkillsMatrixModule {}
