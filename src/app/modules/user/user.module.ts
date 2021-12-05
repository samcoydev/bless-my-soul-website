import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserLoginComponent } from 'src/app/components/user-login/user-login.component';
import { UserRegisterComponent } from 'src/app/components/user-register/user-register.component';
import { UserRoutingModule } from './user-routing.module';
import { UserListComponent } from 'src/app/components/user-list/user-list.component';
import { ReactiveFormsModule } from '@angular/forms';
import { UserComponent } from 'src/app/components/user/user.component';



@NgModule({
  declarations: [
    UserComponent,
    UserListComponent,
    UserLoginComponent,
    UserRegisterComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    ReactiveFormsModule
  ]
})
export class UserModule { }
