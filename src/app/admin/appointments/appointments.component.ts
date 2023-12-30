import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonServiceService } from '../../common-service.service';
import * as $ from 'jquery';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-appointments',
  templateUrl: './appointments.component.html',
  styleUrls: ['./appointments.component.css'],
})
export class AppointmentsComponent implements OnInit {
  datatable: any;
  errorMessage:any;
  patientId:any;
  appointments: any = [];
  mentees: any = [];
  appointmentId:any;
  patientsLength:any;
  appointmentsLength:any;
  TotalPatientsLength:any;

  @ViewChild(DataTableDirective)
  public dtElement!: DataTableDirective;
  public dtOptions: DataTables.Settings = {};
  public dtTrigger: Subject<any> = new Subject();
  constructor(public commonService: CommonServiceService) {}

  ngOnInit(): void {
    this.dtOptions = {
      // ... skipped ...
      pageLength: 10,
      dom: 'lrtip',
    };
    this.getMentees();
    this.getAppointments();
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
      this.appointmentsLength = this.appointments.length;
      this.dtTrigger.next(this.dtOptions);
    });
  }

  getMentees() {
    this.commonService.getpatients().subscribe((res) => {
      this.mentees = res;
      this.TotalPatientsLength = this.mentees.length;
    });
  }
     // destroy data table when leaving
     ngOnDestroy(): void {
      // Do not forget to unsubscribe the event
      this.dtTrigger.unsubscribe();
    }
}
