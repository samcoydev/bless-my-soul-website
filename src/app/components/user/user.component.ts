import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user/user.service';
import { Location } from '@angular/common';
import { RoleType } from 'src/app/helpers/enums/role-type';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  @Input() user: User = {id: -1, password: '', firstname: '', lastname: '', email: '', role: RoleType.User}

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private userService: UserService,
  ) { }

  ngOnInit(): void {
    const routeParams = this.route.snapshot.paramMap
    if (routeParams.get('userId')) {
      this.getUser(Number(routeParams.get('userId')))
    }
  }

  getUser(id: number): void {
    this.userService.getUserByID(id)
      .subscribe(response => this.user = response)
  }

  deleteUser(): void {
    this.userService.deleteUser(this.user.id)
      .subscribe(error => console.log(error))
    this.location.back()
  }

}
