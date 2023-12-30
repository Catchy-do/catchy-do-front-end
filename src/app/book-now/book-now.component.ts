import { Component, OnInit } from '@angular/core';
import { UserInfo } from '../admin/model/userInfo';
import { ActivatedRoute } from '@angular/router';
import { PublicServicesService } from '../services/public/public-services.service';

@Component({
  selector: 'app-book-now',
  templateUrl: './book-now.component.html',
  styleUrls: ['./book-now.component.css'],
})
export class BookNowComponent implements OnInit {
  public daterange: any = {};
  public mentor!: UserInfo;
  mentorId: any;

  // see original project for full list of options
  // can also be setup using the config service to apply to multiple pickers
  public options: any = {
    locale: { format: 'YYYY-MM-DD' },
    alwaysShowCalendars: false,
  };

  public selectedDate(value: any, datepicker?: any) {
    // any object can be passed to the selected event and it will be passed back here
    datepicker.start = value.start;
    datepicker.end = value.end;

    // use passed valuable to update state
    this.daterange.start = value.start;
    this.daterange.end = value.end;
    this.daterange.label = value.label;
  }
  constructor(
    ) {}

  ngOnInit(): void {
    



  }

  
}
