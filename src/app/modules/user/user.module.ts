import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserLoginComponent } from 'src/app/components/user-login/user-login.component';
import { UserRegisterComponent } from 'src/app/components/user-register/user-register.component';
import { UserRoutingModule } from './user-routing.module';
import { UserTableComponent } from 'src/app/components/user-table/user-table.component';
import { ReactiveFormsModule } from '@angular/forms';
import { UserComponent } from 'src/app/components/user/user.component';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    UserComponent,
    UserTableComponent,
    UserLoginComponent,
    UserRegisterComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class UserModule { }
