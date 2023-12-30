import { Injectable } from '@angular/core';
import { UserInfo } from 'src/app/admin/model/userInfo';

@Injectable({
  providedIn: 'root'
})
export class DataStorageService {

  constructor() { }


  public getItem(key:string){
    return localStorage.getItem(key);
    
   }
   public setItem(key:string,data:any){
    localStorage.setItem(key,data);
   }

   public getForm(key:string){
    return localStorage.getItem(key);
    
   }
   public setForm(key:string,searchbody:any){
    localStorage.setItem(key,JSON.stringify(searchbody));
   }
   public removeFromStorage(key:string){
    localStorage.removeItem(key);
   }
    public clearAllStorage(){
      localStorage.clear();
    
   }

   public setUserInfo(user:any){
    localStorage.setItem('userInfo',JSON.stringify(user));
   }
   public getUserInfo(){
    return JSON.parse(localStorage.getItem('userInfo')!);
    
   }
}
