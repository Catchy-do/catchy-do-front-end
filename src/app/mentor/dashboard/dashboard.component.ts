import { Component, OnInit, TemplateRef } from '@angular/core';

import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

import { CommonServiceService } from './../../common-service.service';

import { ToastrService } from 'ngx-toastr';
import { MentorServicesService } from 'src/app/services/mentor/mentor-services.service';
import { DataStorageService } from 'src/app/services/storage/data-storage.service';
import { UserInfo } from 'src/app/admin/model/userInfo';
import { Resps } from 'src/app/services/model/response';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  list: any = [];
  modalRef!: BsModalRef;
  appointmentId:any;
  appointments: any = [];
  mentees: any = [];
  patientsLength:any;
  appointmentsLength:any;
  TotalPatientsLength:any;
  activeTab = 'upcomming';
  appointmentsNumber!: number;

  constructor(
    private toastr: ToastrService,
    public commonService: CommonServiceService,
    private modalService: BsModalService,
    private mentorService: MentorServicesService,
    public dataStrorage: DataStorageService
  ) {}

  ngOnInit(): void {
    this.getMentees();
    this.getAppointments();
  }

  search(activeTab:any) {
    this.activeTab = activeTab;
  }

  result(activeTab:any) {
    this.activeTab = activeTab;
  }


  openModal(template: TemplateRef<any>, appointment:any) {
    this.appointmentId = appointment;
    this.modalRef = this.modalService.show(template, {
      class: 'modal-sm modal-dialog-centered',
    });
  }

  confirm(value:any) {
    delete this.appointmentId['mentees'];
    let data = {
      ...this.appointmentId,
    };
    data['status'] = 'accept';
    this.commonService.updateAppointment(data, data.id).subscribe((res) => {
      this.toastr.success('', 'Updated successfully!');
      this.modalRef.hide();
      this.appointments = this.appointments.filter((a:any) => a.id != data.id);
      this.getMentees();
      this.getAppointments();
    });
  }

  decline() {
    delete this.appointmentId['mentees'];
    let data = {
      ...this.appointmentId,
    };
    data['status'] = 'decline';
    this.commonService.updateAppointment(data, data.id).subscribe((res) => {
      this.toastr.success('', 'Decline successfully!');
      this.modalRef.hide();
      this.appointments = this.appointments.filter((a:any) => a.id != data.id);
      this.getMentees();
      this.getAppointments();
    });
  }

  getAppointments() {
    const mentor = this.dataStrorage.getUserInfo() as UserInfo;
    this.mentorService.getAppointmentss(mentor.userId).subscribe((res) => {
      var resp = res as Resps ;
      this.appointments = resp.data;
      this.appointmentsNumber = this.appointments.length;
      //console.log(this.appointments)
    });
  }
  

  getMentees() {
    this.commonService.getpatients().subscribe((res) => {
      this.mentees = res;
      this.TotalPatientsLength = this.mentees.length;
    });
  }

  cancel() {
    this.modalRef.hide();
  }
}
