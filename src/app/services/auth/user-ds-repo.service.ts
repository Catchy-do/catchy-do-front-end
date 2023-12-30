import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserDsRepoService {
  

  constructor() { }
  
  public getUserName(){
    return localStorage.getItem('username');
    
   }
   public setUserName(username:string){
    localStorage.setItem('username',username);
   }
   public setPrenom(prenom:string){
    localStorage.setItem('prenom',prenom);
   }
   public setCountry(country:string){
    localStorage.setItem('country',country);
   }
   public setProfession(profession:string){
    localStorage.setItem('profession',profession);
   }
   public setPhoneNumber(phoneNumber:string){
    localStorage.setItem('phoneNumber',phoneNumber);
   }
   public setEmail(email:string){
    localStorage.setItem('email',email);
   }
   public getPassword(){
    return localStorage.getItem('password');
   }
   public setPassword(password:string){
    localStorage.setItem('password',password);
   }
   public removeToken() {
    localStorage.removeItem('token');
   }
   public removeUserName(){
    localStorage.removeItem('username');
   }
   public removePassword() {
    localStorage.removeItem('password');
   }
   remoseUserInfo() {
    localStorage.removeItem('userInfo');
  }
}
