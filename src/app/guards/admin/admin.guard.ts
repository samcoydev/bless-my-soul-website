import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { RoleType } from 'src/app/helpers/role';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user/user.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  
  private currentUser: User = new User;
  
  constructor(
    private userService: UserService,
    private router: Router) {}
    
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if (this.currentUser.role != RoleType.Admin) {
      window.alert('Access Denied. Only the admin can see this page.')
      this.router.navigate(['user/login'])
    }
    if(this.userService.isSessionAuthenticated() !== true) {
      window.alert('Access Denied. A login is required to access this page.')
      this.router.navigate(['user/login'])
    }
    return true;
  }
  
}
