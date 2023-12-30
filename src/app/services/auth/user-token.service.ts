import { Injectable } from '@angular/core';

import { UserDsRepoService } from './user-ds-repo.service';
import { AuthUserDetails } from './user-detail';
import { UserInfo } from 'src/app/admin/model/userInfo';


@Injectable({
  providedIn: 'root'
})
export class UserTokenService {

   
  private usrDetails:AuthUserDetails | any;
  private access_token:string | any;
  private access_refresh_token:string | any;
  private expired_token_date:Date | any;
  private _isUserConnected:boolean | any;

  constructor(private usrDataStore:UserDsRepoService, private userInfo:UserInfo) {
    this.usrDetails=null;
    this._isUserConnected=false;
   
   }



   public getExpiredTokenDate(){
    return  this.expired_token_date;
   }

   public setExpireTokenDate(expireDate:Date){
    this.expired_token_date=expireDate;
   }

  public setFullTokenDetails(details:AuthUserDetails ){
    this.usrDetails=details;
  }

  public getFullTokenDetails() {
    return this.usrDetails;
  }
 
  public getAccessToken(){
    return this.access_token;
  }

  public setAccessToken(access_token:string){
    this.access_token=access_token;
  }
  public getUserName(){
    //return this.storage.get('username');
    //return this.username;
    return this.usrDataStore.getUserName();
   }
   public setUserName(username:string){
    //this.storage.set('username',username);
    this.usrDataStore.setUserName(username);
   }
   public setPrenom(prenom:string){
    this.usrDataStore.setPrenom(prenom);
   }
   
   public setCountry(country:string){
    this.usrDataStore.setCountry(country);
   }
   public setProfession(profession:string){
    this.usrDataStore.setProfession(profession);
   }
   public setPhoneNumber(phoneNumber:string){
    this.usrDataStore.setPhoneNumber(phoneNumber);
   }
   public setUserEmail(email:string){
    this.usrDataStore.setEmail(email);
   }
   
   public getPassword(){
    //return this.password;
    //return this.storage.get('password');
    return this.usrDataStore.getPassword();
   }
   public setPassword(password:string){
    //let cryptedPwd=this.dataSec.encrypt(password);
    //this.storage.set('password',cryptedPwd.toString());
    this.usrDataStore.setPassword(password);
   }
   public removeToken() {
     this.access_token=null;
     this.access_refresh_token=null;
     this.usrDetails=null;
     this.userInfo==null;
   }
   public removeUserName(){
    this.usrDataStore.removeUserName();
   }
   public removeUserInfo(){
    this.usrDataStore.remoseUserInfo();
   }
  
   public removePassword() {
    this.usrDataStore.removePassword();
   }

   public  isUserConnected(){
     return this._isUserConnected;
   }
   public setConnectedUser(status:boolean){
     this._isUserConnected=status;
   }
   public disconnectUser(){
     this._isUserConnected=false;
     this.removeToken();
   }

   public isTokenExpired(offsetSeconds?: number): boolean {
    let date = this.getExpiredTokenDate();//this.getTokenExpirationDate(token);
    let currentDate=new Date();
    offsetSeconds = offsetSeconds || 0;
    if (date == null) {
      return false;
    }
    /*console.log('Current Date : '+currentDate.valueOf());
    console.log('Expiration Date : '+date.valueOf());
    console.log('Diff  is : '+ (date.valueOf()-currentDate.valueOf())/1000 );*/

    // Token expired?
    return !(date.valueOf() > (currentDate.valueOf() + (offsetSeconds * 1000)));
  }
}
