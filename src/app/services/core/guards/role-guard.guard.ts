import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { UserTokenService } from '../../auth/user-token.service';
import { AuthUserDetails } from '../../auth/user-detail';


@Injectable({
  providedIn: 'root'
})
export class RoleGuardGuard implements CanActivate {
  
  constructor(public auth: UserTokenService){}
  
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.isAuth(route);
  }


  isAuth(route: ActivatedRouteSnapshot): boolean{
    let td = this.auth.getFullTokenDetails() as AuthUserDetails;
    let roles = td.roles[1];
    //localStorage.setItem('aaaa', td.roles)

    let expectedRoles = route.data['expectedRoles'];
    // const roleMatches = roles.findIndex( (rol: any) => expectedRoles.indexOf(rol) !== -1)
    // return (roleMatches < 0 ) ? false : true;
    return roles = expectedRoles;
  }
  
}
