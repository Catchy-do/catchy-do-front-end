import { Component, OnInit, TemplateRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { CommonServiceService } from 'src/app/common-service.service';
import { PublicServicesService } from 'src/app/services/public/public-services.service';
import { DataStorageService } from 'src/app/services/storage/data-storage.service';

@Component({
  selector: 'app-mentor-profile',
  templateUrl: './mentor-profile.component.html',
  styleUrls: ['./mentor-profile.component.css'],
})
export class MentorProfileComponent implements OnInit {
  changePass = false;
  personalDetails = true;
  modalRef!: BsModalRef;
  name:any;
  id:any;
  key:any;
  mentorProfile: any | undefined;
  constructor(private Router: Router, private modalService: BsModalService,
    public commonService: CommonServiceService,
    public publicServices :PublicServicesService,
    private route: ActivatedRoute,
    private toastr: ToastrService,
    public storage: DataStorageService
  ) {}

  ngOnInit(): void {
    window.scrollTo(0, 0);
    this.id = this.route.snapshot.queryParams['id'];
    if(this.id==null){

      this.id = this.storage.getUserInfo().userId;
    }
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
  about() {
    this.changePass = false;
    this.personalDetails = true;
  }
  pass() {
    this.changePass = true;
    this.personalDetails = false;
  }
  editModal(template: TemplateRef<any>) {
    this.id = 1;
    this.modalRef = this.modalService.show(template, {
      class: 'modal-dialog modal-dialog-centered',
    });
  }

  update() {
    let params = {
      id: this.id,
      key: this.key,
      speciality: this.name,
    };
    this.modalRef.hide();
  }

  submit() {
    this.Router.navigateByUrl('/admin/mentor-profile');
  }
}
