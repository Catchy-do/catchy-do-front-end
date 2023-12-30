import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SERVER_URL } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MenteeServicesService {

  constructor(private httpService: HttpClient) {}
  

  public getUserProfile(userID:number){
    let params = new HttpParams()
    params = params.append('userID', userID);
    return this.httpService.get(SERVER_URL +'/catchy/getUserProfil', { params: params });
  }

  public updateUserProfile(userBody: any){
    return this.httpService.patch(SERVER_URL +'/catchy/updUser',  userBody);
  }
  
  public getMentors() {
    let params = new HttpParams()
    params = params.append('type', 'Mentor');
    return this.httpService.get(SERVER_URL + '/catchy/getUserList', { params: params });
  }
  
  public searchMentors(sexe:string,compID:number[]) {
    let params = new HttpParams()
    params = params.set('sexe', sexe);
    params = params.set('compID',compID.join(',') );
    return this.httpService.get(SERVER_URL + '/catchy/searchMentor', { params: params });
  }

  public getBookings(userID: number) {
    let params = new HttpParams()
    params = params.append('userId', userID);
    return this.httpService.get(SERVER_URL + '/catchy/getBookingsByMentee', { params: params });
  }
}
