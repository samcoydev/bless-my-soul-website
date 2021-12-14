import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { first } from 'rxjs/operators';
import { fader } from 'src/app/helpers/animations/fade.animation'
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css'],
  animations: [fader]
})
export class UserLoginComponent implements OnInit {

  isSubmitted = false
  isLoading = false

  userInfo = { email: '', password: '' }

  constructor(
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit(): void { }

  login(): void {
    this.isSubmitted = true
    this.isLoading = true

    this.userService.login(this.userInfo.email, this.userInfo.password)
      .pipe(first())
      .subscribe({
        next: () => {
          const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/'
          this.router.navigateByUrl(returnUrl)
        },
        error: error => {
          this.isLoading = false
        }
      })
  }

}
