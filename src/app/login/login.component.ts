import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { CommonServiceService } from '../common-service.service';

import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../services/auth/auth.service';
import { UserTokenService } from '../services/auth/user-token.service';
import { DataStorageService } from '../services/storage/data-storage.service';
import { PublicServicesService } from '../services/public/public-services.service';
import { UserInfo } from '../admin/model/userInfo';
import { WebSocketService } from '../services/websocket/websocket.service';
import { NotInfo } from '../admin/model/notifData';
import { NotifInfo } from '../admin/model/notifInfo';
import { NotServices } from '../admin/model/notServices';
import { UserAuthService } from '../services/auth/user-auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  isPatient: boolean = false;

  email: string | any = '';
  password: string | any = '';
  roles: String[] | any;
  public notifications: any;
  public notificationsmessage: any;
  audio: any;
  notifInfoSer!: NotInfo[];
  menteeUser: boolean = false;
  mentorUser: boolean = false;
  adminUser: boolean = false;
  constructor(
    public router: Router,
    public commonService: CommonServiceService,
    private toastr: ToastrService,
    private usrTokenSvc: UserTokenService,
    public authService: AuthService,
    public dataStore: DataStorageService,
    public pubServices: PublicServicesService,
    public userInfo: UserInfo,
    private webSocketService: WebSocketService,
    public notifInfo: NotifInfo,
    public notiffoSer: NotServices,
    private userAuth: UserAuthService,
  ) {

  }

  ngOnInit(): void {
    if (this.dataStore.getItem('username') != null) {
      this.email = this.dataStore.getItem('username');
      this.password = this.dataStore.getItem('password');
    }

  }




  login(email: any, password: any) {
    this.authService.authenticate(email, password).
      subscribe((result: any) => {
        result = result as any;
        console.log(result);
        this.usrTokenSvc.setAccessToken(result.access_token);
        this.usrTokenSvc.setConnectedUser(true);
        this.dataStore.setItem('username', email);
        this.dataStore.setItem('password', password);
        this.pubServices.getUserProfile(result.id).subscribe((response: any) => {
          let res = response as UserInfo;
          this.userInfo = res;
          this.userInfo.roles = [...result.roles];
          this.notifServicesSubscription(this.userInfo);
          this.userAuth.setUserInfoDetails(this.userInfo);
          this.dataStore.setUserInfo(this.userInfo);
          for (let s = 0; s < this.userInfo.roles.length; s++) {
            if (this.userInfo.roles[s] == "MENTEE") {
              this.menteeUser = true;
              this.commonService.nextmessage('mentee');
              this.router.navigate(['/mentee/dashboard']);
            }
            if (this.userInfo.roles[s] == "MENTOR") {
              this.commonService.nextmessage('MENTOR');
              this.mentorUser = true;
              if (this.userInfo.isConfirmed)
                this.router.navigate(['/mentor/dashboard']);
              else

                this.router.navigate(['/mentor/settings']);
            }
            if (this.userInfo.roles[s] == "ADMIN") {
              this.adminUser = true;
              this.commonService.nextmessage('admin');
              this.router.navigate(['/admin/dashboard']);
            }
          }

        });

      });


    // localStorage.setItem('auth', 'true');
    // localStorage.setItem('mentee', this.isPatient.toString());
    // if (this.isPatient) {
    //   let filter = this.mentees.filter(
    //     (a:any) => a.email == this.email && a.password === this.password
    //   );
    //   if (filter.length != 0) {
    //     localStorage.setItem('id', filter[0]['id']);
    //     this.toastr.success('', 'Login success!');
    //     this.commonService.nextmessage('patientLogin');
    //     this.router.navigate(['/mentee/dashboard']);
    //   } else {
    //     this.toastr.error('', 'Login failed!');
    //   }
    // } else {
    //   let filter = this.mentors.filter(
    //     (a:any) => a.email === this.email && a.password === this.password
    //   );
    //   if (filter.length != 0) {
    //     this.toastr.success('', 'Login success!');
    //     this.commonService.nextmessage('doctorLogin');
    //     localStorage.setItem('id', filter[0]['id']);
    //     this.router.navigate(['/mentor/dashboard']);
    //   } else {
    //     this.toastr.error('', 'Login failed!');
    //   }
  }

  notifServicesSubscription(userinfo: UserInfo) {

    let stompClient = this.webSocketService.connect();

    stompClient.connect({}, (frame: any) => {

      stompClient.subscribe('/topic/notification/' + userinfo.notifID, (notifications: { body: string; }) => {


        this.notificationsmessage = JSON.parse(notifications.body).message
        this.infotoastr(this.notificationsmessage);

        this.notifInfo.count == this.notifInfo.count++;
        this.notifInfo.Notifcount = this.notifInfo.count;
        this.notifInfo.message = this.notificationsmessage;
        this.notifInfo.requestID = JSON.parse(notifications.body).requestId;

        let notServ = new NotInfo();
        notServ.count == notServ.count++;
        notServ.requestID = JSON.parse(notifications.body).requestId;
        notServ.reqType = JSON.parse(notifications.body).reqType;
        this.notifInfoSer.push(notServ);
        this.notiffoSer.notser = this.notifInfoSer;



      });



    });
  }

  infotoastr(text: string) {

    this.audio.src = "../../../../../assets/Notification/notification-4.mp3";
    this.audio.load();
    this.audio.play();
    this.toastr.info(text, 'Information', { progressBar: true, closeButton: true, enableHtml: true });
    setTimeout(() => {
      this.audio.pause();
    }, 7000);

  }
  goto() {
    this.commonService.nextmessage('logout');
    this.router.navigate(['/index']);
  }
}
