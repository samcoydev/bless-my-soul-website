import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { BehaviorSubject, Observable, of, Subject } from 'rxjs';
import { tap, catchError, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { RoleType } from 'src/app/helpers/enums/role-type';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private url = environment.apiUrl + '/user';
  
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;

  private usersUpdatedSource = new Subject<string>();
  usersUpdated$ = this.usersUpdatedSource.asObservable();

  constructor(
    private httpClient: HttpClient,
    private router: Router
    ) {
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(String(localStorage.getItem('user'))));
    this.currentUser = this.currentUserSubject.asObservable();
  }
  
  announceUsersUpdated(message: string): void {
    console.log(message);
    this.usersUpdatedSource.next(message);
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  public isSessionAuthenticated(): boolean {
    let user = localStorage.getItem('user');
    if (user) {
      console.log("[SESSION-AUTHED] ", true);
      return true;
    }

    console.log("[SESSION-AUTHED] ", false);
    return false
  }

  getAllUsers(): Observable<User[]> {
    return this.httpClient.get<User[]>(this.url);
  }

  getUserByID(id: number): Observable<User> {
    return this.httpClient.get<User>(this.url + '/' + `${id}`);
  }

  register(user: User): Observable<User> {
    return this.httpClient.post<User>(this.url, user).pipe(
      tap((newUser: User) => {
        this.announceUsersUpdated('Users updated - New Record');
      }));
  }
  
  login(email: string, password: string): Observable<User> {
    // TODO: Fix this mess
    return this.httpClient.post<User>(this.url + '/authenticate', {email, password}).pipe(
      tap((user: User) => {
        if (user) {
          localStorage.setItem('user', JSON.stringify(user));
          this.currentUserSubject.next(user);
          console.log("Login authorized: ", user);
          return user;
        }
        console.log("Login not authorized.");
        return null;
    }));
  }
  
  deleteUser(id: number): Observable<Object> {
    return this.httpClient.delete(this.url + '/' + `${id}`)
      .pipe(map(deletedUser => {
        // Log the user out if they deleted their own record.
        if (id == this.currentUserValue.id) {
            this.logout();
        }
        return deletedUser;
      }));
  }

  logout(): void {
    localStorage.removeItem('user');
    this.currentUserSubject.next({id: -1, password: '', firstname: '', lastname: '', email: '', role: RoleType.User});
    this.router.navigate(['/account/login']);
  }

}
