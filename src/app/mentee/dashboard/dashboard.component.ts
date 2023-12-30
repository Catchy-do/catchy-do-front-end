import { Component, OnInit } from '@angular/core';
import { CommonServiceService } from './../../common-service.service';
import { MenteeServicesService } from 'src/app/services/mentee/mentee-services.service';
import { DataStorageService } from 'src/app/services/storage/data-storage.service';
import { Resps } from 'src/app/services/model/response';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  appointments:any;
  mentees:any;
  userId :any; 
  

  constructor(public commonService: CommonServiceService,
    public menteeService: MenteeServicesService,
    public dataStorage: DataStorageService) {}

  ngOnInit(): void {
    console.log("mentee dashboard")
    this.userId = this.dataStorage.getUserInfo().userId;
    this.getAppointments();
  }

  getAppointments() {
    this.menteeService.getBookings(this.userId).subscribe((res)=>{
      let result = res as Resps;
      this.appointments = result.data.length;
      
      }
    )
  }

  getMentees() {
    this.commonService.getpatients().subscribe((res) => {
      this.mentees = res;
    });
  }
}
