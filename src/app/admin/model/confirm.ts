import { Injectable } from "@angular/core";
@Injectable({
    providedIn: 'root'
  })

  export class confirmDTO{
    userId!: number;
    validate!: boolean;
  };