import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SERVER_URL } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MentorServicesService {

  constructor(private httpService: HttpClient) {}


  public updateUserProfile(userBody: any){
    return this.httpService.patch(SERVER_URL +'/catchy/updUser',  userBody);
  }

  public getUserProfile(userID:number){
    let params = new HttpParams()
    params = params.append('userID', userID);
    return this.httpService.get(SERVER_URL +'/catchy/getUserProfil', { params: params });
  }

  public getAppointmentss(userID: number) {
    let params = new HttpParams()
    params = params.append('userId', userID);
    return this.httpService.get(SERVER_URL + '/catchy/getAppoinByMentor', { params: params });
  }

  public ConfAppointmentss(data: any) {
    
    return this.httpService.put(SERVER_URL + '/catchy/confirmeAppointment', data);
  }
}

