import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonServiceService } from './../../common-service.service';
import { DataStorageService } from 'src/app/services/storage/data-storage.service';
import { UserInfo } from 'src/app/admin/model/userInfo';
import { MenteeServicesService } from 'src/app/services/mentee/mentee-services.service';
import { Resps } from 'src/app/services/model/response';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css'],
})
export class BookingComponent implements OnInit {
  doctorId:any;
  doctorDetails:any;
  userDetails:any;
  mentees:any;
  public daterange: any = {};
  bookings: any = [];

  // see original project for full list of options
  // can also be setup using the config service to apply to multiple pickers
  public options: any = {
    locale: { format: 'YYYY-MM-DD' },
    alwaysShowCalendars: false,
  };

  public selectedDate(value: any, datepicker?: any) {
    // any object can be passed to the selected event and it will be passed back here
    datepicker.start = value.start;
    datepicker.end = value.end;

    // use passed valuable to update state
    this.daterange.start = value.start;
    this.daterange.end = value.end;
    this.daterange.label = value.label;
  }

  constructor(
    private route: ActivatedRoute,
    public commonService: CommonServiceService,
    public dataStorage: DataStorageService,
    private menteeService: MenteeServicesService
  ) {}

  ngOnInit(): void {
    if (this.route.snapshot.queryParams['id']) {
      this.doctorId = this.route.snapshot.queryParams['id'];
    } else {
      this.doctorId = 1;
    }
    this.getDoctorsDetails();
    this.patientDetails();
    this.getBookings();
    //this.getMentees();
  }

  getMentees() {
    this.commonService.getpatients().subscribe((res) => {
      this.mentees = res;
    });
  }

  getDoctorsDetails() {
    this.commonService.getDoctorDetails(this.doctorId).subscribe((res) => {
      this.doctorDetails = res;
    });
  }

  patientDetails() {
    let userId;
    userId = localStorage.getItem('id');
    if (!userId) {
      userId = 1;
    }
    this.commonService.getPatientDetails(Number(userId)).subscribe((res) => {
      this.userDetails = res;
    });
  }

  getBookings() {
    const mentee = this.dataStorage.getUserInfo() as UserInfo;
    this.menteeService.getBookings(mentee.userId).subscribe((res) => {
      var resp = res as Resps ;
      this.bookings = resp.data;
      
      console.log(this.bookings);

      
    });
   
  }
}
