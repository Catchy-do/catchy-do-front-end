import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonServiceService } from '../../common-service.service';
import * as $ from 'jquery';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { UserInfo } from "../model/userInfo";

@Component({
  selector: 'app-mentee',
  templateUrl: './mentee.component.html',
  styleUrls: ['./mentee.component.css'],
})
export class MenteeComponent implements OnInit {
  menteesList: any = [];
  errorMessage!: string;

  @ViewChild(DataTableDirective)
  public dtElement!: DataTableDirective;
  public dtOptions: DataTables.Settings = {};
  public dtTrigger: Subject<any> = new Subject();
  constructor(public commonService: CommonServiceService) {}

  ngOnInit(): void {
     this.dtOptions = {
    // ... skipped ...
    pageLength: 10,
    dom: 'lrtip',
  };
    this.getMentees();
  }

  getMentees() {
    this.commonService.getMentees().subscribe(
      (res) => {
        this.menteesList = res as UserInfo[] ;
      
        this.dtTrigger.next(this.dtOptions);
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
     // destroy data table when leaving
     ngOnDestroy(): void {
      // Do not forget to unsubscribe the event
      this.dtTrigger.unsubscribe();
    }
}
