import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from 'src/app/components/login/login.component';
import { RegisterComponent } from 'src/app/components/register/register.component';
import { UserListComponent } from 'src/app/components/user-list/user-list.component';
import { UserComponent } from 'src/app/components/user/user.component';
import { AdminGuard } from 'src/app/guards/admin/admin.guard';
import { AuthGuard } from 'src/app/guards/auth/auth.guard';

const routes: Routes = [
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'list', component: UserListComponent, canActivate: [AdminGuard] },
  { path: 'id/:userId', component: UserComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
