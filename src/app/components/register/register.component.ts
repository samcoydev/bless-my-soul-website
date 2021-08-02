import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  newUserForm = new FormGroup({
    username: new FormControl('', [Validators.required, Validators.maxLength(20)]),
    password: new FormControl('', [Validators.required, Validators.minLength(3)]),
    firstname: new FormControl('', [Validators.required, Validators.maxLength(20)]),
    lastname: new FormControl('', [Validators.required, Validators.maxLength(20)]),
    email: new FormControl('', [Validators.required, Validators.email])
  });

  isSubmitted = false;
  isLoading = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService
    ) { }

  ngOnInit(): void {
  }

  get f() { return this.newUserForm.controls; }

  registerUser(): void {
    this.isSubmitted = true;

    if (this.newUserForm.invalid) 
      return;

    this.isLoading = true;

    this.userService.register(this.newUserForm.value)
      .pipe(first())
      .subscribe({
        next: () => {
          this.router.navigate(['../login'], {relativeTo: this.route});
        },
        error: error => {
          this.isLoading = false;
        }
      })
  }

}
