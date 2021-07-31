import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from 'src/app/components/login/login.component';
import { RegisterComponent } from 'src/app/components/register/register.component';
import { UserRoutingModule } from './user-routing.module';
import { UserListComponent } from 'src/app/components/user-list/user-list.component';
import { ReactiveFormsModule } from '@angular/forms';
import { UserComponent } from 'src/app/components/user/user.component';



@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    UserListComponent,
    UserComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    ReactiveFormsModule
  ]
})
export class UserModule { }
