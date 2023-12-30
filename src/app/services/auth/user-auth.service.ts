import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
import { UserTokenService } from './user-token.service';


@Injectable({
  providedIn: 'root'
})
export class UserAuthService {

  private loggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private userInfo: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  get isLoggedIn() {
    return this.loggedIn.asObservable();
  }

  get getUserInfo() {
    return this.userInfo.asObservable();
  }
  
  constructor(
    private router: Router,
    private user: UserTokenService
  ) {}

  login() {

    if (this.user.getAccessToken() != null) {
      this.loggedIn.next(true);
      this.router.navigate(['/acceuil']);
     // this.router.navigate(['/call']);
      //this.router.navigate(['/pdf2']);
    }
  }

  logout() {
    this.loggedIn.next(false);
    this.user.removeToken();
    this.user.removeUserInfo();
    this.user.setConnectedUser(false);
    this.router.navigate(['/login-page']);
  }
  setUserInfoDetails(user:any){
    this.userInfo.next(user);
  }
}
