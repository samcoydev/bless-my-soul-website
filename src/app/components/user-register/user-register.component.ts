import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { RoleType } from 'src/app/helpers/role-type'
import { User } from 'src/app/models/user.model'
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.css']
})
export class UserRegisterComponent implements OnInit {

  newUserInfo: User = { id: -1, email: '', password: '', firstname: '', lastname: '', role: RoleType.User }

  isSubmitted = false
  isLoading = false

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService
    ) { }

  ngOnInit(): void { }

  registerUser(): void {
    this.isSubmitted = true
    this.isLoading = true

    this.userService.register(this.newUserInfo)
      .pipe(first())
      .subscribe({
        next: () => {
          this.router.navigate(['../login'], {relativeTo: this.route})
        },
        error: error => {
          this.isLoading = false
        }
      })
  }

}
