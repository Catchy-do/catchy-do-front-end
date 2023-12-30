import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { CommonServiceService } from '../../common-service.service';
import * as $ from 'jquery';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { UserInfo } from "../model/userInfo";
import { confirmDTO } from "../model/confirm";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { stat } from 'fs';

@Component({
  selector: 'app-mentor',
  templateUrl: './mentor.component.html',
  styleUrls: ['./mentor.component.css'],
})
export class MentorComponent implements OnInit {
  mentorsList: any = [];
  errorMessage!: string;
  isConfirmed!: boolean;
  
  

  @ViewChild(DataTableDirective)
  public dtElement!: DataTableDirective;
  public dtOptions: DataTables.Settings = {};
  public dtTrigger: Subject<any> = new Subject();
  modalRef!: BsModalRef
  constructor(public commonService: CommonServiceService,
    private modalService: BsModalService,
    public confirm: confirmDTO
     ) {}

  ngOnInit(): void {
    this.dtOptions = {
      // ... skipped ...
      pageLength: 10,
      dom: 'lrtip',
    };
    this.getMentors();
  }

  getMentors() {
    this.commonService.getMentors().subscribe(
      (res) => {
        this.mentorsList = res as UserInfo[] ;
        
        
        //this.dtTrigger.next(this.dtOptions);
      },
      (error) => (this.errorMessage = <any>error)
    );
  }

  getuserImage(data: UserInfo) {
    let userImage :string | null=null;
    if(data!=null)
    for (let s = 0; s <  data.media.length; s++) {
      if (data.media[s].type == "PIC") {
        data.imgUrl = data.media[s].url;
        
        break;
      }
      
    }
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, {
      class: 'modal modal-md modal-dialog-centered custom-modal',
    });
  }
  
  
  closeModal(){
    this.modalRef.hide();
  }

  
  
  updateStatus(status: boolean, mentorId: number){
    console.log(status);
    console.log(mentorId);
    this.confirm.userId = mentorId;
    this.confirm.validate = status;
    this.commonService.validateMentor(this.confirm).subscribe(resp =>{
      console.log(resp);
    })
    
    
    this.modalRef.hide();
  }
  
  // destroy data table when leaving
  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }
}

