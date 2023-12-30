import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CommonServiceService } from '../common-service.service';
import { MenteeServicesService } from '../services/mentee/mentee-services.service';
import { Observable } from 'rxjs';
import { UserInfo } from '../admin/model/userInfo';
import { CompetenceResp } from '../services/model/competenceResp';
import { PublicServicesService } from '../services/public/public-services.service';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { DataStorageService } from '../services/storage/data-storage.service';
import { rdv } from '../services/model/rdv';



@Component({
  selector: 'app-search-mentor',
  templateUrl: './search-mentor.component.html',
  styleUrls: ['./search-mentor.component.css'],
})
export class SearchMentorComponent implements OnInit {
  mentors!: UserInfo[];
  specialityList!: CompetenceResp[];
  speList!: any[];
  itemsToShow = 5;
  remainingItems!: number;
  load!: boolean;
  type: any;
  specialist = new Array();
  speciality!: any;
  selDate: any;

  MyDTO = new rdv;
  mentorInfo!:UserInfo;

  
  
  
  

  showConfirmationPopup = false;
  selectedMentorId!: any;
  selectedMentorName: any;
  

  constructor(
    public commonService: CommonServiceService,
    public router: Router,
    private toastr: ToastrService,
    public pubServices: PublicServicesService,
    public menteeService: MenteeServicesService,
    public userInfo: UserInfo,
    public storage: DataStorageService
    
  ) { }
  images = [
    {
      path: 'assets/img/features/feature-01.jpg',
    },
    {
      path: 'assets/img/features/feature-02.jpg',
    },
    {
      path: 'assets/img/features/feature-03.jpg',
    },
    {
      path: 'assets/img/features/feature-04.jpg',
    },
  ];
  ngOnInit(): void {
    this.getMentors();
    this.getspeciality();
    //this.getuserImage();
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

  getMentors() {
    this.menteeService.getMentors().subscribe(
      (res) => {
        this.mentors = res as UserInfo[];
        // this.mentors.forEach(elt =>{
        //   this.getuserImage(elt);

        // })
      },
      (error) => {
        console.log('Error occurred:', error);
      }
    );
  }

  getspeciality() {
    this.pubServices.getAllCompetences().subscribe(
      (res: any) => {
        this.specialityList = res;
      },
      (error) => {
        console.log('Error occurred:', error);
      }
    );
  }

  checkType(event: any) {
    if (event.target.checked) {
      this.type = event.target.value;
    } else {
      this.type = '';
    }
  }

  search() {
    if (this.type && this.specialist.length != 0) {
      this.menteeService.searchMentors(this.type, this.specialist).subscribe(
        (res) => {
          this.mentors = res as UserInfo[];
        },
        (error) => {
          console.log('Error occurred:', error);
        }
      );
    } else {
      this.getMentors();
    }
  }

  checkSpeciality(event: any) {
    if (event.target.checked) {
      this.specialist.push(event.target.value);
    } else {
      const index = this.specialist.indexOf(event.target.value);
      if (index !== -1) {
        this.specialist.splice(index, 1);
      }
    }
  }

  loadMore() {
    this.itemsToShow += 2;
    this.remainingItems = this.mentors.length - this.itemsToShow;
    this.load = this.remainingItems > 0 ? true : false;
  }

  // bookAppointment(id:any) {
  //   this.router.navigateByUrl('/mentee/booking?id=' + id);
    
  // }


  openConfirmationPopup(mentor: UserInfo) {
    this.selectedMentorId = mentor.userId;
    this.selectedMentorName = mentor.firstName +' '+ mentor.lastName;
    this.showConfirmationPopup = true;
    
    
  }

  confirmAppointment() {
    
    this.MyDTO.mentorId = this.selectedMentorId;
    var userInfo = this.storage.getUserInfo() as UserInfo;
    this.MyDTO.menteeId = userInfo.userId;
    this.MyDTO.creationDate = new Date();
    console.log(this.MyDTO);
    this.commonService.createAppointment(this.MyDTO).subscribe((res) =>
      console.log(res)
    )

    this.toastr.success('', 'Booking appointment for mentor '+ this.selectedMentorName)
    this.showConfirmationPopup = false;
  }
  
  
  cancelAppointment() {
    this.showConfirmationPopup = false;
  }
}
