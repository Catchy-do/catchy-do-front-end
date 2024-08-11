import {
  Component,
  OnInit,
  ChangeDetectorRef,
} from '@angular/core';
import { Event, Router, NavigationStart, NavigationEnd } from '@angular/router';
import { CommonServiceService } from './../../common-service.service';
import { UserInfo } from 'src/app/admin/model/userInfo';

import { DataStorageService } from 'src/app/services/storage/data-storage.service';
import { WebSocketService } from 'src/app/services/websocket/websocket.service';
import { UserAuthService } from 'src/app/services/auth/user-auth.service';
import { PublicServicesService } from 'src/app/services/public/public-services.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  auth: boolean = false;
  isPatient: boolean = false;
  splitVal: any;
  base = '';
  page = '';
  isMentee: boolean = false;
  isMentor: boolean = false;
  isAdmin: boolean = false;
  isConfirmed!: boolean;

  constructor(
    private cdr: ChangeDetectorRef,
    public router: Router,
    public commonService: CommonServiceService,
    public userInfo: UserInfo | null,
    public dataStore: DataStorageService,
    private webSocketService: WebSocketService,
    private userAuth: UserAuthService,
    private pubServices: PublicServicesService
  ) {

    router.events.subscribe((event: Event) => {

      if (event instanceof NavigationStart) {
        this.splitVal = event.url.split('/');
        this.base = this.splitVal[1];
        this.page = this.splitVal[2];


        if (
          this.base === 'mentor' ||
          (this.base === 'mentee' && this.page === 'dashboard') ||
          this.base === 'change-password' ||
          this.base === 'voice-call' ||
          this.base === 'video-call' ||
          (this.base === 'mentee' && this.page === 'favourites') ||
          (this.base === 'mentee' && this.page === 'message') ||
          (this.base === 'mentee' && this.page === 'settings')
        ) {
          this.auth = true;
        } else {
          this.auth = false;
        }
      }
    });
   
    this.isMentee = false;
    this.isMentor = false;
    this.isAdmin = false;
    this.userInfo = this.dataStore.getUserInfo() as UserInfo;

    if (this.userInfo != null) {
      this.isConfirmed = this.userInfo.isConfirmed;
      for (let s = 0; s < this.userInfo.role.length; s++) {
        if (this.userInfo.role[s] == "MENTEE") {
          this.isMentee = true;
        }
        if (this.userInfo.role[s] == "MENTOR") {
          this.isMentor = true;
        }
        if (this.userInfo.role[s] == "ADMIN") {
          this.isAdmin = true;
        }
      }
    }
    
    this.commonService.dataSource.subscribe(data => this.userInfo = data);
  }

  ngOnInit(): void {
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationEnd) {
        $('html').removeClass('menu-opened');
        $('.sidebar-overlay').removeClass('opened');
        $('.main-wrapper').removeClass('slide-nav');
      }
    });
    
    this.commonService.dataSource.subscribe(data => this.userInfo = data);
    console.log(this.userInfo)
    if(this.userInfo==null){
      this.loadData()
    }
  }
loadData(){
  this.userInfo = this.dataStore.getUserInfo() as UserInfo;

  if (this.userInfo != null) {
    this.isConfirmed = this.userInfo.isConfirmed;
    for (let s = 0; s < this.userInfo.role.length; s++) {
      if (this.userInfo.role[s] == "MENTEE") {
        this.isMentee = true;
      }
      if (this.userInfo.role[s] == "MENTOR") {
        this.isMentor = true;
      }
      if (this.userInfo.role[s] == "ADMIN") {
        this.isAdmin = true;
      }
    }
    this.cdr.detectChanges();
    this.loadDynmicallyScript("assets/js/script.js");
  }
  this.commonService.dataSource.subscribe(data => this.userInfo = data);
}
  ngAfterViewInit() {
    if(this.userInfo==null){
      this.loadData()
    }
    this.cdr.detectChanges();
    this.loadDynmicallyScript("assets/js/script.js");
  }

  mapGrid() {
    this.router.navigate(['/map-grid']);
  }
  mapList() {
    this.router.navigate(['/map-list']);
  }
  loadDynmicallyScript(js: any) {
    var script = document.createElement("script");
    script.src = js;
    script.async = false;
    document.head.appendChild(script);
    script.onload = () => this.doSomethingWhenScriptIsLoaded();
  }

  doSomethingWhenScriptIsLoaded() { }

  mentor(name: any) {
    this.page = name;
    this.router.navigate(['/mentor/dashboard']);
  }

  logout() {
    localStorage.clear();
    this.auth = false;
    this.router.navigate(['/login-page']);
  }

  home() {
    this.commonService.nextmessage('main');
    this.router.navigateByUrl('/').then(() => {
      this.router.navigate(['/']);
    });
  }

  navigate(name: any) {
    this.page = name;
    if (name === 'Admin') {
      this.router.navigate(['/admin']);
      this.commonService.nextmessage('admin');
    }
  }
  logOut() {
    this.pubServices.logout(this.userInfo?.userId);
    this.dataStore.removeFromStorage("userInfo");
    this.dataStore.removeFromStorage("token");
    this.userInfo = null;
    this.commonService.nextmessage('logout');
    this.userAuth.logout();
    this.webSocketService.disconnect();
    this.webSocketService.disconnect();

  }
}
