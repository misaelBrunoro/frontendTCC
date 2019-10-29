import { UserService } from './../services/user/user.service';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router, ActivatedRoute } from '@angular/router';

import { AuthService } from '../services/auth/auth.service';


import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private router: Router,
    private authService: AuthService,
    private userService: UserService
  ) {}

  canActivate( route: ActivatedRouteSnapshot, state: RouterStateSnapshot ) {
    return this.authService.verifyToken( ).then(ret => {
      if (ret.valid) {
        const currentUser = this.userService.currentUser();
        if (currentUser) {
          return currentUser.then(data => {
            console.log(route.data.tipo)
              if ((route.data && route.data.tipo) && route.data.tipo !== data.tipo) {
                this.router.navigate(['/graficos']);
                return false
              } else {
                return true;
              }
            });
        }
      }
      this.router.navigate(['/login']);
      return false
    });
  }
}
