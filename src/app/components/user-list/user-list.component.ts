import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  users: User[] = [];
  users$: Observable<User[]> = new Observable;
  filter = new FormControl('');

  constructor(private userService: UserService) { 
    this.users$ = this.filter.valueChanges.pipe(startWith(''), map(text => this.search(text)));
  }

  userListSubscription = new Subscription;

  ngOnInit(): void {
    this.userListSubscription = this.userService.usersUpdated$.subscribe(message => {
      this.getUsers();
    });

    this.getUsers();
  }

  getUsers(): void {
    this.userService.getAllUsers()
      .subscribe(response => {
        this.users = response;
        console.log(this.users);
      })
  }

  search(text: string): User[] {
    return this.users.filter(user => {
      const term = text.toLowerCase();
      return user.username.toLowerCase().includes(term)
    });
  }

}
