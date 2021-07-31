import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user/user.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  user = new User();

  constructor(
    private userService: UserService,
    private location: Location,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    const routeParams = this.route.snapshot.paramMap;
    const userIdFromRoute = Number(routeParams.get('userId'));

    this.getUser(userIdFromRoute);
  }

  getUser(id: number) {
    this.userService.getUserByID(id)
      .subscribe(response => {
        this.user = response;
      });
  }

  deleteUser(): void {
    this.userService.deleteUser(this.user.id)
      .subscribe(error => console.log(error));
    this.location.back();
  }

}
