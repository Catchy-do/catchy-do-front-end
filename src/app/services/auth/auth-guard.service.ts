 import { Injectable } from '@angular/core';
 import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';
 import { UserTokenService } from './user-token.service';

 @Injectable({
   providedIn: 'root'
 })
 export class AuthGuardService implements CanActivate {
   constructor(public auth: UserTokenService, public router: Router ) {}
  
   

   canActivate(route: ActivatedRouteSnapshot){
    console.log('this.auth.isUserConnected()--------------------------------------------------------')
    console.log(this.auth.isUserConnected())
     if (!this.auth.isUserConnected()) {
       this.router.navigate(['/login-page']);
       return false;
     }
       return true;
    
   }


 }

