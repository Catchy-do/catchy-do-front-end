import { Injectable } from '@angular/core';
import { NodeCompatibleEventEmitter } from 'rxjs/internal/observable/fromEvent';

@Injectable({
    providedIn: 'root',
  })
export class NotifInfo {
   
      message:string|any;
      Notifcount:number|any;
      count:number=0;
      requestID:number|any;
      requestTupe:string|any;
}