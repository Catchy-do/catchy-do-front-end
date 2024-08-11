import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { CommonServiceService } from '../common-service.service';
import { ToastrService } from 'ngx-toastr';
import { PublicServicesService } from '../services/public/public-services.service';
import { UserInfo } from '../admin/model/userInfo';
import { rdv } from '../services/model/rdv';
import { DataStorageService } from '../services/storage/data-storage.service';

@Component({
  selector: 'app-mentor-profile',
  templateUrl: './mentor-profile.component.html',
  styleUrls: ['./mentor-profile.component.css'],
})
export class MentorProfileComponent implements OnInit {
  id:any;
  doctorDetails:any;
  mentorProfile: any | undefined;
  showConfirmationPopup = false;
  selectedMentorId!: any;
  selectedMentorName: any;
  MyDTO = new rdv;
  mentorInfo!:UserInfo;
  
  constructor(
    public commonService: CommonServiceService,
    public publicServices :PublicServicesService,
    private route: ActivatedRoute,
    private toastr: ToastrService,
    public storage: DataStorageService
  ) {}
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
    window.scrollTo(0, 0);
    this.id = this.route.snapshot.queryParams['id'];
    this.getMentorProfile();
  }

  getMentorProfile() {
   
    this.publicServices.getUserProfile(this.id).subscribe((res) => {
      this.mentorProfile = res;
      console.log(this.mentorProfile)
    });
  }
  getCompetenceIntitules(): string {
    return this.mentorProfile.competences.map((comp: { intitule: any; }) => comp.intitule).join(', ');
  }
  addFav() {
    this.commonService.createFav(this.mentorProfile).subscribe((res) => {
      this.toastr.success('', 'Added to favourite successfully!');
    });
  }

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
