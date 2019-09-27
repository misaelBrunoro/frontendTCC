import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs/observable';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/take';

import { AuthService } from '../services/auth.service';
import { map } from 'rxjs-compat/operator/map';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private router: Router,
    private authService: AuthService
  ) {}

  canActivate( ): Promise<boolean | UrlTree> {
    // let activate = false;
    return this.authService.verifyToken( ).then(data => {
      if (!data['valid']) {
        this.router.navigate(['/login']);
      }
      return data['valid'];
    });
  }
}
