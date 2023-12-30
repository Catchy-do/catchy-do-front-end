import { Component, OnInit } from '@angular/core';
import { Event, NavigationStart, Router } from '@angular/router';
import { Location } from '@angular/common';
import { CommonServiceService } from '../common-service.service';
import { MenteeServicesService } from '../services/mentee/mentee-services.service';
import { UserInfo } from '../admin/model/userInfo';

@Component({
  selector: 'app-mentee',
  templateUrl: './mentee.component.html',
  styleUrls: ['./mentee.component.css'],
})
export class MenteeComponent implements OnInit {
  splitVal:any;
  base:any;
  page:any;
  patientSidebar: boolean = true;
  userId: any = localStorage.getItem('userId') ;
  menteeId: any = parseInt(this.userId);
  constructor(
    private router: Router,
    public commonService: CommonServiceService,
    location: Location,
    private ms: MenteeServicesService
  ) {}

  ngOnInit(): void {}
}

