import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SharedModule } from "@app/shared";
import { ProfileRoutingModule } from "./profile-routing";
import { ProfileDetailComponent } from "./pages/profile-detail/profile-detail.component";
import { ProfileQueryService } from "./services/profile.service";
import { ProfileComponent } from "./pages/profile/profile.component";
import { TabsModule } from "ngx-bootstrap";
import { ProfileEditComponent } from "./pages/profile-edit/profile-edit.component";
import { FroalaEditorModule, FroalaViewModule } from "angular-froala-wysiwyg";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { SelectDropDownModule } from "ngx-select-dropdown";
import { CKEditorModule } from "ng2-ckeditor";
import { MessageService } from "primeng/api";
import { ToastModule } from "primeng/toast";
import { ToastmsgService } from "../../shared/services/toastmsg.service";

@NgModule({
  declarations: [
    ProfileDetailComponent,
    ProfileComponent,
    ProfileEditComponent
  ],
  imports: [
    CommonModule,
    ProfileRoutingModule,
    SharedModule,
    TabsModule.forRoot(),
    FroalaEditorModule,
    FroalaViewModule,
    FormsModule,
    ReactiveFormsModule.withConfig({ warnOnNgModelWithFormControl: "never" }),
    SelectDropDownModule,
    CKEditorModule,
    ToastModule,
  ],
  providers: [ProfileQueryService, MessageService, ToastmsgService],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ProfileModule { }
