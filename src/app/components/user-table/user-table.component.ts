import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { RoleType, RoleTypeLabelMapping } from 'src/app/helpers/enums/role-type'
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-user-table',
  templateUrl: './user-table.component.html',
  styleUrls: ['./user-table.component.css']
})
export class UserTableComponent implements OnInit {

  users: User[] = []
  users$: Observable<User[]> = new Observable
  filter: FormControl = new FormControl('')
  userListSubscription = new Subscription

  editedUser?: User
  selectedUserIds: number[] = []
  editUserId: number = -1

  roleTypeLabelMapping = RoleTypeLabelMapping;
  roles = Object.values(RoleType)

  constructor(private userService: UserService) { 
    this.users$ = this.filter.valueChanges.pipe(startWith(''), map(text => this.search(text)))
  }

  ngOnInit(): void {
    this.userListSubscription = this.userService.usersUpdated$.subscribe(message => {
      this.getUsers();
    });

    this.getUsers();
  }

  getUsers(): void {
    this.userService.getAllUsers()
      .subscribe(response => this.users = response)
  }

  onSelect(event: any, userId: number): void {
    if (event.target.checked) {
      this.selectedUserIds.push(userId)
    } else {
      this.selectedUserIds.splice(this.selectedUserIds.indexOf(userId), 1)
    }
  }

  viewUser(user: User) {
    this.editUserId = user.id
    this.editedUser = JSON.parse(JSON.stringify(user))
  }

  saveChanges(): void {
    console.log("Not Implemented")
  }

  deleteSelected(): void {
    console.log("Not Implemented")
  }

  search(text: string): User[] {
    const term = text.toLowerCase()
    return this.users.filter(user => {
      return user.email.toLowerCase().includes(term)
    })
  }

}
