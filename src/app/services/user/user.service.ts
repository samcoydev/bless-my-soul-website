import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from 'src/app/models/user';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { tap, catchError, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private url = environment.apiUrl + '/users';
  
  private userSubject!: BehaviorSubject<User>;
  public user!: Observable<User>;

  constructor(
    private httpClient: HttpClient,
    private router: Router) {
    this.userSubject = new BehaviorSubject<User>(JSON.parse(String(localStorage.getItem('user'))));
    this.user = this.userSubject.asObservable();
  }

  getAllUsers(): Observable<User[]> {
    return this.httpClient.get<User[]>(this.url);
  }

  getUserByID(id: number): Observable<User> {
    return this.httpClient.get<User>(this.url + '/' + `${id}`);
  }

  register(user: User): Observable<User> {
    return this.httpClient.post<User>(this.url, user).pipe(
      tap((newUser: User) => console.log(`Posted User: ${newUser.id}`)),
      catchError(this.handleError<User>('registerUser'))
    );
  }
  
  login(username: string, password: string): Observable<User> {
    return this.httpClient.post<User>(this.url + '/authenticate', { username, password})
      .pipe(map(user => {
                localStorage.setItem('user', JSON.stringify(user));
                this.userSubject.next(user);
                console.log("Login authorized: ", user);
                return user;
      }));
  }

  logout(): void {
    this.resetUser();
    this.router.navigate(['/account/login']);
  }
  
  deleteUser(id: number): Observable<Object> {
    return this.httpClient.delete(this.url + '/' + `${id}`)
      .pipe(map(deletedUser => {
        // Log the user out if they deleted their own record.
        if (id == this.userValue.id) {
            this.logout();
        }
        return deletedUser;
      }));
  }

  resetUser(): void {
    localStorage.removeItem('user');
    this.userSubject.next(new User);
  }

  public get userValue(): User {
    return this.userSubject.value;
  }

  private handleError<T>(operation = 'Operation', result?: T) {
    return (error: any): Observable<T> => {

      console.error(error);

      console.log(`${operation} Failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
