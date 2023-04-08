import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { USER_LOGIN_URL, USER_PROFILE_URL, USER_REGISTER_URL } from '../shared/constants/urls';
import { IUserLogin } from '../shared/interfaces/IUserLogin';
import { User } from '../shared/models/User';
import { IUserRegister } from '../shared/interfaces/IUserRegister';

const USER_KEY = 'user'
@Injectable({
  providedIn: 'root'
})
export class UserService {
  private userSubject = new BehaviorSubject<User>(this.getUserFromLocalStorage())
  private userLoginSubject = new BehaviorSubject<boolean>(localStorage.getItem('user')? true : false)
  public userLogin!: Observable<boolean>
  public userObservable!: Observable<User>
  constructor(private http: HttpClient, private toastr: ToastrService) {
    this.userObservable = this.userSubject.asObservable();
    this.userLogin = this.userLoginSubject.asObservable()
  }

  public get currentUser(): User {
    return this.userSubject.value 
  }

  login(userLogin: IUserLogin): Observable<User> {
    return this.http.post<User>(USER_LOGIN_URL, userLogin).pipe(
      tap({
        next: (user) => {
          this.setUserToLocalStorage(user);
          this.userLoginSubject.next(true)
          this.userSubject.next(user);
          this.toastr.success(
            `Welcome to Foodmine ${user.name}`,
            'Login Successful!'
          )
        },
        error: (errorResponse) => {
          console.log(errorResponse.error.text);

          this.toastr.error(errorResponse.error, 'Login Failed')
        }
      })
    )
  }

  logout() {
    this.userSubject.next(new User())
    localStorage.removeItem(USER_KEY)
    window.location.reload()
  }

  private setUserToLocalStorage(user: User) {
    localStorage.setItem(USER_KEY, JSON.stringify(user));
  }

  private getUserFromLocalStorage(): User {
    const userJson = localStorage.getItem(USER_KEY);
    if (userJson) return JSON.parse(userJson) as User;
    return new User()
  }

  register(userRegister: IUserRegister): any{
    console.log(userRegister)
    return this.http.post<User>(USER_REGISTER_URL, userRegister).pipe(
      tap({
        next: (user) => {
          this.setUserToLocalStorage(user);
          this.userLoginSubject.next(true)
          this.userSubject.next(user);
          this.toastr.success(
            `Welcome to Foodmine ${user.name}`,
            'Login Successful!'
          )
        },
        error: (errorResponse) => {
          console.log(errorResponse.error);

          this.toastr.error(errorResponse.error, 'Login Failed')
        }
      })
    ).subscribe()
  }

  getUserProfie(id: number): Observable<User>{
    return this.http.get<User>(USER_PROFILE_URL + id)
  }

  
}
