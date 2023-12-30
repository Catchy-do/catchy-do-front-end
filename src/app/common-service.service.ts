import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { SERVER_URL } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CommonServiceService {
  public mentees: any = [
    {
      patientName: 'Richard Wilson',
      patient_id: 'P0016',
      apptDate: 'Sat May 23 2020 13:35:47 GMT+0530 (India Standard Time)',
      purpose: 'General',
      type: 'New mentee',
      email: 'richard@example.com',
      phone: '+1 923 782 4575',
      amount: 150,
      status: 0,
    },
    {
      patientName: 'Richard Wilson',
      patient_id: 'P0001',
      email: 'richard@example.com',
      apptDate: 'Sat May 23 2020 13:35:47 GMT+0530 (India Standard Time)',
      purpose: 'General',
      type: 'Old mentee',
      phone: '+1 828 632 9170',
      amount: 200,
      status: 0,
    },
    {
      patientName: 'Richard Wilson',
      patient_id: 'P0002',
      email: 'richard@example.com',
      apptDate: 'Sat May 23 2020 13:35:47 GMT+0530 (India Standard Time)',
      purpose: 'General',
      type: 'New mentee',
      phone: '+1 828 632 9170',
      amount: 350,
      status: 0,
    },
    {
      patientName: 'Richard Wilson',
      email: 'richard@example.com',
      patient_id: 'P0003',
      apptDate: 'Sat May 23 2020 13:35:47 GMT+0530 (India Standard Time)',
      purpose: 'General',
      type: 'New mentee',
      amount: 400,
      status: 0,
    },
  ];

  messages:any = '';
  SERVER_URL: string = 'https://dev.catchy-do.com/api/catchy/';
  message: BehaviorSubject<String>;
  constructor(public http: HttpClient) {
    this.message = new BehaviorSubject(this.messages);
  }
  public getAllCompetences(){
    return this.http.get(SERVER_URL+'/public/competencesList');
  }
  createAppointment(params:any) {
    return this.http.post(`${this.SERVER_URL + 'createAppointment'}`, params);
  }

  
  nextmessage(data:any) {
    this.message.next(data);
  }

  getJSON(): Observable<any> {
    // return this.http.get("./assets/data.json");
    return this.mentees;
  }

  update(id:any, status:any, list:any) {
    let filter = list.filter((a:any) => a.patient_id === id);
    if (filter.length != 0) {
      filter['status'] = status;
    }
  }

  getTags() {
    return this.http.get(this.SERVER_URL + 'tags');
  }

  getPositions() {
    return this.http.get(this.SERVER_URL + 'positions');
  }

  getSpeciality() {
    return this.http.get(SERVER_URL + 'specialityList');
  }

  createSpeciality(data:any) {
    return this.http.post(`${this.SERVER_URL + 'specialityList'}`, data);
  }

  updateSpeciality(data:any, id:any) {
    return this.http.put(`${this.SERVER_URL + 'specialityList'}/${id}`, data);
  }

  deleteSpeciality(id:any) {
    return this.http.delete(`${this.SERVER_URL + 'specialityList'}/${id}`);
  }

  public getMentors() {
    let params = new HttpParams()
    params = params.append('type', 'Mentor');
    return this.http.get(SERVER_URL + '/catchy/getUserList', { params: params });
  }

  public getMentees() {
    let params = new HttpParams()
    params = params.append('type', 'M');
    return this.http.get(SERVER_URL + '/catchy/getUserList', { params: params });
  }

  public validateMentor(confirmDTO: any){
    // let params = new HttpParams()
    // params = params.append('validate', validate);
    // params = params.append('userId', userId);
    return this.http.patch(SERVER_URL + '/catchy/validMentor', confirmDTO);

  }


  getDoctorDetails(id:any) {
    return this.http.get(`${this.SERVER_URL + 'mentors'}/${id}`);
  }

  getAppointments() {
    return this.http.get(this.SERVER_URL + 'appointments');
  }
  

  updateAppointment(data:any, id:any) {
    return this.http.put(`${this.SERVER_URL + 'appointments'}/${id}`, data);
  }

  getpatients() {
    return this.http.get(this.SERVER_URL + 'mentees');
  }

  createBlogs(data:any) {
    return this.http.post(`${this.SERVER_URL + 'blogs'}`, data);
  }

  getBlogs() {
    return this.http.get(this.SERVER_URL + 'blogs');
  }

  getBlogsDetails(id:any) {
    return this.http.get(`${this.SERVER_URL + 'blogs'}/${id}`);
  }

  updateBlog(data:any, id:any) {
    return this.http.put(`${this.SERVER_URL + 'blogs'}/${id}`, data);
  }

  deleteBlog(id:any) {
    return this.http.delete(`${this.SERVER_URL + 'blogs'}/${id}`);
  }

  createDoctor(data:any) {
    return this.http.post(`${this.SERVER_URL + 'mentors'}`, data);
  }

  createPatient(data:any) {
    return this.http.post(`${this.SERVER_URL + 'mentees'}`, data);
  }

  getPatientDetails(id:any) {
    return this.http.get(`${this.SERVER_URL + 'mentees'}/${id}`);
  }

  

  getFav() {
    return this.http.get(this.SERVER_URL + 'favourites');
  }

  createFav(params:any) {
    return this.http.post(this.SERVER_URL + 'favourites', params);
  }

  getComments() {
    return this.http.get(this.SERVER_URL + 'comments');
  }

  createComment(params:any) {
    return this.http.post(this.SERVER_URL + 'comments', params);
  }

  deleteFav(id:any) {
    return this.http.delete(`${this.SERVER_URL + 'favourites'}/${id}`);
  }

  getTransactions() {
    return this.http.get(this.SERVER_URL + 'transactions');
  }

  deleteTransaction(id:any) {
    return this.http.delete(`${this.SERVER_URL + 'transactions'}/${id}`);
  }

  getReviews() {
    return this.http.get(this.SERVER_URL + 'reviews');
  }

  deleteReview(id:any) {
    return this.http.delete(`${this.SERVER_URL + 'reviews'}/${id}`);
  }

  
}
