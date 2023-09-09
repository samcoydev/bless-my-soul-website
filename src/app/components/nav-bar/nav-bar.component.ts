import { Component, OnInit } from '@angular/core';
import { RoleType } from 'src/app/helpers/enums/role-type';
import { User } from 'src/app/models/user.model';
import { BreakpointService } from 'src/app/services/breakpoint/breakpoint.service'
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  public showAdminMenus = false;
  public isLoggedIn = false;
  private currentUser: User = {id: -1, password: '', firstname: '', lastname: '', email: '', role: RoleType.User};

  constructor(
    private userService: UserService,
    private breakpointService: BreakpointService
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

  getIsLargerScreen() {
    return this.breakpointService.getIsLargerScreen();
  }

}
