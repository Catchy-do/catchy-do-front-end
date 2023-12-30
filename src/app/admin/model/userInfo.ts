import { Injectable } from "@angular/core";
import { Media } from "./media";
import { CompetenceResp } from "src/app/services/model/competenceResp";
@Injectable({
    providedIn: 'root'
  })
export class UserInfo {
    userId!:number;
    userID!:number;
    regionID!:number;
    villeID!:number;
    paysID!:number;
    notifID!:number;
    menteeId!:number;
    competencesId!:number[];
    isMentor!:boolean;
    firstName!:string;
    lastName!:string;
    dateOfBirth!:string;
    email!:string;
    username!:string;
    phoneNumber!: string;
    countryName!: string;
    cin!: number;
    age!: number;
    sexe!: string;
    adresse!: string;
    region!: string;
    ville!: string;
    pays!: string;
    status!: string;
    competences!: CompetenceResp[];
    niveau!: string;
    password!: string;
    confirm!: string;
    roles!: String[];
    startHour!: string;
    endHour!: string;
    active!: string;
    imgUrl!: string;
    zipCode!: string;
    biographie!: string;
    media!:Media[];
    isConfirmed!:boolean;

}

