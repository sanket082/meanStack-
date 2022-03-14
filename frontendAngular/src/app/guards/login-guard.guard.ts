import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { CookieService } from 'ngx-cookie';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {

  constructor(private cookie: CookieService, private route: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    // Gets the cookie 'token' which stores the session hash of the user's login
    let token = this.cookie.get('token');

    // If, the token is null or empty, then don't allow the user to activate any route connected to the guard
    if (token && token.valueOf() != '') {
      return true;
    } else {
      this.route.navigate(['login']);
      return false;
    }
  }
}
