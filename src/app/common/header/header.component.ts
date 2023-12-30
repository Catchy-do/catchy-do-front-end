import {
  Component,
  OnInit,
  ChangeDetectorRef,
  AfterViewInit,
  Inject,
} from '@angular/core';
import { Event, Router, NavigationStart, NavigationEnd } from '@angular/router';
import { DOCUMENT } from '@angular/common';
import { CommonServiceService } from './../../common-service.service';
import { UserInfo } from 'src/app/admin/model/userInfo';
import { log } from 'console';
import { DataStorageService } from 'src/app/services/storage/data-storage.service';
import { WebSocketService } from 'src/app/services/websocket/websocket.service';
import { UserAuthService } from 'src/app/services/auth/user-auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  auth: boolean = false;
  isPatient: boolean = false;
  splitVal:any;
  base = '';
  page = '';
  isMentee:boolean=false;
  isMentor:boolean=false;
  isAdmin: boolean=false;
  isConfirmed!: boolean;

  constructor(
    private cdr: ChangeDetectorRef,
    public router: Router,
    public commonService: CommonServiceService,
    public userInfo:UserInfo |null,
    public dataStore: DataStorageService,
    private webSocketService: WebSocketService,
    private userAuth:UserAuthService ,
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
    this.commonService.message.subscribe((res) => {
      this.userInfo=this.dataStore.getUserInfo() as UserInfo;
      this.isConfirmed = this.userInfo.isConfirmed;
      if(this.userInfo!=null){
        for (let s = 0; s < this.userInfo.roles.length; s++) {
          if (this.userInfo.roles[s] == "MENTEE") {
            this.isMentee = true;
          
          }else{
            this.isMentee = false;
          }
          if (this.userInfo.roles[s] == "MENTOR") {
            this.isMentor = true;
          }else{
            this.isMentor = false;
          }
          if (this.userInfo.roles[s] == "ADMIN") {
            this.isAdmin = true;
          }
      }
      }
     

      if (res === 'patientLogin') {
        this.auth = true;
        this.isPatient = true;
      }
      if (res === 'doctorLogin') {
        this.auth = true;
        this.isPatient = false;
      }
      if (res === 'logout') {
        this.auth = false;
        this.isPatient = false;
        this.dataStore.removeFromStorage("userInfo");
      }
    });
  }

  ngOnInit(): void {
    
   
   

    if (localStorage.getItem('auth') === 'true') {
      this.auth = true;
      this.isPatient = localStorage.getItem('mentee') === 'true' ? true : false;
    }
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationEnd) {
        $('html').removeClass('menu-opened');
        $('.sidebar-overlay').removeClass('opened');
        $('.main-wrapper').removeClass('slide-nav');
      }
    });
  }

  ngAfterViewInit() {
   
    this.cdr.detectChanges();
    this.loadDynmicallyScript("assets/js/script.js");
  }

  mapGrid() {
    this.router.navigate(['/map-grid']);
  }
  mapList() {
    this.router.navigate(['/map-list']);
  }
  loadDynmicallyScript(js:any) {
    var script = document.createElement("script");
    script.src = js;
    script.async = false;
    document.head.appendChild(script);
    script.onload = () => this.doSomethingWhenScriptIsLoaded();
  }

  doSomethingWhenScriptIsLoaded() {}
  
  mentor(name:any) {
    this.page = name;
    this.router.navigate(['/mentor/dashboard']);
  }

  logout() {
    localStorage.clear();
    this.auth = false;
    this.isPatient = false;
    this.router.navigate(['/login-page']);
  }

  home() {
    this.commonService.nextmessage('main');
    this.router.navigateByUrl('/').then(() => {
      this.router.navigate(['/']);
    });
  }

  navigate(name:any) {
    this.page = name;
    if (name === 'Admin') {
      this.router.navigate(['/admin']);
      this.commonService.nextmessage('admin');
    }
  }
  logOut(){
    this.userInfo=null;
    this.commonService.nextmessage('logout');
    this.webSocketService.disconnect();
    this.webSocketService.disconnect();
    this.userAuth.logout();
  }
}
