import { Component, OnInit } from '@angular/core';
import {
  Event,
  NavigationStart,
  Router,
  ActivatedRoute,
} from '@angular/router';

import { CommonServiceService } from './../../common-service.service';
import { UserInfo } from 'src/app/admin/model/userInfo';
import { DataStorageService } from 'src/app/services/storage/data-storage.service';
import { CompetenceResp } from 'src/app/services/model/competenceResp';
import { strict } from 'assert';

@Component({
  selector: 'app-sidemenu',
  templateUrl: './sidemenu.component.html',
  styleUrls: ['./sidemenu.component.css'],
})
export class SidemenuComponent implements OnInit {
  name:any;
  splitVal:any;
  base:any;
  page:any;
  isConfirmed!: boolean;
  userImage :string | null=null;
  competences!: string ;
  comp: string="" ;
  
  constructor(
    private router: Router,
    public commonService: CommonServiceService,
    public dataStorage: DataStorageService,
    public userInfo: UserInfo
  ) {}

  ngOnInit(): void {
    this.userInfo = this.dataStorage.getUserInfo() as UserInfo ;
    this.isConfirmed = this.userInfo.isConfirmed;
    this.getuserImage();
    this.userInfo.competences.forEach((res) => {
      let data = res as CompetenceResp;
      this.comp += data.intitule + ", ";
    })
    this.competences  = this.comp.slice(0,-2);
    
  

    
    
    this.splitVal = this.router.url.split('/');
    this.base = this.splitVal[1];
    this.page = this.splitVal[2];
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationStart) {
        this.splitVal = event.url.split('/');
        this.base = this.splitVal[1];
        this.page = this.splitVal[2];
      }
    });
    this.getuserImage();
  }

  getuserImage() {
    if(this.userInfo!=null)
    for (let s = 0; s <  this.userInfo.media.length; s++) {
      if (this.userInfo.media[s].type == "PIC") {
        this.userImage= this.userInfo.media[s].url;
        break;
      }
      
    }
  }

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
