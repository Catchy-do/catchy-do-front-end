import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {AUTH_URL} from 'src/environments/environment';
import { AuthUserDetails } from './user-detail';
import { AuthBody } from './authBody';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public username: String | any;
  public password: String | any;
 
  constructor(private httpClient: HttpClient) { 
    
 
  }


  private getFormUrlEncoded(toConvert:any) {
    const formBody = [];
    // tslint:disable-next-line:forin
    for (const property in toConvert) {
    const encodedKey = encodeURIComponent(property);
    const encodedValue = encodeURIComponent(toConvert[property]);
    formBody.push(encodedKey + '=' + encodedValue);
    }
    return formBody.join('&');
  }

  public authenticate(username:string, password:string) {
    let headers: HttpHeaders;
    headers = new HttpHeaders();
     let data = new AuthBody()
     data.password=password;
     data.username=username;
    return this.httpClient.post<AuthUserDetails>(AUTH_URL, data );
    
  }
 

}
