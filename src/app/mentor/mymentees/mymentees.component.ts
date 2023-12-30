import { Component, OnInit } from '@angular/core';
import { CommonServiceService } from '../../common-service.service';

@Component({
  selector: 'app-mymentees',
  templateUrl: './mymentees.component.html',
  styleUrls: ['./mymentees.component.css'],
})
export class MymenteesComponent implements OnInit {
  appointments: any = [];
  mentees: any = [];
  loadPagination = false;

  constructor(public commonService: CommonServiceService) {}

  ngOnInit(): void {
    this.getMentees();
    this.getAppointments();
    setTimeout(() => (this.loadPagination = true), 1000);
  }

  getAppointments() {
    this.commonService.getAppointments().subscribe((res) => {
      this.appointments = res;
      let scope = this;
      this.appointments.forEach((index:any) => {
        let filter = scope.mentees.filter((a:any) => a.key === index.patient_key);
        if (filter.length != 0) {
          index['mentees'] = filter[0];
        }
      });
      this.appointments = this.appointments.filter(
        (a:any) => a.status === 'accept'
      );
    });
  }

  getMentees() {
    this.commonService.getpatients().subscribe((res) => {
      this.mentees = res;
    });
  }
}
