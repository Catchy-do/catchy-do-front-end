import { Component, OnInit, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

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
  constructor(private Router: Router, private modalService: BsModalService) {}

  ngOnInit(): void {}

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
