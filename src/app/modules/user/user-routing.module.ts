import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserLoginComponent } from 'src/app/components/user-login/user-login.component';
import { UserRegisterComponent } from 'src/app/components/user-register/user-register.component';
import { UserListComponent } from 'src/app/components/user-list/user-list.component';
import { UserComponent } from 'src/app/components/user/user.component';
import { AdminGuard } from 'src/app/guards/admin/admin.guard';

const routes: Routes = [
  { path: 'register', component: UserRegisterComponent },
  { path: 'login', component: UserLoginComponent },
  { path: 'list', component: UserListComponent, canActivate: [AdminGuard] },
  { path: 'id/:userId', component: UserComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
