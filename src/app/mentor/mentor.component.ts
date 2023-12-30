import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Event, NavigationStart, Router } from '@angular/router';
import { CommonServiceService } from '../common-service.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-mentor',
  templateUrl: './mentor.component.html',
  styleUrls: ['./mentor.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class MentorComponent implements OnInit {
  splitVal:any;
  url:any;
  base:any;
  page:any;
  doctorSidebar: boolean = true;
  constructor(
    private router: Router,
    public commonService: CommonServiceService,
    location: Location
  ) {}

  ngOnInit(): void {}
}
