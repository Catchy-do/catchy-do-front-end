import { Component, OnInit } from '@angular/core';
import { Event, NavigationEnd, NavigationStart, Router } from '@angular/router';

import { CommonServiceService } from './../../common-service.service';
import { UserInfo } from 'src/app/admin/model/userInfo';
import { DataStorageService } from 'src/app/services/storage/data-storage.service';

@Component({
  selector: 'app-sidemenu',
  templateUrl: './sidemenu.component.html',
  styleUrls: ['./sidemenu.component.css'],
})
export class SidemenuComponent implements OnInit {
  name:any;
  base:any;
  page:any;
  splitVal:any;
  userId: any = localStorage.getItem('userId') ;
  menteeId: any = parseInt(this.userId);
  userImage :string | null=null;
  constructor(
    private router: Router,
    public commonService: CommonServiceService,
    public dataStorage: DataStorageService,
    public userInfo: UserInfo
  ) {}

  ngOnInit(): void {
    this.splitVal = this.router.url.split('/');
    this.base = this.splitVal[1];
    this.page = this.splitVal[2];
    this.userInfo = this.dataStorage.getUserInfo();
    this.userImage = this.userInfo.imgUrl;
    //this.getuserImage();
    
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationStart) {
        this.splitVal = event.url.split('/');
        this.base = this.splitVal[1];
        this.page = this.splitVal[2];
      }
    });

    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationEnd) {
      $("html").removeClass("menu-opened");
      $(".sidebar-overlay").removeClass("opened");
      $(".main-wrapper").removeClass("slide-nav");
      }
      });
  }

  // getuserImage() {
  //   if(this.userInfo!=null)
  //   for (let s = 0; s <  this.userInfo.media.length; s++) {
  //     if (this.userInfo.media[s].type == "PIC") {
  //       this.userImage= this.userInfo.media[s].url;
  //       break;
  //     }
      
  //   }
  // }

  logout() {
    localStorage.clear();
    this.commonService.nextmessage('logout');
    this.router.navigate(['/login-page']);
  }

  navigate(name:any) {
    this.name = name;
    this.commonService.nextmessage(name);
  }
}
