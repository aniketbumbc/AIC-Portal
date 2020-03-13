import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './pages/login/login.component';
import { AuthRoutingModule } from './auth.routing';
import { TokenComponent } from './pages/token/token.component';
import { LogoutComponent } from './pages/logout/logout.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginQueryService } from './services/auth.service';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';

@NgModule({
  declarations: [LoginComponent, TokenComponent, LogoutComponent],
  imports: [
    CommonModule,
    AuthRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    ToastModule
  ],
  providers: [LoginQueryService, MessageService]
})
export class AuthModule { }
