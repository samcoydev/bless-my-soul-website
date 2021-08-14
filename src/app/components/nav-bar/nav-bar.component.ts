import { Component, OnInit } from '@angular/core';
import { RoleType } from 'src/app/helpers/role-type';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  public showAdminMenus = false;
  public isLoggedIn = false;
  
  private currentUser: User = new User;

  constructor(
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.getCurrentUser();
  }

  updateVisibleMenus(): void {
    if (this.isLoggedIn){
      if (this.currentUser.role == RoleType.Admin)
        this.showAdminMenus = true;
    }
  }

  getCurrentUser(): void {
    this.userService.currentUser
      .subscribe(response => {
        this.currentUser = response;
        this.showAdminMenus = false;
        this.isLoggedIn = this.userService.isSessionAuthenticated();
        this.updateVisibleMenus();
      });
  }

  logout(): void {
    this.userService.logout();
  }

}
