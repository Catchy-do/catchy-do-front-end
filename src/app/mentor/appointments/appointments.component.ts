import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';

import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

import { CommonServiceService } from './../../common-service.service';
import { MenteeServicesService } from 'src/app/services/mentee/mentee-services.service';
import { DataStorageService } from 'src/app/services/storage/data-storage.service';
import { UserInfo } from 'src/app/admin/model/userInfo';
import { MentorServicesService } from 'src/app/services/mentor/mentor-services.service';
import { rdv } from 'src/app/services/model/rdv';
import { Resps } from 'src/app/services/model/response';
import { UntypedFormBuilder, FormControl, UntypedFormGroup, Validators } from '@angular/forms';



@Component({
  selector: 'app-appointments',
  templateUrl: './appointments.component.html',
  styleUrls: ['./appointments.component.css'],
})
export class AppointmentsComponent implements OnInit {
  list: any = [];
  modalRef!: BsModalRef;
  patientId:any;
  appointments: any = [];
  mentees: any = [];
  appointmentId:any;


  showConfirmationPopup = false;
  selectedDate!: Date;
  selectedTime!: Date;
  updateApp!:UntypedFormGroup;

  MyDTO = new rdv;
 
  
  

  constructor(
    public commonService: CommonServiceService,
    private modalService: BsModalService,
    private mentorService: MentorServicesService,
    public dataStrorage: DataStorageService,
    public fb: UntypedFormBuilder,
   
    
  ) {
    
  }

  ngOnInit(): void {
   //this.getMentees();
    this.getAppointments();
    // this.list = this.commonService.getJSON();
    // this.list = this.list.filter((a:any) => a.status === 0);
  }

  openModal(template: TemplateRef<any>, appointment:any) {
    
    this.appointmentId = appointment;
    this.modalRef = this.modalService.show(template, {
      class: 'modal modal-md modal-dialog-centered custom-modal',
    });
  }

  closeModal(){
    this.modalRef.hide();
  }

  // confirm(value:any) {
  //   delete this.appointmentId['mentees'];
  //   let data = {
  //     ...this.appointmentId,
  //   };
  //   data['status'] = 'accept';
  //   this.commonService.updateAppointment(data, data.id).subscribe((res) => {
  //     this.modalRef.hide();
  //     this.appointments = this.appointments.filter((a:any) => a.id != data.id);
  //     //this.getMentees();
  //     this.getAppointments();
  //   });
  // }

  // decline() {
  //   delete this.appointmentId['mentees'];
  //   let data = {
  //     ...this.appointmentId,
  //   };
  //   data['status'] = 'decline';
  //   this.commonService.updateAppointment(data, data.id).subscribe((res) => {
  //     this.modalRef.hide();
  //     this.appointments = this.appointments.filter((a:any) => a.id != data.id);
  //     this.getMentees();
  //     this.getAppointments();
  //   });
  // }

  // getAppointments() {
  //   this.commonService.getAppointments().subscribe((res) => {
  //     this.appointments = res;
  //     let scope = this;
  //     this.appointments.forEach((index:any) => {
  //       let filter = scope.mentees.filter((a:any) => a.key === index.patient_key);
  //       if (filter.length != 0) {
  //         index['mentees'] = filter[0];
  //       }
  //     });
  //   });
  // }

  getAppointments() {
    const mentor = this.dataStrorage.getUserInfo() as UserInfo;
    this.mentorService.getAppointmentss(mentor.userId).subscribe((res) => {
      var resp = res as Resps ;
      this.appointments = resp.data;
      //console.log(this.appointments)
    });
    
   
  }


  confirmAppointment() {
   
  const app = this.appointments.find((item: { appointmentId: any; }) => item.appointmentId === this.appointmentId);

    
    this.MyDTO.appointmentId= this.appointmentId;
    this.MyDTO.mentorId = this.dataStrorage.getUserInfo().userId;
    this.MyDTO.menteeId = app.mentee.userId;
    this.MyDTO.creationDate = app.creationDate;
    this.MyDTO.scheduledDate = this.selectedDate;
    this.MyDTO.scheduledtime = this.selectedTime;
    this.MyDTO.status = "CONFIRMED";
    console.log(this.MyDTO);
    this.mentorService.ConfAppointmentss(this.MyDTO).subscribe((res) =>
    console.log(res)
    )
    //this.toastr.success('', 'Booking appointment for mentor '+ this.selectedMentorName)
    this.modalRef.hide();
  }
}
