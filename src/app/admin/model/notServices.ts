import { Injectable } from '@angular/core';
import { NotInfo } from './notifData';

@Injectable({
    providedIn: 'root',
  })
export class NotServices {
   
     notser!: NotInfo[];
}