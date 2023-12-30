import {Injectable} from "@angular/core";

//var SockJs = require("sockjs-client");
//var Stomp = require("stompjs");
import * as SockJS from 'sockjs-client';
import * as Stomp from 'stompjs';
//import Stomp from 'stompjs';
import { NOTIF_URL } from 'src/environments/environment';
import { ToastrService } from 'ngx-toastr';


@Injectable()
export class WebSocketService {

  
    stompClient: Stomp.Client | undefined;

    constructor( public toastr: ToastrService ) { 

    }

    connect(  ) {
      
        let socket = new SockJS(NOTIF_URL);

        this.stompClient = Stomp.over(socket);
      
        return this.stompClient;
    }
    
     disconnect() {
    if (this.stompClient != null) {
      this.stompClient.ws.close();
      //this.stompClient.webSocket.close();
    }
   
   
  }


  
}
