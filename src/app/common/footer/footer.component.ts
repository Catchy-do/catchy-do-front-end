import { Component, OnInit } from '@angular/core';
import { UserInfo } from 'src/app/admin/model/userInfo';

import { CommonServiceService } from 'src/app/common-service.service';
import { UserAuthService } from 'src/app/services/auth/user-auth.service';
import { PublicServicesService } from 'src/app/services/public/public-services.service';
import { DataStorageService } from 'src/app/services/storage/data-storage.service';
import { WebSocketService } from 'src/app/services/websocket/websocket.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {


  constructor(    public commonService: CommonServiceService,   
                private userAuth: UserAuthService,
                public userInfo: UserInfo | null,
                public dataStore: DataStorageService,
                private webSocketService: WebSocketService,
                private pubServices: PublicServicesService) { 
                  this.userInfo = this.dataStore.getUserInfo() as UserInfo;
                  this.commonService.dataSource.subscribe(data => this.userInfo = data);
                }

  ngOnInit(): void {
    this.commonService.dataSource.subscribe(data => this.userInfo = data);
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
