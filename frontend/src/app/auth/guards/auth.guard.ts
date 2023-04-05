import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from '../../services/user.service';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  userLogin!: boolean

  constructor(private userService: UserService, private router: Router, private toastr: ToastrService){
    this.userService.userLogin.subscribe(login => this.userLogin = login)
  }


  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if(!this.userLogin) {
        this.toastr.warning('Please login to procceed!')
        return false
      } else {
        return true
      }
  }
  
}
