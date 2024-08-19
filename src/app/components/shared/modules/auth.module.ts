import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from '../../auth/login/login.component';
import { RegistrationComponent } from '../../auth/registration/registration.component';
import { AuthRoutingModule } from '../../auth/auth-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { AuthService } from '../services/auth.service';

@NgModule({
  declarations: [LoginComponent, RegistrationComponent],
  imports: [
    CommonModule,
    AuthRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [AuthService],

})
export class AuthModule { }
