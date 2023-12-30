import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SERVER_URL } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class PublicServicesService {
  
 
  
  constructor(private httpService: HttpClient) {}


  public getUserProfile(userID:number){
    let params = new HttpParams()
    params = params.append('userID', userID);
    return this.httpService.get(SERVER_URL +'/catchy/getUserProfil', { params: params });
  }

  public updateUserProfile(userBody: any){
    return this.httpService.patch(SERVER_URL +'/catchy/updUser',  userBody);
  }

  public uploadImages(data:any){
    let httpOptions = {
      headers: new HttpHeaders({
  
          'Content-Type':'undefined',
          'Accept':'*/*'
          
      })
    };
    
    return this.httpService.post(SERVER_URL +'/uploadImage',data ,{
      reportProgress: true,
      observe: 'events'
    });
  }

  public uploadFiles(data:any){
    let httpOptions = {
      headers: new HttpHeaders({
  
          'Content-Type':'undefined',
          'Accept':'*/*'
          
      })
    };
    
    return this.httpService.post(SERVER_URL +'/uploadFiles',data ,{
      reportProgress: true,
      observe: 'events'
    });
  }



  public getAllPays(){
    return this.httpService.get(SERVER_URL+'/public/getAllPays');
  }
  getAllRegionByCountry(pID: number) {
    return this.httpService.get(SERVER_URL+'/public/getAllRegionByCapID/'+pID);
  }
  getPubVille(id: any) {
    return this.httpService.get(SERVER_URL+'/public/getVille/'+id);
  }
  addUSer(data:any) {
    return this.httpService.post(SERVER_URL+'/public/addUser',data);
  }
  public getAllCompetences(){
    return this.httpService.get(SERVER_URL+'/public/competencesList');
  }
 
}

